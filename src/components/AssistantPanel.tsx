import {
  ArrowUp,
  Box,
  Clock,
  ShoppingCart,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { useState } from 'react'

type ChatMessage = { id: string; role: 'user' | 'assistant'; text: string }

const suggestions = [
  { icon: Clock, text: 'Find segments like my last built segment' },
  { icon: Wrench, text: 'Find segments built in the last week' },
  { icon: Box, text: 'Find segments with clean room data' },
  { icon: ShoppingCart, text: 'Find segments with Marketplace segments' },
]

type Props = {
  onClose: () => void
}

export function AssistantPanel({ onClose }: Props) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: trimmed,
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text:
            'This is a demo assistant. Connect your API to enable live AI responses. For now, try adding assets from Marketplace or ask how overlaps work.',
        },
      ])
    }, 450)
  }

  return (
    <aside className="flex h-full w-[530px] shrink-0 flex-col border-l border-gray-200 bg-white shadow-xl">
      <header className="flex items-center justify-between gap-2 border-b border-violet-100 bg-[#ede9fe] px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-700" />
          <h2 className="text-sm font-semibold text-gray-900">Segment Builder Assistant</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-gray-600 hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ede9fe]"
          aria-label="Close assistant"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-900">How can I help you today?</p>
            <p className="mt-1 text-gray-600">
              I&apos;m learning every day. Here&apos;s what I can help you with right now.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Find Asset', 'Suggest Segments', 'How to get started'].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => send(label)}
                className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-900 hover:bg-violet-100"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          <ul className="space-y-2">
            {suggestions.map(({ icon: Icon, text }) => (
              <li key={text}>
                <button
                  type="button"
                  onClick={() => send(text)}
                  className="flex w-full items-start gap-2 rounded-lg border border-transparent px-2 py-2 text-left hover:border-gray-200 hover:bg-gray-50"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                  <span>{text}</span>
                </button>
              </li>
            ))}
          </ul>

          {messages.length > 0 && (
            <div className="space-y-3 border-t border-gray-100 pt-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'ml-4 bg-[#00c853]/10 text-gray-900'
                      : 'mr-4 bg-gray-100 text-gray-800'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a description of the segment you'd like to build"
            rows={3}
            className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#00c853] focus:outline-none focus:ring-1 focus:ring-[#00c853]"
          />
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                className="text-xs font-medium text-violet-700 hover:underline"
                onClick={() => setMessages([])}
              >
                + New Chat
              </button>
              <button type="button" className="text-xs font-medium text-gray-600 hover:underline">
                Recent Chats
              </button>
            </div>
            <button
              type="button"
              onClick={() => send(input)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00c853] text-gray-900 shadow hover:bg-[#00e676]"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
