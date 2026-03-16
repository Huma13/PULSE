# PULSE — Emotion-Adaptive AI Companion

> Built in 24 hours · INFERENTIA 2.0 State-Level Hackathon · Team of 4

PULSE is a real-time AI companion that detects your emotional state through your webcam and adapts its entire personality — responses, tone, and UI — to match how you're feeling. It combines a CNN-based emotion detection model with a RAG-powered conversational engine to deliver interactions that feel genuinely personal.

---

## The Problem

Most AI assistants treat every user interaction identically, regardless of emotional context. A user who's stressed, sad, or overwhelmed gets the same flat response as someone who's energized and focused. PULSE changes that — it reads your emotional state first, then responds accordingly.

---

## Demo

**Live project:** [Lovable deployment](https://lovable.dev/projects/cd2723bb-6331-447a-9b28-0f5c248f2ed2)

---

## What It Does

- **Detects your mood in real time** from your webcam feed using a CNN trained on facial expression data — achieving **85% accuracy** across 5+ emotional states
- **Adapts its conversational responses** using a RAG pipeline backed by a vector database — retrieving contextually appropriate content based on your detected emotional profile
- **Changes the UI dynamically** — colors, tone, widget layout, and interaction style all shift based on your current mood state
- **Supports 5+ distinct mood states**: happy, sad, stressed, focused, neutral — each triggering a different companion persona and interface configuration
- **Personalizes over time** — behavioral logic updates based on your emotional history within a session

---

## Architecture

```
Webcam Feed
    │
    ▼
CNN Emotion Classifier (Python · OpenCV)
    │  85% accuracy · real-time inference
    ▼
Mood State Engine
    │  Maps detected emotion → companion persona
    ▼
RAG Pipeline (Python · Vector DB)
    │  Retrieves persona-appropriate response context
    ▼
LLM Response Generation
    │  Contextually aware, mood-matched output
    ▼
React Frontend (TypeScript · Tailwind · shadcn/ui)
    │  Dynamic UI that re-renders based on mood state
    ▼
User
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Emotion Detection | Python · CNN · OpenCV |
| Conversational AI | RAG pipeline · Vector Database |
| Backend | Python · Flask |
| Frontend | TypeScript · React · Vite · Tailwind CSS · shadcn/ui |
| Styling | Tailwind CSS |
| Build | Bun |

---

## Key Engineering Decisions

**Why CNN over a pre-trained API?**
We wanted real-time local inference with no API latency. Training our own CNN on facial expression datasets gave us 85% accuracy at sub-100ms inference — fast enough to run continuously without disrupting the conversation flow.

**Why RAG instead of a static prompt?**
A single system prompt can't capture the nuance of 5+ emotional states. RAG lets us maintain a vector store of mood-specific knowledge — so the retrieval layer does the heavy lifting of personalizing context before the LLM ever generates a word.

**Why dynamic UI state?**
Emotional support is as much visual as it is verbal. A calm blue interface for a stressed user feels different from a warm energetic layout for someone who's happy. We built a mood-state machine in React that re-renders UI tokens (colors, spacing, widget types) based on the detected emotion.

---

## Running Locally

### Prerequisites
- Node.js 18+ and npm (or Bun)
- Python 3.9+
- Webcam access

### Setup

```bash
# Clone the repo
git clone https://github.com/Huma13/PULSE.git
cd PULSE

# Install frontend dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Start the Python backend (emotion detection + RAG)
python run.py

# In a separate terminal, start the frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — allow webcam access when prompted.

---

## Results

| Metric | Value |
|---|---|
| Emotion detection accuracy | 85% |
| Mood states supported | 5+ |
| Hackathon build time | 48 hours |
| Team size | 4 engineers |
| Competition placement | Top 30 / 250+ teams · INFERENTIA 2.0 |

---

## What I'd Do With More Time

- **Train on a larger dataset** — the CNN was trained under time pressure. A larger, more diverse dataset would push accuracy above 90% and improve performance in varied lighting conditions.
- **Persistent personalization** — currently session-scoped. Adding a user profile layer would let PULSE learn your emotional patterns over time.
- **Voice tone detection** — facial expression is one signal. Adding speech prosody analysis would give a much richer emotional picture.
- **Fine-tuned LLM** — the RAG pipeline compensates for a generic LLM, but a model fine-tuned on emotionally-aware conversations would dramatically improve response quality.

---

## Team

Built at **INFERENTIA 2.0** — a state-level ML hackathon — by a team of 4 engineers from PES University.

| Name | Role |
|---|---|
| Huma Wahid | Frontend development · UI/UX ideation |
| Neeraj Kumar | Backend Integration |
| Dhruv Jagadeesh | Model Training |
| Avrit Sharma | RAG Pipline |

---

## License

MIT — feel free to fork and build on this.

---

*Made with a lot of caffeine and zero sleep at INFERENTIA 2.0*
