"use client";
import { useAuth } from "@/context/AuthProvider";
import { useChats } from "@/context/ChatsProvider";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { FaArrowsAltH } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export function Sidebar({ collapsed, onToggle }) {

  const { user } = useAuth()
  const router = useRouter();
  const { chatHistory, currentChatId, categories, activeCategoryId, startNewChat, switchCategory, setActiveChat } = useChats()

  function onNewChat() {
    const chatId = startNewChat();
    router.push(`/chat/${chatId}`)
  }

  function onSelectChat(chatId) {
    if (currentChatId === chatId) {
      return
    }
    setActiveChat(chatId)
    router.push(`/chat/${chatId}`)
  }

  return (
    <aside
      className={`flex flex-col h-full border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 transition-all duration-300 ease-out
      ${collapsed ? "w-14" : "w-72"}`}
    >
      {/* Header: brand row + new chat */}
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 space-y-2">
        <div className="flex items-center gap-2 justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative w-7 h-7 rounded-md overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shrink-0">
                <Image src="/chatnest.png" alt="Logo" fill sizes="28px" className="object-cover" priority />
              </div>
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">ChatNest AI</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="rounded-md w-8 h-8 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-sm border border-neutral-300/70 dark:border-neutral-700 shrink-0"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? (
              <Image
                src="/chatnest.png"
                alt="Logo"
                width={20}
                height={20}
                className="object-cover"
                priority
              />
            ) : (
              <FaArrowsAltH size={18} />
            )}
          </button>
        </div>
        {/* New Chat button (full width) */}
        <div>
          <button
            onClick={onNewChat}
            aria-label="Start a new chat"
            className={`flex items-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:focus:ring-offset-neutral-950
              ${collapsed
                ? 'h-8 w-8 mx-auto justify-center bg-transparent text-neutral-600 dark:text-neutral-300 border border-neutral-300/70 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                : 'w-full justify-center gap-2 text-sm py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white'}
            `}
            title="Start a new chat"
          >
            {collapsed ? (
              <FiEdit size={18} />
            ) : (
              <>
                <FiEdit size={16} />
                <span>New Chat</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 space-y-2 overflow-hidden">
        {!collapsed && (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Categories</p>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => switchCategory(cat.id)}
                  className={`text-left rounded-md px-3 py-2 text-xs font-medium tracking-wide transition-colors border flex items-center gap-2
                    ${activeCategoryId === cat.id
                      ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                      : "bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-800 border-transparent"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Chat history (hidden entirely when collapsed) */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">History</p>
          <div className="flex flex-col gap-1">
            {chatHistory.map((chat) => {
              const firstUserMsg = chat?.messages?.find((m) => m.role === "user");
              let baseLabel = firstUserMsg ? firstUserMsg.content.trim() : "New Chat";
              const MAX_CHARS = 50;
              let displayLabel = baseLabel;
              if (firstUserMsg && baseLabel.length > MAX_CHARS) {
                displayLabel = baseLabel.slice(0, MAX_CHARS).replace(/\s+$/, '') + "......";
              }
              const isActive = chat?.chatId === currentChatId;
              return (
                <button
                  key={chat.chatId}
                  onClick={() => onSelectChat(chat?.chatId)}
                  className={`group text-left rounded-md px-3 py-2 text-[11px] leading-tight truncate border transition-colors relative
                    ${isActive
                      ? "bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 shadow-sm"
                      : "hover:bg-neutral-200 dark:hover:bg-neutral-800 border-transparent"}`}
                  title={baseLabel}
                >
                  <span className="block pr-2.5 truncate font-medium text-neutral-700 dark:text-neutral-200">
                    {displayLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* User profile */}
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800">
        {(() => {
          if (!user) {
            return (
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 text-center">
                {collapsed ? "?" : "Not signed in"}
              </div>
            );
          }
          const initials = (user.name || "?")
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((p) => p[0])
            .join("")
            .toUpperCase();
          if (collapsed) {
            return (
              <div
                className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-semibold mx-auto select-none"
                title={`${user?.name || "User"} • ${user?.email || ""}`}
              >
                {initials}
              </div>
            );
          }
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm select-none">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 truncate">{user?.name}</p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">{user?.email}</p>
              </div>
            </div>
          );
        })()}
      </div>
    </aside>
  );
}
