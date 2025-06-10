export function MessageList({ messages, socketId }) {
  return (
    <ul className='space-y-2'>
      {messages.map((msg, index) => {
        const isCurrentUser = msg.id === socketId;
        const isSystemMessage = msg.id === 'System';

        return (
          <li
            key={index}
            className={`p-2 rounded-lg max-w-[50%] ${
              isSystemMessage
                ? 'text-center mx-auto bg-amber-50'
                : isCurrentUser
                ? 'bg-blue-200 text-black self-end ml-auto'
                : 'bg-gray-100 text-black self-start mr-auto'
            }`}
            style={{
              textAlign: isSystemMessage
                ? 'center'
                : isCurrentUser
                ? 'right'
                : 'left',
            }}
          >
            {!isSystemMessage && <strong>{msg.id}: </strong>}
            {msg.text}
          </li>
        );
      })}
    </ul>
  );
}
