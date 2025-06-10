import { LiaDoorOpenSolid } from 'react-icons/lia';

export const RoomDetails = ({ room, leaveRoom, participantsCount }) => (
  <div className='flex justify-between '>
    <div>
      <h4 className='text-gray-600 mb-2'>Room Name: {room}</h4>
      <h4 className='text-gray-600 mb-2'>Participants: {participantsCount}</h4>
    </div>
    <button
      onClick={leaveRoom}
      className='mb-6 flex items-center px-2 py-0 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer'
    >
      <LiaDoorOpenSolid size={25} />
      Leave
    </button>
  </div>
);
