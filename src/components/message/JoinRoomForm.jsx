export const JoinRoomForm = ({ room, setRoom, joinRoom }) => (
  <form onSubmit={joinRoom} className='mb-4 flex'>
    <input
      type='text'
      value={room}
      onChange={(e) => setRoom(e.target.value)}
      placeholder='Enter room name'
      className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
    <button
      type='submit'
      className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer'
    >
      Join Room
    </button>
  </form>
);
