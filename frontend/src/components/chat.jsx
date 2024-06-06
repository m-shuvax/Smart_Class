import React, { useEffect, useState } from 'react';

const Chat = ({ chat, classId, studentId }) => {

  const handleSend = async () => {
    if (newMessage.trim()) {
      try {
        const res = await axios.post('/api/chats/createMessage', {
          userId: studentId,
          chatId: chat._id, // Assuming chat object has _id property
          messageText: newMessage
        });
        if (res.data && res.data.chat) {
          setChat(res.data.chat);
          setNewMessage('');
        };
      } catch (error) {
        setError('Error sending message: ' + error.message);
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!chat) {
    return <div>Loading...</div>;
  };

  return (
    <div className="flex-col h-3/4 border-t-2 rounded-md">
      <div
        id="messages"
        className="flex-col overflow-y-auto h-full p-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {chat.messages && chat.messages.map((message) => (
          <div key={message._id} className={`chat-message ${message.authorId === studentId ? 'justify-end' : ''}`}>
            <div className={`flex items-end ${message.authorId === studentId ? 'justify-end' : ''}`}>
              <div className={`flex m-2 space-y-auto text-xs max-w-xs mx-4 ${message.authorId === studentId ? 'order-1 items-end' : 'order-2 items-start'}`}>
                <div>
                  <span className={`px-4 py-4 rounded-lg inline-block ${message.authorId === studentId ? 'rounded-br-none bg-blue-600 text-white' : 'rounded-bl-none bg-gray-300 text-gray-600'}`}>
                    {message.message}
                  </span>
                </div>
              </div>
              <img
                src={message.authorId === studentId ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Q9080m8Y7DsWjezuwEv1sKjl-UiB0AagUkzsfS6OcQ&s" : "https://mego.org.il/wp-content/uploads/2022/06/%D7%9C%D7%95%D7%92%D7%95-MeGo.jpg"}
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
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full focus:outline-none focus:placeholder-gray-300 text-gray-500 placeholder-gray-400 pl-6 bg-gray-200 rounded-full py-3"
            aria-label="Write your message"
          />
          <div className="absolute right-0 items-center inset-y hidden sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-600 hover:bg-gray-300"
              onClick={handleSend}
              aria-label="Send message"
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
                  d="M14.752 11.168l-4.586-4.586a2 2 0 10-2.828 2.828l4.586 4.586a2 2 0 102.828-2.828zM7 10l-3 3m6 6H3v-3m0 6h18v-6m-6 6v-3m3 3v-6"
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
