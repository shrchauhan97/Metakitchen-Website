import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Interactive Dr. Aara chat simulator.
 * State machine of scripted exchanges; user taps a quick-reply button to advance.
 * Wires cleanly to Gemini/Grok later by swapping `advance()` for an API call.
 */

// Each step: a list of options the user can pick + Aara's response keyed by chosen text
const SCRIPT = [
  {
    open: "Tell me about breakfast today — slow start or quick?",
    options: [
      { label: 'Slow start', reply: "Three weeks in, your bread is showing up in three meals out of seven. That is the right place to be. Try one slice with two eggs tomorrow." },
      { label: 'Quick — toast and chai', reply: 'A reliable combo. Toast holds up under the chai, the chai cuts through the butter. The Daily White is built for this exact morning.' },
      { label: 'Skipped it', reply: "You skipped breakfast yesterday too — alright? Skipping makes the midday loaf hit harder. One slice with a boiled egg tomorrow?" },
    ],
  },
  {
    open: "Your mother's daily bread question — let me check what works with metformin.",
    options: [
      { label: 'Please do', reply: 'For her: low-GI bread alongside metformin is generally well-tolerated and helps flatten the post-breakfast curve. Her physician\'s guidance is what matters — bread is bread, not a treatment.' },
      { label: "She likes the chia idea", reply: 'A chewier bite, slower release. A good next step after the Daily White settles into her routine. I will note it.' },
      { label: 'What else can she try?', reply: 'The sourdough variants are in development. Same low-GI rule, deeper flavour from a longer ferment. I will tell you when they are ready.' },
    ],
  },
  {
    open: 'The Daily White is hitting its stride for you. Want to plan around the line?',
    options: [
      { label: 'What is next?', reply: 'Chia Ciabatta — higher fibre, slower release, a chewier bite. Sourdough variants after that. The same low-GI rule across the whole line.' },
      { label: 'Stay on the Daily White', reply: 'A good call. Stability matters more than novelty. I will keep watching the patterns and tell you when something is worth changing.' },
      { label: 'Surprise me', reply: 'Try toast with butter and one egg tomorrow morning. Honest food, no tricks. Tell me how it sits.' },
    ],
  },
]

export default function AaraChatSim() {
  const [step, setStep] = useState(0)
  const [thread, setThread] = useState([{ sender: 'aara', text: SCRIPT[0].open, id: 'init' }])
  const [thinking, setThinking] = useState(false)
  const scrollerRef = useRef(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [thread, thinking])

  const handleReply = (option) => {
    if (thinking) return
    const userMsg = { sender: 'user', text: option.label, id: `u-${Date.now()}` }
    setThread((t) => [...t, userMsg])
    setThinking(true)
    setTimeout(() => {
      setThread((t) => [...t, { sender: 'aara', text: option.reply, id: `a-${Date.now()}` }])
      setThinking(false)
      // Advance to next step's question after a beat
      const nextStep = step + 1
      if (nextStep < SCRIPT.length) {
        setTimeout(() => {
          setThread((t) => [...t, { sender: 'aara', text: SCRIPT[nextStep].open, id: `q-${Date.now()}` }])
          setStep(nextStep)
        }, 1400)
      } else {
        // Loop back to beginning
        setTimeout(() => {
          setThread([{ sender: 'aara', text: SCRIPT[0].open, id: `r-${Date.now()}` }])
          setStep(0)
        }, 2000)
      }
    }, 900)
  }

  const currentOptions = SCRIPT[step]?.options ?? []

  return (
    <div className="aara-chat-sim">
      <div className="aara-chat-sim__thread" ref={scrollerRef}>
        <AnimatePresence initial={false}>
          {thread.map((msg) => (
            <motion.div
              key={msg.id}
              className={`aara-chat-sim__bubble aara-chat-sim__bubble--${msg.sender}`}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              layout
            >
              {msg.text}
            </motion.div>
          ))}
          {thinking && (
            <motion.div
              key="thinking"
              className="aara-chat-sim__typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span />
              <span />
              <span />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="aara-chat-sim__quick">
        {currentOptions.map((opt) => (
          <button
            key={opt.label}
            type="button"
            className="aara-chat-sim__reply"
            onClick={() => handleReply(opt)}
            disabled={thinking}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
