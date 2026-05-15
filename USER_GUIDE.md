# Ministry of Culture — AI-Powered Cultural Heritage Platform
## User Guide / Manual

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Home Page](#2-home-page)
3. [AI Semantic Search](#3-ai-semantic-search)
4. [AI Chatbot](#4-ai-chatbot)
5. [Admin Analytics Dashboard](#5-admin-analytics-dashboard)
6. [Navigation Summary](#6-navigation-summary)

---

## 1. Getting Started

### Prerequisites
- **Node.js** (v18 or above)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Edge, Firefox)

### Installation & Running

```bash
# Step 1: Open terminal in the project folder
cd "ministry of indian culture ai bot"

# Step 2: Install dependencies (first time only)
npm install

# Step 3: Start the development server
npm run dev
```

The terminal will display a local URL (typically **http://localhost:5173**). Open it in your browser.

### Building for Production

```bash
npm run build
```

This generates static files in the `dist/` folder, ready to deploy on any web server.

---

## 2. Home Page

**URL:** `/` (root)

The landing page is the main entry point of the platform.

### Sections (top to bottom)

| Section | Description |
|---|---|
| **Government Strip** | Top bar showing "Government of India / Ministry of Culture" in English and Hindi |
| **Header** | Logo, title, and navigation buttons to **AI Chatbot** and **Dashboard** |
| **Hero Section** | Rotating background images of Indian heritage sites (Taj Mahal, Hawa Mahal, India Gate, Varanasi). Contains the main **search bar** and a typing animation showing sample queries |
| **Popular Searches** | 6 clickable query cards (e.g. "Tell me about Ajanta caves", "List museums in India"). Click any to go directly to search results |
| **India's Living Culture** | 4 visual gallery cards — Monuments, Museums, Performing Arts, Archives. Click any card to search that topic |
| **AI-Powered Platform** | 6 feature cards highlighting the platform's capabilities (LLM Search, Agentic Chatbot, Multilingual, 66 Portals, RAG Verification, Sub-3s Response) |
| **Stats Bar** | Key numbers: 66+ Portals Indexed, 3,696 Protected Monuments, 50M+ Archival Pages, <3s Response Time |
| **Data Sources** | Grid showing 12 named portals (culture.gov.in, ASI, IGNCA, etc.) plus a note about 54 more indexed portals |
| **Call to Action** | "Start Searching" and "Chat with AI Assistant" buttons |
| **Footer** | Government branding, policy links, compliance badges (MeitY, NIC, CERT-In) |

### How to Use
- **Search:** Type a query in the hero search bar and press Enter or click the search icon
- **Quick explore:** Click any suggested query card or gallery card
- **Open chatbot:** Click "Chat with AI" button or "AI Chatbot" in the header
- **Open dashboard:** Click "Dashboard" in the header

---

## 3. AI Semantic Search

**URL:** `/search?q=your+query`

You reach this page by searching from the home page or by entering a URL directly.

### What You'll See

| Element | Description |
|---|---|
| **Search Bar** | Pre-filled with your query at the top. You can modify and re-search |
| **Result Count** | Shows number of results found and time taken |
| **Result Cards** | Each card shows: title, AI-generated summary, source portal name, relevance keywords, and a direct link to the source |
| **Related Queries** | Suggested follow-up searches at the bottom of results |

### Sample Queries That Return Results

The platform has a built-in knowledge base covering ~50 topics. Try these:

- `Ajanta Caves`
- `Taj Mahal`
- `Classical dance forms of India`
- `What are the Vedas?`
- `Museums in India`
- `UNESCO World Heritage Sites India`
- `National Archives`
- `Konark Sun Temple`
- `Bharatanatyam`
- `Mahatma Gandhi`
- `Indian manuscripts`
- `Cultural schemes of government`

### Tips
- Results are matched by keyword relevance from the built-in knowledge base
- Each result card shows the **source portal** it was retrieved from (e.g. asi.nic.in, indianculture.gov.in)
- Click the link on any result card to visit the actual government portal

---

## 4. AI Chatbot

**URL:** `/chat`

A conversational AI interface for exploring cultural heritage through natural language.

### Layout

| Area | Description |
|---|---|
| **Left Sidebar** | Chat history, "New Conversation" button, and source filters |
| **Main Chat Area** | Message thread with AI responses |
| **Top Bar** | Back button, "Online" status indicator, and **English/Hindi language toggle** |
| **Input Bar** | Text input, microphone button (UI placeholder), and send button |

### How to Chat

1. **Type a question** in the input field at the bottom (e.g. "Tell me about Ajanta caves")
2. **Press Enter** or click the **Send** button
3. The AI will show a **loading animation** ("Searching across cultural repositories...") followed by a **streaming response** that appears character by character
4. Each response includes:
   - **Confidence badge** (High / Medium / Low) — shown in the message header
   - **Source citations** — expandable section showing which portal the information came from
   - **Follow-up suggestions** — clickable buttons below the response to continue exploring

### Language Toggle
- Click the **EN/HI toggle** in the top-right corner to switch between English and Hindi
- When set to Hindi, AI responses will be displayed in Hindi, and placeholder text changes to Hindi

### Sidebar Features
- **New Conversation** — clears the chat and starts fresh
- **Recent chats** — click any previous conversation to re-ask that query
- **Source Filters** — expand to see checkboxes for filtering results by portal (Indian Culture Portal, ASI, Museums of India, etc.)

### Tips
- The greeting message includes 3 follow-up suggestions to get started quickly
- You can click any **follow-up suggestion button** instead of typing
- The chatbot maintains conversation context within the current session

---

## 5. Admin Analytics Dashboard

**URL:** `/admin`

A monitoring dashboard showing platform performance metrics and usage analytics.

### Time Range Filter
Use the **Today / This Week / This Month** tabs in the header to switch between time periods. All metrics and charts update accordingly.

### Metrics Overview (Top Row — 6 Cards)

| Metric | Description |
|---|---|
| **Total Queries** | Number of search queries processed |
| **Active Users** | Currently active / concurrent users |
| **Avg Response Time** | Mean response time with P95 percentile |
| **RAG Accuracy** | Response accuracy percentage (sample-verified) |
| **Chatbot Sessions** | Number of chatbot conversations with avg turns |
| **System Uptime** | Platform availability percentage (30-day window) |

Each card shows a **trend indicator** (green up-arrow or red down-arrow) with percentage change.

### Charts & Visualizations

| Chart | Location | Description |
|---|---|---|
| **Query & User Traffic** | Left, row 2 | Area chart showing queries and active users over time |
| **Response Time** | Right, row 2 | Line chart with average vs P95 latency. Green dashed line marks the 3-second SLA |
| **Top Searched Topics** | Left, row 3 | Horizontal bar chart of popular search categories |
| **Language Distribution** | Center, row 3 | Donut/pie chart showing English (62%), Hindi (31%), Other (7%) |
| **Portal-wise Queries** | Right, row 3 | Bar chart showing query volume per portal |

### Live Data Panels

| Panel | Description |
|---|---|
| **Recent Queries** | Live feed of latest user queries with timestamp, source portal, and confidence level |
| **System Health** | Status of 6 system components: API Gateway, LLM Inference, Vector Database, Web Crawler, Search Index, Bhashini API. Each shows operational status and uptime percentage |

### Infrastructure Section
Shows hardware specifications:
- **64v CPU Cores**
- **128 GB RAM**
- **2x 80GB GPU Nodes**

### User Engagement Overview (Bottom Row)
6 engagement metrics: Peak Usage time, Avg Session duration, Return Rate, Pages/Session, Bounce Rate, Portals Queried.

---

## 6. Navigation Summary

| Page | URL | How to Access |
|---|---|---|
| **Home** | `/` | Click logo or back button from any page |
| **Search Results** | `/search?q=...` | Search from home page or chatbot |
| **AI Chatbot** | `/chat` | "AI Chatbot" button in header, or "Chat with AI" on home page |
| **Analytics Dashboard** | `/admin` | "Dashboard" button in header |

### Keyboard Shortcuts
- **Enter** — Submit search query or send chat message
- **Browser Back** — Return to previous page

---

## Technical Notes

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** TailwindCSS 4.1 with custom theme variables (Navy, Gold, Ivory)
- **Charts:** Recharts library
- **UI Components:** Radix UI + Material UI Icons
- The platform is a **frontend prototype/POC** — responses come from a built-in knowledge base, not a live AI backend
- All data shown in the Analytics Dashboard is simulated for demonstration purposes

---

*Ministry of Culture, Government of India*
*AI-Powered Cultural Heritage Discovery Platform — POC v0.0.1*
