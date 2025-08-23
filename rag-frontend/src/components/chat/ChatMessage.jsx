"use client";
import { useChats } from "@/context/ChatsProvider";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ChatMessage({ role, content, sources = [] }) {
  const { setIsSourceSiteOpen } = useChats()
  const isUser = role === "user";

  const decodedMarkdown = React.useMemo(() => {
    if (!content) return "";
    return content
      .replace(/\\r\\n/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\r\n/g, "\n");
  }, [content]);

  return (
    <div
      className={`flex w-full px-4 sm:px-8 md:px-16 ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`text-sm leading-relaxed rounded-xl shadow-sm border break-words w-fit max-w-[85%] sm:max-w-[75%] md:max-w-[70%] xl:max-w-[60%] p-3 sm:p-4
          ${isUser
            ? "bg-emerald-600 text-white border-emerald-700"
            : "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
          }`}
      >
        {isUser ? (
          // User messages: preserve all line breaks
          <p className="whitespace-pre-wrap break-words">{content}</p>
        ) : (
          <div className="flex flex-col gap-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => (
                  <p {...props} className="leading-relaxed break-words whitespace-pre-wrap" />
                ),
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    className="text-sky-600 underline dark:text-sky-400 hover:underline underline-offset-2 decoration-sky-600/60 dark:decoration-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-500/50 rounded-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                strong: ({ node, ...props }) => <strong {...props} className="font-semibold" />,
                em: ({ node, ...props }) => <em {...props} className="italic" />,
                del: ({ node, ...props }) => <del {...props} className="opacity-80" />,
                h1: ({ node, ...props }) => <h1 {...props} className="mt-2 mb-3 text-xl font-semibold tracking-tight" />,
                h2: ({ node, ...props }) => <h2 {...props} className="mt-2 mb-2 text-lg font-semibold tracking-tight" />,
                h3: ({ node, ...props }) => <h3 {...props} className="mt-2 mb-1.5 text-base font-semibold" />,
                h4: ({ node, ...props }) => <h4 {...props} className="mt-2 mb-1 text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300" />,
                h5: ({ node, ...props }) => <h5 {...props} className="mt-2 mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400" />,
                h6: ({ node, ...props }) => <h6 {...props} className="mt-2 mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400" />,
                hr: () => <div className="my-4 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent" />,
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    {...props}
                    className="pl-4 border-l-4 border-emerald-500/70 dark:border-emerald-400/60 text-neutral-700 dark:text-neutral-200 italic bg-emerald-500/5 rounded-sm py-1"
                  />
                ),
                ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 space-y-1" />,
                ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 space-y-1" />,
                li: ({ node, ...props }) => <li {...props} className="leading-relaxed" />,
                table: ({ node, ...props }) => (
                  <div className="overflow-auto w-full">
                    <table {...props} className="w-full text-left border-collapse text-xs sm:text-sm">
                      {props.children}
                    </table>
                  </div>
                ),
                thead: ({ node, ...props }) => <thead {...props} className="bg-neutral-200/70 dark:bg-neutral-700/60" />,
                th: ({ node, ...props }) => <th {...props} className="py-1.5 px-2 font-semibold border border-neutral-300 dark:border-neutral-600" />,
                td: ({ node, ...props }) => <td {...props} className="py-1 px-2 border border-neutral-300 dark:border-neutral-600 align-top" />,
                code: ({ inline, className, children, ...props }) =>
                  inline ? (
                    <code {...props} className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-[12px] font-mono">{children}</code>
                  ) : (
                    <pre className="m-0 p-0 bg-transparent"><code className="block px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-700 font-mono">{children}</code></pre>
                  ),
              }}
            >
              {/* Replace \n with Markdown line breaks */}
              {decodedMarkdown}
            </ReactMarkdown>

            {!!sources?.length && (
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Sources</p>
                <div className="flex flex-wrap gap-1.5">
                  {sources.map((label, i) => (
                    <span
                      key={i}
                      onClick={() => setIsSourceSiteOpen(o => !o)}
                      className="text-[10px] px-2 py-1 rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border border-emerald-600/30 max-w-[180px] truncate cursor-pointer"
                      title={label}
                    >
                      <span className="font-semibold mr-1">{i + 1}.</span>{label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
