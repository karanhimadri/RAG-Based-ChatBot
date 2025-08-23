"use client";
import { DEFAULT_CATEGORIES } from "@/data/assets";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "./AuthProvider";

const ChatContext = createContext(undefined);

export default function ChatsProvider({ children }) {
  const { fetchCredits, user } = useAuth();
  const userId = user?.id || "guest";

  const [chatHistory, setChatHistory] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(DEFAULT_CATEGORIES[0].id);
  const [currentChatId, setCurrentChatId] = useState("");
  const [isSourceSiteOpen, setIsSourceSiteOpen] = useState(false);

  // --- Load from localStorage on mount ---
  useEffect(() => {
    if (!userId) return;
    const saved = localStorage.getItem(`chatHistory_${userId}`);
    if (saved) {
      try {
        setChatHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }
  }, [userId]);

  // --- Save to localStorage whenever chatHistory changes ---
  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(chatHistory));
  }, [chatHistory, userId]);

  // --- Your existing methods ---
  const startNewChat = useCallback((categoryId = "", providedId) => {
    const categoryObj = DEFAULT_CATEGORIES.find(c => c.id === categoryId);
    const cId = providedId || crypto.randomUUID();
    const initializeChat = {
      chatId: cId,
      category: categoryObj?.id || "",
      messages: [
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Hi! I'm your ${categoryObj?.name || "default"} assistant. Ask me anything.`,
          sources: []
        },
      ],
      sourceData: [],
      createdAt: Date.now(),
    };
    setChatHistory(prev => {
      if (prev.some(c => c.chatId === cId)) return prev;
      return [...prev, initializeChat];
    });
    return cId;
  }, []);

  const addMessage = useCallback((chatId, role, content) => {
    const newMsg = { id: crypto.randomUUID(), role, content };
    setChatHistory(prev => prev.map(chat =>
      chat.chatId === chatId
        ? { ...chat, messages: [...chat.messages, newMsg] }
        : chat
    ));
  }, []);

  const askQuery = useCallback(async (query, domain, userId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, domain, user_id: userId }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error fetching query response");
      }
      return await response.json();
    } catch (err) {
      console.error("❌ Query API error:", err.message);
      return { status: false, message: err.message, response: null, metadata: null };
    }
  }, []);

  const sendMessage = useCallback(async (chatId, content, userId) => {
    const userMessage = { id: crypto.randomUUID(), role: "user", content };
    let baseMessages = [];
    setChatHistory(prev => prev.map(chat => {
      if (chat.chatId === chatId) {
        baseMessages = [...chat.messages, userMessage];
        return { ...chat, messages: baseMessages, isLoading: true };
      }
      return chat;
    }));

    let baseAssistantMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: "",
      sources: []
    };
    const res = await askQuery(content, activeCategoryId, userId);
    if (!res?.status) {
      baseAssistantMessage = { ...baseAssistantMessage, content: res?.message };
    } else {
      baseAssistantMessage = {
        ...baseAssistantMessage,
        content: res?.response,
        sources: res?.metadata?.sources
      };
    }
    setChatHistory(prev =>
      prev.map(chat => {
        if (chat.chatId === chatId) {
          return {
            ...chat,
            sourceData: res?.metadata?.data,
            messages: [...chat.messages, baseAssistantMessage],
            isLoading: false,
          };
        }
        return chat;
      })
    );
    fetchCredits(userId);
  }, [activeCategoryId, askQuery, fetchCredits]);

  const getChatById = useCallback(
    (chatId) => chatHistory.find(chat => chat.chatId === chatId),
    [chatHistory]
  );

  const setActiveChat = (chatId) => setCurrentChatId(chatId);
  const switchCategory = (catId) => setActiveCategoryId(catId);

  const values = {
    categories: DEFAULT_CATEGORIES,
    chatHistory,
    activeCategoryId,
    currentChatId,
    isSourceSiteOpen,
    startNewChat,
    addMessage,
    sendMessage,
    getChatById,
    switchCategory,
    setActiveChat,
    setIsSourceSiteOpen
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
}

export const useChats = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChats must be used within ChatsProvider");
  return ctx;
};
