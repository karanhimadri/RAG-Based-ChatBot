"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, FileText, ChevronRight } from "lucide-react";
import { useChats } from "@/context/ChatsProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export function SourceSite({ sources = [] }) {
  const { isSourceSiteOpen, setIsSourceSiteOpen } = useChats();
  const open = isSourceSiteOpen;
  const containerRef = useRef(null)
  const toggle = () => setIsSourceSiteOpen(o => !o);

  // Function to handle clicks outside
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (containerRef.current && !containerRef.current.contains(event.target)) {
  //       setIsSourceSiteOpen(false);
  //     }
  //   }

  //   // Listen for clicks
  //   // document.addEventListener("mousedown", handleClickOutside);

  //   // Cleanup
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <AnimatePresence initial={false} mode="wait">
      {open && (
        <motion.aside
          key="sources-sidebar"
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.8 }}
          className="fixed top-0 right-0 h-screen w-72 sm:w-80 lg:w-80 border-l border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/85 backdrop-blur-md shadow-xl flex flex-col z-40"
          ref={containerRef}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold tracking-wide uppercase text-neutral-700 dark:text-neutral-200">Sources</span>
            </div>
            <button
              onClick={toggle}
              aria-label="Close sources"
              className="p-1 rounded-md hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60 text-neutral-600 dark:text-neutral-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Hidden toggle handle (user can expose by removing hidden) */}
          <button onClick={toggle} className="hidden" aria-hidden="true" />

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            {sources.map(item => (
              <SourceCard key={item?.id} item={item} />
            ))}
            {!sources.length && (
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center mt-10">No sources available.</p>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function SourceCard({ item }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="group rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50/60 dark:bg-neutral-800/40 backdrop-blur-sm shadow-sm hover:shadow transition-shadow">
      <button
        onClick={() => setExpanded(e => !e)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <ChevronRight className={`w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-200 truncate" title={item?.source}>{item?.source}</span>
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden border-t border-neutral-200 dark:border-neutral-700"
      >
        <div className="px-3 py-2 text-[12px] leading-relaxed text-neutral-700 dark:text-neutral-200 markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...p }) => <p {...p} className="mb-2 last:mb-0" />,
              ul: ({ node, ...p }) => <ul {...p} className="list-disc pl-4 mb-2 space-y-1" />,
              ol: ({ node, ...p }) => <ol {...p} className="list-decimal pl-4 mb-2 space-y-1" />,
              li: ({ node, ...p }) => <li {...p} className="leading-snug" />,
              strong: ({ node, ...p }) => <strong {...p} className="font-semibold" />,
              em: ({ node, ...p }) => <em {...p} className="italic" />,
              code: ({ inline, children, ...p }) => inline ? <code {...p} className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-[11px] font-mono">{children}</code> : <pre className="bg-neutral-200 dark:bg-neutral-700 rounded p-2 text-[11px] font-mono overflow-x-auto mb-2">{children}</pre>
            }}
          >
            {item?.textdata.replace(/\\n/g, '\n')}
          </ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
}

export default SourceSite;

