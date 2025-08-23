"use client";
import React, { useRef, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useChats } from "@/context/ChatsProvider";
import { SampleQueries } from "@/components/chat/SampleQueries";
import { useAuth } from "@/context/AuthProvider";

export function ChatInput() {
  const { sendMessage, currentChatId, getChatById } = useChats();
  const { user } = useAuth()
  const currentChat = getChatById(currentChatId);
  const textRef = useRef(null);
  const [value, setValue] = useState("");

  function selectQuery(query) {
    setValue(query.trim());
    // focus and move caret to end on next frame
    requestAnimationFrame(() => {
      textRef.current?.focus();
      const el = textRef.current;
      if (el) {
        el.selectionStart = el.selectionEnd = el.value.length;
      }
    });
  }

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  function onSend() {
    if (!value.trim()) return;
    if (!currentChatId) {
      console.warn("No active chat selected");
      return;
    }
    const userId = user?.id;
    sendMessage(currentChatId, value.trim(), userId);
    setValue("");
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <SampleQueries selectQuery={selectQuery} />
      <div className="flex items-end gap-2 w-full">
        <div className="flex flex-col flex-1 gap-2">
          <textarea
            ref={textRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
            aria-label="Chat message input"
            className="w-full resize-none overflow-y-auto max-h-[100px] min-h-[44px] rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/60 shadow-sm leading-relaxed custom-scrollbar"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={onSend}
          disabled={!value.trim() || currentChat?.isLoading}
          aria-label={
            currentChat?.isLoading ? "Waiting for assistant" : "Send message"
          }
          className="relative h-[44px] w-[44px] shrink-0 rounded-full bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 text-white transition-colors flex items-center justify-center self-end"
        >
          {currentChat?.isLoading ? (
            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
