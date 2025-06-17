import { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import { domains } from '../assets/data';
import { apiContext } from '../context/ApiContextProvider';

const ChatUI = () => {

    const { userIdManager, trackTheCreditsUsages, selectedDomain } = useContext(apiContext)

    useEffect(() => {
        const init = async () => {
            userIdManager();
            await trackTheCreditsUsages();
        };

        init();
    }, []);

    const currentDomain = domains.find(d => d.id === selectedDomain);

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <Sidebar />
            <ChatBox
                currentDomain={currentDomain}
            />
        </div>
    );
};

export default ChatUI;
