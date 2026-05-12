import Anthropic from '@anthropic-ai/sdk'
import {
  ArrowUp,
  Box,
  Clock,
  Key,
  Loader2,
  ShoppingCart,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { useRef, useState } from 'react'

type ChatMessage = { id: string; role: 'user' | 'assistant'; text: string }

const suggestions = [
  { icon: Clock, text: 'Find segments like my last built segment' },
  { icon: Wrench, text: 'Find segments built in the last week' },
  { icon: Box, text: 'Find segments with clean room data' },
  { icon: ShoppingCart, text: 'Find segments with Marketplace segments' },
]

const SYSTEM_PROMPT = `You are an AI assistant embedded inside LiveRamp's Segment Builder — a tool that lets marketers combine audience rules from multiple data sources (1st-party CRM data, 2nd-party clean room data, and 3rd-party marketplace data) to build targeted advertising segments.

Your job is to help users:
- Understand what kinds of audience segments they can build
- Suggest which data sources or segment combinations would work best for their goal
- Explain concepts like CPM cost, 1P/2P/3P data tiers, clean room overlaps, and lookalike models
- Help them think through include/exclude logic for rules
- Recommend segment strategies for specific marketing objectives

Keep responses concise and practical. Use bullet points when listing options. Speak like a knowledgeable data strategy consultant, not an engineer.`

type Props = {
  onClose: () => void
}

export function AssistantPanel({ onClose }: Props) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('anthropic_api_key') ?? '')
  const [showKeyInput, setShowKeyInput] = useState(() => !localStorage.getItem('anthropic_api_key'))
  const [keyDraft, setKeyDraft] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  function saveKey() {
    const trimmed = keyDraft.trim()
    if (!trimmed) return
    localStorage.setItem('anthropic_api_key', trimmed)
    setApiKey(trimmed)
    setShowKeyInput(false)
    setKeyDraft('')
  }

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: trimmed }
    const assistantId = crypto.randomUUID()
    setMessages((m) => [...m, userMsg, { id: assistantId, role: 'assistant', text: '' }])
    setInput('')
    setLoading(true)

    // Scroll to bottom
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)

    try {
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
      const history = messages.map((m) => ({ role: m.role, content: m.text }))

      const stream = await client.messages.stream({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [...history, { role: 'user', content: trimmed }],
      })

      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta' &&
          'text' in chunk.delta
        ) {
          const deltaText = (chunk.delta as { type: 'text_delta'; text: string }).text
          setMessages((m) =>
            m.map((msg) =>
              msg.id === assistantId ? { ...msg, text: msg.text + deltaText } : msg,
            ),
          )
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } catch (err: unknown) {
      const errorText =
        err instanceof Error && err.message.includes('401')
          ? 'Invalid API key. Click the key icon to update it.'
          : err instanceof Error
          ? `Error: ${err.message}`
          : 'Something went wrong. Please try again.'
      setMessages((m) =>
        m.map((msg) =>
          msg.id === assistantId ? { ...msg, text: errorText } : msg,
        ),
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className="flex h-full w-[550px] shrink-0 flex-col border-l border-gray-200 bg-white shadow-xl">
      <header className="flex items-center justify-between gap-2 border-b border-violet-100 bg-[#ede9fe] px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-violet-700" />
          <h2 className="text-sm font-semibold text-gray-900">Segment Builder Assistant</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Set API key"
            onClick={() => setShowKeyInput((v) => !v)}
            className="rounded-md p-1.5 text-violet-600 hover:bg-white/70"
          >
            <Key className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-600 hover:bg-white/70"
            aria-label="Close assistant"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* API key setup */}
      {showKeyInput && (
        <div className="border-b border-violet-100 bg-violet-50 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-violet-800">
            Enter your Anthropic API key to enable the AI assistant. It is stored only in your browser.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="sk-ant-..."
              value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveKey()}
              className="flex-1 rounded-md border border-violet-200 bg-white px-3 py-1.5 text-sm focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
            />
            <button
              type="button"
              onClick={saveKey}
              className="rounded-md bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm text-gray-700">
          {messages.length === 0 && (
            <>
              <div>
                <p className="font-medium text-gray-900">How can I help you today?</p>
                <p className="mt-1 text-gray-600">
                  I&apos;m your segment strategy assistant. Ask me anything about building audiences.
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
            </>
          )}

          {messages.length > 0 && (
            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'ml-6 bg-[#00c853]/10 text-gray-900'
                      : 'mr-6 bg-gray-100 text-gray-800'
                  }`}
                >
                  {m.text || (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
            placeholder="Describe the audience you want to build…"
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
            </div>
            <button
              type="button"
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00c853] text-gray-900 shadow hover:bg-[#00e676] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
