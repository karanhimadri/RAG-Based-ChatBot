import React, { useContext, useState } from 'react';
import { MessageCircle, Database, Zap, Sparkles, Info } from 'lucide-react';
import { apiContext } from '../context/ApiContextProvider';

const Navbar = () => {
    const { creditsUse } = useContext(apiContext);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">RAG Assistant</h1>
                            <p className="text-xs text-gray-500">Knowledge Retrieval System</p>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                            <Database className="w-3 h-3" />
                            <span>ChromaDB</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>Cohere</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Gemini</span>
                        </div>
                    </div>

                    {/* Credits & Profile & "How it works?" */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-xs text-blue-600 hover:underline flex items-center space-x-1"
                        >
                            <Info className="w-3 h-3" />
                            <span>How it works?</span>
                        </button>

                        <div className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            {creditsUse} Credits
                        </div>

                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* How its Works? */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                        <h2 className="text-lg font-semibold mb-2">How it works</h2>
                        <p className="text-sm text-gray-700 mb-4">
                            This chatbot uses a RAG (Retrieval-Augmented Generation) architecture:
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                                <li>🔍 Retrieves relevant knowledge chunks from domain-specific datasets using ChromaDB.</li>
                                <li>💡 Uses Cohere/Gemini to generate intelligent responses based on retrieved content.</li>
                                <li>🧠 Domains supported: Legal, Education, Research, and Policy.</li>
                                <li>🔐 Tracks per-user credits (free usage quota).</li>
                            </ul>
                            <div className="mt-4">
                                <a href="https://github.com/yourusername/yourproject" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    GitHub Repository
                                </a><br />
                                <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    LinkedIn
                                </a>
                            </div>
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
