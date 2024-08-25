'use client'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ])
  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])

    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let result = ''

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
        return reader.read().then(processText)
      })
    })
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="flex flex-col w-full h-full max-w-3xl bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <div className="flex flex-col space-y-2 overflow-y-auto flex-grow h-0">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`${
                  message.role === 'assistant'
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                } text-white rounded-lg p-3 max-w-xs break-words`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
