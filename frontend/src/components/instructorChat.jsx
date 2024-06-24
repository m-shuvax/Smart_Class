import React, { useState } from "react";
import Chat from "../components/chat";
import { XCircleIcon } from '@heroicons/react/solid';

const InstructorChat = ({ chats }) => {
    const [chat, setChat] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [showChatList, setShowChatList] = useState(true);

    const handleStudentClick = (studentId, studentName) => {
        setSelectedStudent({ studentId, studentName });
        // Find the chat associated with the selected student
        const chat = chats.find((chat) => chat.studentId === studentId);
        setChat(chat);
        setShowChatList(false);
        setShowChat(true);
    }

    const handleBackClick = () => {
        setShowChatList(true);
        setShowChat(false);
    }

    return (
        <div>
            {showChatList ? (
                <div className="fixed top-20 right-4 h-4/5 w-1/3 bg-blue-300 p-4 rounded-md shadow-md">
                    {chats.length > 0 && (
                        <ul>
                            {chats.map((chat) => (
                                <li
                                    key={chat.studentId}
                                    onClick={() => handleStudentClick(chat.studentId, chat.studentName)}
                                    className="cursor-pointer text-blue-400 hover:text-blue-600 bg-blue-100 hover:bg-blue-200 text-center text-2xl my-2 rounded-md shadow-md"
                                >
                                    {chat.studentName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )
                :
                (
                    <div className="fixed top-20 right-4 h-4/5 w-1/3 bg-blue-300 p-4 rounded-md shadow-md pb-0">
                        <div className="relative h-full">
                            <button
                                onClick={handleBackClick}
                                className="absolute top-[-16px] left-[-16px] text-blue-500 hover:text-blue-700"
                            >
                                <XCircleIcon className="h-8 w-8" />
                            </button>
                            <h2 className="text-lg font-bold mb-4 text-white pt-1 pl-2">{`Chat with ${selectedStudent.studentName}`}</h2>
                            <Chat
                             chat={chat}
                             setChat={setChat}
                             />
                        </div>
                    </div>
                )}
        </div>
    );
}

export default InstructorChat;