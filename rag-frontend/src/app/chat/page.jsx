"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useChats } from "@/context/ChatsProvider";

export default function ChatIndexRedirect() {
  const router = useRouter();
    const { activeCategoryId, startNewChat } = useChats();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
      const newId = startNewChat(activeCategoryId); // auto-create starter chat using current category
    router.replace(`/chat/${newId}`);
    }, [router, startNewChat, activeCategoryId]);

  return null; // nothing while redirecting
}
