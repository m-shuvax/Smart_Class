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
        const studentChat = chats.find(chat => chat.studentId === studentId) || { messages: [] };
        setChat(studentChat.massgses);
        setShowChatList(false);
        setShowChat(true);
    }

    const handleBackClick = () => {
        setShowChatList(true);
        setShowChat(false);
    }

    return (
        <div className="flex flex-col bg-blue-100 h-screen overflow-hidden">
            {showChatList ? (
                <div className="bg-blue-200 p-4 h-full overflow-y-auto">
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
            ) : (
                <div className="flex-1">
                    <button
                        onClick={handleBackClick}
                        className=" w-12 h-12 ml-2"
                    >
                        <XCircleIcon className="h-8 w-8 text-blue-500"/>
                    </button>
                    <Chat chat={chat} />
                </div>
            )}
        </div>
    );
}

export default InstructorChat;