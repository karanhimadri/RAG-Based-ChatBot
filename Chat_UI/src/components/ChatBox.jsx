// components/ChatBox.jsx
import React, { useRef, useEffect, useState, useContext } from 'react';
import { User, Bot, Send, Plus, Info } from 'lucide-react';
import { sampleQueries } from '../assets/data';
import { apiContext } from '../context/ApiContextProvider';

const ChatBox = ({
    currentDomain,
}) => {
    const { setInputMessage, inputMessage, messages, isTyping, handleSendMessage, sources } = useContext(apiContext)
    const messagesEndRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const IconComponent = currentDomain?.icon;

    return (
        <main className="ml-72 mt-20 h-[calc(100vh-80px)] flex flex-col px-6 py-4">
            <div className="flex flex-col h-full">

                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">{currentDomain.name}</h2>
                            <p className="text-xs text-gray-500">{currentDomain.docs} documents</p>
                        </div>
                    </div>
                    {/* Button to toggle sidebar */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        aria-label="Open data source sidebar"
                        type="button"
                    >
                        <Info className="w-4 h-4 text-gray-500" />
                    </button>
                </div>

                {/* Scrollable Chat Body */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-6 py-4">

                    {/* Messages */}
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex space-x-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                                    {message.sender === 'user' ? (
                                        <User className="w-4 h-4 text-white" />
                                    ) : (
                                        <Bot className="w-4 h-4 text-gray-600" />
                                    )}
                                </div>
                                <div className={`px-4 py-3 rounded-2xl ${message.sender === 'user' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                    {message?.sources && (
                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                            <p className="text-xs text-gray-500 mb-2">Sources:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {message.sources.map((source, i) => (
                                                    <span key={i} className="text-xs bg-white px-2 py-1 rounded border text-gray-600">
                                                        {source?.source}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="flex space-x-3 max-w-2xl">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-gray-600" />
                                </div>
                                <div className="px-4 py-3 bg-gray-50 rounded-2xl">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Section */}
                <div className="pt-4 border-t border-gray-100 flex-shrink-0 relative">

                    {/* Scrollable Sample Queries */}
                    {sampleQueries[currentDomain.id]?.length > 0 && (
                        <div className="mb-3 overflow-x-auto thin-scrollbar">
                            <div className="flex space-x-4 whitespace-nowrap px-2">
                                {sampleQueries[currentDomain.id].map((query, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setInputMessage(query)}
                                        className="text-sm px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap transition"
                                    >
                                        {query}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Field and Send */}
                    <div className="flex space-x-3 items-center">
                        {currentDomain?.id === "custom" && (
                            <button
                                className="p-2 rounded-full hover:bg-gray-200 transition"
                                aria-label="Toggle upload options"
                                type="button"
                            >
                                <Plus className="w-5 h-5 text-gray-600" />
                            </button>
                        )}

                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={`Message ${currentDomain.name} assistant...`}
                            className="flex-1 px-4 py-3 border border-gray-400 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />

                        <button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() || isTyping}
                            className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 transition flex items-center justify-center"
                            type="button"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-2 text-center">
                        <p className="text-xs text-gray-400">Powered by Cohere, ChromaDB, and Gemini</p>
                    </div>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    {/* Sidebar Panel */}
                    <aside className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 flex flex-col">
                        <header className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Data Sources</h3>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded"
                            >
                                ✕
                            </button>
                        </header>

                        {/* Sidebar content with sources */}
                        <div className="p-4 overflow-y-auto flex-1 space-y-4">
                            {sources?.map((src, index) => (
                                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{src.source}</h4>
                                    <p className="text-sm text-gray-600">{src.text}</p>
                                </div>
                            ))}
                        </div>
                    </aside>
                </>
            )}
        </main>
    );
};

export default ChatBox;



// {/* Search Results */}
//                     {searchResults?.length > 0 && (
//                         <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
//                             <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
//                                 <Search className="w-4 h-4 text-gray-500" />
//                                 <span>Search Results</span>
//                             </div>
//                             {searchResults.map((result, index) => (
//                                 <div
//                                     key={index}
//                                     className="flex justify-between items-start bg-white p-3 rounded-lg border border-gray-100"
//                                 >
//                                     <div>
//                                         <div className="text-sm font-semibold text-gray-900">{result.title}</div>
//                                         <div className="text-xs text-gray-500">{result.snippet}</div>
//                                     </div>
//                                     <span className="text-xs text-gray-400">{(result.relevance * 100).toFixed(0)}%</span>
//                                 </div>
//                             ))}
//                         </div>
//                     )}


const sources = [
    {
        source: "government.health.pdf",
        data: "Ayushman Bharat, launched in 2018, is one of the world’s largest health assurance schemes, offering free health coverage up to ₹5 lakh per family per year for secondary and tertiary hospitalization."
    },
    {
        source: "healthIndia.com",
        data: "The Indian healthcare system is a vast and complex network that includes public and private providers, spanning urban to rural areas. It aims to deliver affordable, accessible, and quality healthcare to over 1.4 billion people."
    }
]