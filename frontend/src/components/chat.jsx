import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {

  const [newMessage, setNewMessage] = useState('');
  const [classId, setClassId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([
    {
      chatId: "abcde",
      authorId: "67890",
      date: "2024-05-21T12:34:56Z",
      message: "This is a sample message."
    },
    { id: 1, sender: 'You', message: 'How was your day?' },
    { id: 2, sender: 'user', message: 'Great, your class was an exceptional experience.' },
    { id: 3, sender: 'You', message: 'Thanks, do you have a question about what we learned?' },
    { id: 4, sender: 'user', message: 'Absolutely not, everything was just understandable.' },
    { id: 5, sender: 'user', message: 'You are a great teacher' },
    { id: 6, sender: 'You', message: 'I am here if you need anything.' },
  ]);

  const getChat = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/chats');
      setChat(res.data.chat);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSend = async () => {
    if (newMessage.trim()) {
      try {
        const response = await axios.post('/api/chats/createChat', {
          classId,
          studentId,
          messages: [...messages, { sender: 'You', message: newMessage }],
        });

        if (response.status === 200) {
          const data = response.data;
          setMessages([
            ...messages,
            { id: data.id, sender: 'You', message: newMessage },
            ...data.chat.messages,
          ]);
          setNewMessage('');
        } else {
          console.error('Error:', response.data);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    getChat();
  }, []);
return (
    <div className="flex-col h-3/4 border-t-2 rounded-md">
      <div
        id="messages"
        className="flex-col overflow-y-auto h-full p-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.sender === 'You' ? 'justify-end' : ''}`}>
            <div className={`flex items-end ${message.sender === 'You' ? 'justify-end' : ''}`}>
              <div className={`flex m-2 space-y-auto text-xs max-w-xs mx-4 ${message.sender === 'You' ? 'order-1 items-end' : 'order-2 items-start'}`}>
                <div>
                  <span className={`px-4 py-4 rounded-lg inline-block ${message.sender === 'You' ? 'rounded-br-none bg-blue-600 text-white' : 'rounded-bl-none bg-gray-300 text-gray-600'}`}>
                    {message.message}
                  </span>
                </div>
              </div>
              <img
                src={message.sender === 'You' ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Q9080m8Y7DsWjezuwEv1sKjl-UiB0AagUkzsfS6OcQ&s" : "https://mego.org.il/wp-content/uploads/2022/06/%D7%9C%D7%95%D7%92%D7%95-MeGo.jpg"}
                alt="Profile"
                className="w-6 h-6 rounded-full order-1"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex w-full border-t-2 border-gray-200">
        <div className="flex pt-2 w-full">
          <input
            type="text"
            placeholder="Write your message!"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full focus:outline-none focus:placeholder-gray-300 text-gray-500 placeholder-gray-400 pl-6 bg-gray-200 rounded-full py-3"
          />
          <div className="absolute right-0 items-center inset-y hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-600 hover:bg-gray-300"
              onClick={handleSend}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-4.586-4.586a2 2 0 10-2.828 2.828l4.586 4.586a2 2 0 102.828-2.828zM7 10l-3 3m6 6H3v-3m0 6h18v-6m-6 6v-3m3 3v-6m0 6h3v-6"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
