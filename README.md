
# 🌍 AidChain NGO Frontend (CHATS-NGO)

A modern **Nuxt 3** web application for NGOs to manage campaigns, onboard beneficiaries and vendors, and interact securely with the AidChain blockchain via the backend API.

This app is part of the **AidChain ecosystem** — a full-stack humanitarian aid distribution platform built with **Hyperledger Besu**, **Node.js**, **RabbitMQ**, and **PostgreSQL**.

---

## 🚀 Project Overview

AidChain empowers NGOs to transparently create, manage, and monitor aid campaigns while ensuring every token-based transaction is verifiable on-chain.

**Key Objectives**
- 📦 Manage NGO profiles, campaigns, and beneficiaries  
- 🧾 Track on-chain disbursements through blockchain integration  
- 🔐 Ensure secure authentication via JWT tokens  
- 🌐 Connect seamlessly to AidChain backend (API) and blockchain network  

---

## 🏗️ System Architecture

┌────────────────────────────┐
│  NGO Frontend (Nuxt 3)     │
│  Tailwind + Pinia + Axios  │
└────────────┬───────────────┘
│ REST API Calls
┌────────────▼───────────────┐
│  AidChain Backend (Node.js)│
│  Express + RabbitMQ + PGSQL│
└────────────┬───────────────┘
│ Blockchain Tx
┌────────────▼───────────────┐
│  AidChain Blockchain       │
│  Hyperledger Besu + QBFT   │
└────────────────────────────┘

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend Framework** | Nuxt 3 (Vue 3 Composition API) |
| **UI Library** | Tailwind CSS + Element Plus |
| **State Management** | Pinia |
| **API Client** | Axios |
| **Auth & Storage** | JWT + LocalStorage |
| **Build Tool** | Vite |
| **Language** | TypeScript (where supported) |

---

## 🧩 Directory Overview

chats-ngo/
├── pages/
│   ├── admin/
│   ├── campaigns/
│   └── auth/
├── store/
│   ├── authentication.ts
│   └── filters.ts
├── components/
│   ├── forms/
│   ├── ui/
│   └── tables/
├── composables/
│   └── useAPI.js
├── assets/
│   └── css/
├── public/
├── .env.development
└── nuxt.config.ts

---

## 🧱 Environment Setup

### 🔧 Prerequisites
Ensure you have:
```bash
Node.js >= 18
npm or yarn


⸻

🔑 Environment Variables

Create .env.development at the project root:

# API Base URL for AidChain Backend
BASE_URL=http://localhost:3000/v1

# Application Port
NUXT_PORT=3002

# Optional: define API_TIMEOUT, LOG_LEVEL, etc.


⸻

🧰 Installation & Run

# 1. Clone repository
git clone https://github.com/TalhaArjumand/chats-ngo.git
cd chats-ngo

# 2. Checkout working branch
git checkout talha

# 3. Install dependencies
npm install

# 4. Run in development mode
npm run dev

# 5. (Optional) Build for production
npm run build && npm run start

App runs at → http://localhost:3002

⸻

🔐 Authentication Flow
	1.	Login → /auth/login
	•	Uses backend endpoint /v1/auth/signInNGO
	•	Receives JWT token
	•	Stored in LocalStorage via useAuthStore
	2.	Protected Routes
	•	Middleware checks token validity before accessing /admin and /campaigns
	3.	Logout
	•	Clears token and redirects to login page

⸻

🌉 API Integration Example

All requests are centralized via a composable or Pinia action.

// store/authentication.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: '' }),
  actions: {
    async login(credentials) {
      const { data } = await axios.post(`${import.meta.env.BASE_URL}/auth/signInNGO`, credentials)
      this.token = data.token
      localStorage.setItem('token', this.token)
    }
  }
})


⸻

🧠 Developer Workflow

# Create new feature branch
git checkout -b feature/<branch-name>

# Add and commit
git add .
git commit -m "Implement new campaign dashboard"

# Push to remote
git push origin feature/<branch-name>


⸻

💾 Build & Deployment

For production:

npm run build
npm run start

Dockerization (optional):

docker build -t aidchain-ngo .
docker run -p 3002:3002 aidchain-ngo


⸻

🧭 Contribution Guidelines
	•	Keep consistent naming for components and stores.
	•	Don’t commit .env or private API URLs.
	•	Test API integrations locally before merging.
	•	Use ESLint & Prettier formatting.
	•	Document all new pages/components.

⸻

💬 Credits

Developed by Team AidChain
Mentored under FAST-NUCES Blockchain Systems Lab

“Transparency for NGOs begins with verifiable actions.”
— AidChain NGO Frontend Team

