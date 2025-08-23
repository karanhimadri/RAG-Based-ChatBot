"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useAuth } from "@/context/AuthProvider";
import AuthModal from "@/components/auth/AuthModal";
import { useChats } from "@/context/ChatsProvider";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { SourceSite } from "@/components/chat/SourceSite";
import { FileText } from "lucide-react";

export default function ChatByIdPage() {
  const params = useParams();
  const chatIdFromRoute = params?.chatId;
  const { activeCategoryId, categories, getChatById, setActiveChat, startNewChat, isSourceSiteOpen, setIsSourceSiteOpen } = useChats();
  const activeCategoryName = categories.find(c => c.id === activeCategoryId)?.name || "Default";
  const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn, logout, credits, isAuthModelOpen, setIsAuthModelOpen } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [currentChat, setCurrentChat] = useState(null);
  const initializedRef = useRef(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chatIdFromRoute) return;
    const existing = getChatById(chatIdFromRoute);
    if (!existing && !initializedRef.current) {
      startNewChat(activeCategoryId, chatIdFromRoute);
      initializedRef.current = true;
    }
    const chat = getChatById(chatIdFromRoute);
    setCurrentChat(chat || null);
    setActiveChat(chatIdFromRoute);
  }, [chatIdFromRoute, getChatById, setActiveChat, startNewChat, activeCategoryId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [currentChat?.messages?.length, currentChat?.isLoading]);

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-neutral-100 relative">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main className="flex flex-col flex-1 h-full">
        {/* Header */}
        <header className="h-12 flex items-center gap-4 px-6 border-b border-neutral-200/80 dark:border-neutral-800/80 backdrop-blur-sm bg-white/60 dark:bg-neutral-900/50 sticky top-0 z-10">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h1 className="text-sm font-semibold tracking-wide text-neutral-700 dark:text-neutral-200 truncate">
              {activeCategoryName} Assistant
            </h1>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
              Prototype
            </div>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="text-xs px-2 py-1 rounded-md bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-600/30 font-medium">
                Credits: {credits}
              </div>
              <button
                onClick={logout}
                className="text-[11px] font-medium px-3 py-1.5 rounded-md bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors"
                title="logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setAuthMode("login"); setIsAuthModelOpen(true); }}
                className="text-[11px] font-medium px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => { setAuthMode("signup"); setIsAuthModelOpen(true); }}
                className="text-[11px] font-medium px-3 py-1.5 rounded-md bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </header>

        {isAuthModelOpen && <AuthModal mode={authMode} />}

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scroll-smooth min-w-0 overflow-x-hidden" id="chat-scroll">
          {currentChat?.messages.map((m, i) => (
            <ChatMessage key={m.id || i} role={m.role} content={m.content} sources={m.sources} />
          ))}
          {currentChat?.isLoading && <TypingIndicator />}
          {!currentChat && (
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              Chat not found.
            </p>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 p-4 bg-white/80 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60">
          <div className="max-w-3xl mx-auto">
            <ChatInput />
            <p className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400 text-center">
              Enter = send • Shift+Enter = newline
            </p>
          </div>
        </div>
        {/* Floating placeholder toggle for Sources (wired inside component) */}
        <div className="absolute bottom-24 right-4 z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={() => setIsSourceSiteOpen(o => !o)}
              className="shadow-lg rounded-full bg-emerald-600 hover:bg-emerald-700 text-white w-11 h-11 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              title="Toggle sources"
              type="button"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
      <SourceSite sources={currentChat?.sourceData} />
    </div>
  );
}
