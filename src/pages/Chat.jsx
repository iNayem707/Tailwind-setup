import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Change the URL if your server runs elsewhere

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'>
      <ul className='mb-4 space-y-2'>
        {messages.map((msg, index) => (
          <li key={index} className='p-2 bg-gray-100 rounded-lg'>
            {msg}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className='flex space-x-2'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message...'
          className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        >
          Send
        </button>
      </form>
    </div>
  );
}
