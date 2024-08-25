'use client'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <main className="text-center bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-h-96 mx-auto">
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Welcome to Rate My Professor AI
        </h1>
        <p className="text-lg mb-8 text-gray-700">
          Your AI Assistant for Choosing University Classes
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/pages/chat">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
              Try for Free
            </button>
          </Link>
          <Link href="/pages/how-it-works">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
              See How It Works
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
