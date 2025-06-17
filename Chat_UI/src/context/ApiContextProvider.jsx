import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid"

export const apiContext = createContext();

const ApiContextProvider = ({ children }) => {
    const [creditsUse, setCreditsUse] = useState(0);
    const [userId, setUserId] = useState("");
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [chats, setChats] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState('healthcare');
    const [sources, setSources] = useState([])

    const trackTheCreditsUsages = async () => {
        try {
            const res = await fetch(`http://localhost:8000/credits?user_id=${userId}`);
            const data = await res.json();
            if (data.credits !== undefined) {
                setCreditsUse(data.credits);
            }
        } catch (err) {
            console.error("Failed to fetch credits", err);
        }
    };

    const userIdManager = () => {
        const id = localStorage.getItem("user_id");
        if (!id) {
            const newId = uuidv4();
            localStorage.setItem("user_id", newId);
            setUserId(newId);
            console.log("New user ID created:", newId);
        } else {
            setUserId(id);
            console.log("Existing user ID used:", id);
        }
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newMsg = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMsg]);
        setChats(pre => [...pre, inputMessage])
        setInputMessage('');
        setIsTyping(true);

        const response = await fetch("http://localhost:8000/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: inputMessage, domain: selectedDomain, user_id: userId }),
        });

        const data = await response.json();
        if (data.error) {
            alert(data.error);
            setIsTyping(false);
        } else {
            setSources(data.chunks)
            const aiResponse = {
                id: Date.now() + 1,
                text: data.answer,
                sender: 'ai',
                timestamp: new Date(),
                sources: data.chunks
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
            await trackTheCreditsUsages();
        }
    };

    const values = {
        inputMessage,
        creditsUse,
        messages,
        isTyping,
        chats,
        selectedDomain,
        sources,
        userIdManager,
        trackTheCreditsUsages,
        setInputMessage,
        setMessages,
        setIsTyping,
        setChats,
        handleSendMessage,
        setSelectedDomain
    }

    return (
        <apiContext.Provider value={values}>
            {children}
        </apiContext.Provider>
    )

}

export default ApiContextProvider
