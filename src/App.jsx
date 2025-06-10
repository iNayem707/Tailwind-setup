import './App.css';
import Chat from './pages/Chat';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-green-500 text-white py-4 text-center'>
        Header
      </header>
      <section className='flex flex-1 '>
        <div className='w-1/6 bg-gray-200 p-4'>Side</div>
        <div className='w-3/4 bg-white p-4'>
          <Chat />
        </div>
      </section>
    </div>
  );
}

export default App;
