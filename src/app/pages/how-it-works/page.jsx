import React from 'react';

export default function HowItWorks() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="w-full max-w-3xl bg-white text-gray-800 rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          How It Works
        </h1>

        <p className="text-lg mb-6 leading-relaxed">
          Welcome to the <strong>Rate My Professor</strong> chatbot! This tool is designed to help students find the best professors based on their specific needs and preferences.
        </p>

        <h2 className="text-2xl font-semibold mb-4">How to Use:</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 pl-4">
          <li>Start by typing a question about a professor or course.</li>
          <li>The chatbot will analyze your question and search for the top 3 professors that best match your criteria.</li>
          <li>You’ll receive detailed information about the professors, including their reviews, subjects, and overall ratings.</li>
          <li>Use this information to make an informed decision about which classes to take.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Example Questions:</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="mb-2 font-bold text-blue-600">User:</p>
            <p className="mb-2">Who is the best professor for Computer Science 101?</p>
            <p className="font-bold text-purple-600">Assistant:</p>
            <p>Based on reviews, here are the top 3 professors for Computer Science 101...</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="mb-2 font-bold text-blue-600">User:</p>
            <p className="mb-2">Which professor has the highest rating for teaching Calculus?</p>
            <p className="font-bold text-purple-600">Assistant:</p>
            <p>The top-rated professor for Calculus is...</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Get Started:</h2>
        <p className="text-lg leading-relaxed">
          To begin, simply navigate to the main chat page and start asking your questions!
          The chatbot is ready to assist you in finding the best professors for your courses.
        </p>

        <div className="mt-8 text-center">
          <a
            href="/pages/chat"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            Go to Chat
          </a>
        </div>
      </div>
    </div>
  );
}
