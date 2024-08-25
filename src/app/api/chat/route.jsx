import { NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'

// Define the system prompt
const systemPrompt = `
You are a rate my professor agent to help students find classes, that takes in user questions and answers them.
For every user question, the top 3 professors that match the user question are returned.
Use them to answer the question if needed.
`

// Define the API route handler
export async function POST(req) {
  try {
    const data = await req.json()  // Parse the request body as JSON

    if (!data || !Array.isArray(data)) {
      return new NextResponse('Invalid input', { status: 400 })
    }

    // Initialize Pinecone client
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    }) 
    const index = pc.index('rag').namespace('ns1')
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, })
    
    const text = data[data.length - 1].content
const embedding = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: text,
  encoding_format: 'float',
})


    // Query Pinecone index
    const results = await index.query({
      topK: 5,
      includeMetadata: true,
      vector: embedding.data[0].embedding,
    })

    // Format the result string
    let resultString = ''
    results.matches.forEach((match) => {
      resultString += `
      Returned Results:
      Professor: ${match.id}
      Review: ${match.metadata.stars}
      Subject: ${match.metadata.subject}
      Stars: ${match.metadata.stars}
      \n\n`
    })

    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)

    // Get chat completion from OpenAI
    const completionStream = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...lastDataWithoutLastMessage,
        { role: 'user', content: lastMessageContent },
      ],
      model: 'gpt-3.5-turbo',
      stream: true,
    })

    // Return the stream as response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          for await (const chunk of completionStream) {
            const content = chunk.choices[0]?.delta?.content
            if (content) {
              const text = encoder.encode(content)
              controller.enqueue(text)
            }
          }
        } catch (err) {
          console.error('Error during streaming:', err)
          controller.error(err)
        } finally {
          controller.close()
        }
      },
    })

    return new NextResponse(stream)
  } catch (err) {
    console.error('Error in POST request:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
