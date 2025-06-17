import React, { useContext } from 'react';
import { domains } from '../assets/data';
import { apiContext } from '../context/ApiContextProvider';

const Sidebar = () => {

    const { chats, selectedDomain, setSelectedDomain } = useContext(apiContext)

    return (
        <aside className="fixed top-20 left-0 w-72 h-[calc(100vh-80px)] bg-white border-r border-gray-100 px-4 py-6 flex flex-col z-10">
            {/* Fixed top part: Domain Selection + "Chats" header */}
            <div className="flex-shrink-0">
                <h2 className="text-sm font-medium text-gray-900 mb-3">Knowledge Domains</h2>
                <div className="space-y-1">
                    {domains.map((domain) => {
                        const Icon = domain.icon;
                        const isSelected = selectedDomain === domain.id;
                        return (
                            <button
                                key={domain.id}
                                onClick={() => setSelectedDomain(domain.id)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${isSelected ? 'bg-gray-900 text-white' : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{domain.name}</span>
                                </div>
                                <span className="text-xs opacity-60">{domain.docs}</span>
                            </button>
                        );
                    })}
                </div>

                <h3 className="text-sm font-medium text-gray-900 mt-6 mb-3">Chats</h3>
            </div>

            {/* Scrollable Chats history */}
            <div className="flex-1 overflow-y-auto space-y-1">
                {[...chats].reverse().map((query, index) => (
                    <button
                        key={index}
                        className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                    >
                        {query}
                    </button>
                ))}
            </div>
        </aside>
    )
};

export default Sidebar;
