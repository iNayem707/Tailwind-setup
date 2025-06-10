export const MessageInput = ({ message, setMessage, handleSubmit }) => (
  <form onSubmit={handleSubmit} className='flex space-x-1'>
    <input
      type='text'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder='Type a message...'
      className='flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
    <button
      type='submit'
      className='px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer'
    >
      Send
    </button>
  </form>
);
