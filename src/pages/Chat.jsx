import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// IMPORT COMPONENTS
import { JoinRoomForm } from '../components/message/JoinRoomForm';
import { RoomDetails } from '../components/message/RoomDetails';
import { MessageList } from '../components/message/MessageList';
import { MessageInput } from '../components/message/MessageInput';

// Adjust the URL if needed
const socket = io('http://localhost:5000');

export default function Chat() {
  const [socketId, setSocketId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [participants, setParticipants] = useState([]);

  const messageListRef = useRef(null);

  // Function to update messages
  const updateMessages = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Setup socket listeners and cleanup
  useEffect(() => {
    // Define socket event listeners
    const handleSocketEvents = () => {
      socket.on('connect', () => setSocketId(socket.id));
      socket.on('chat history', setMessages);
      socket.on('chat message', (data) => updateMessages(data));
      socket.on('user joined', (msg) =>
        updateMessages({ id: 'System', text: msg })
      );
      socket.on('user left', (msg) =>
        updateMessages({ id: 'System', text: msg })
      );
      socket.on('update users', setParticipants);
    };

    handleSocketEvents();

    // Cleanup socket event listeners
    return () => {
      socket.off('connect');
      socket.off('chat message');
      socket.off('user joined');
      socket.off('user left');
      socket.off('update users');
    };
  }, []); // Only on mount/unmount

  // Scroll to bottom of the message list when a new message is added
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Join Room Handler
  const joinRoom = (e) => {
    e.preventDefault();
    if (room.trim()) {
      socket.emit('join room', room);
      setIsJoined(true);
    }
  };

  // Leave Room Handler
  const leaveRoom = () => {
    if (isJoined) {
      socket.emit('leave room');
      resetRoomState();
    }
  };

  // Reset room-related state
  const resetRoomState = () => {
    setIsJoined(false);
    setRoom('');
    setMessages([]);
    setParticipants([]);
  };

  // Submit message handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && isJoined) {
      socket.emit('chat message', { room, msg: message });
      setMessage('');
    }
  };

  return (
    <div className=''>
      <h3 className='text-gray-600 mb-2'>Your ID: {socketId}</h3>

      {!isJoined ? (
        <JoinRoomForm room={room} setRoom={setRoom} joinRoom={joinRoom} />
      ) : (
        <>
          <RoomDetails
            room={room}
            leaveRoom={leaveRoom}
            participantsCount={participants.length}
          />
          <div
            ref={messageListRef}
            className='chat-container mb-4 p-10 space-y-2 overflow-y-auto h-[70vh] border rounded-2xl border-amber-200'
          >
            <MessageList messages={messages} socketId={socketId} />
          </div>

          <MessageInput
            message={message}
            setMessage={setMessage}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
