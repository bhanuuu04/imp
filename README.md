# Astra CyberDefense Platform

> **Enterprise Brand Protection & Multi-Channel Social Threat Forensics**

Astra empowers brands to connect their official social media handles (Meta/Instagram, X/Twitter, LinkedIn, Telegram, Discord, WhatsApp) to monitor every inbound Direct Message (DM) and sender account in real time. It performs automated cybersecurity forensics against brand impersonation, scam accounts, counterfeit mobile applications (rogue APKs), phishing URLs, and social engineering attacks.

---

## 🛡️ Core Capabilities

### 1. Multi-Platform Social Ingestion & Live Connectors
- **X (Twitter) Enterprise API v2**: OAuth 2.0 PKCE, Bearer Token, Webhook CRC handler & Direct Message Event listener.
- **Meta Graph API (Instagram & Facebook Messenger)**: Webhook verification challenge (`hub.challenge`), Page Access Tokens, and incoming DM payload processing.
- **Telegram Bot API**: Bot Token webhook receiver & direct update parser.
- **LinkedIn Community Management API**: Webhook & Messaging API connectors.
- **Discord Gateway & WhatsApp Cloud API**: Webhook ingest endpoints.

### 2. Cybersecurity AI Forensic Engine (`/lib/threat-engine.ts`)
- **Brand & Executive Impersonation**:
  - Homoglyph & Levenshtein distance checks (e.g. `astrà`, `аstra`, `astr0_support`).
  - Spoofed department keyword detection (`helpdesk`, `support`, `official`, `team`, `verify`).
  - Fake verification emoji detection (Unicode `✓`, `☑️`, `✅` in display names).
  - Executive / VIP impersonation shield (protects CEO, CISO, and leadership names).
- **Rogue Mobile App & Counterfeit APK Radar**:
  - Scans for trojanized APK/IPA links (`.apk`, `download-app`, `mobile-update`).
  - Flags spoofed package identifiers mimicking legitimate brand mobile apps.
  - Generates malware reports and SHA-256 signatures.
- **Phishing & Credential Harvesting**:
  - Detects lookalike domains, suspicious TLDs (`.xyz`, `.top`, `.click`, `.ru`, `.cfd`), and masked URL shorteners (`bit.ly`, `tinyurl.com`).
  - Identifies credential harvesting triggers ("confirm seed phrase", "2FA code", "account suspended within 24h").
- **Scam & Bot Profiling**:
  - Account age velocity (accounts < 15 days old offering official tech support).
  - Burner bot follower-to-following asymmetry ratios.
  - Crypto wallet address extraction (ETH, BTC wallet drainers).

### 3. Automated Incident Response & Takedown Generator
- **1-Click Legal Takedown Notices**:
  - Meta Rights Manager & Instagram Abuse format.
  - X / Twitter Brand Impersonation Policy report format.
  - Google Play Protect & Safe Browsing rogue APK submission format.
  - Telegram abuse reporting format.
  - ICANN Domain Registrar WHOIS abuse format.
- **Quarantine & Blocking**: Immediate thread quarantine to protect social media managers from clicking phishing links.

---

## 🚀 Quick Start

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 📡 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/connectors` | `GET`, `POST` | Retrieve connector statuses, save credentials, and run latency ping tests |
| `/api/webhooks/[platform]` | `GET`, `POST` | Handles platform verification handshakes (Meta `hub.challenge`, X CRC) and ingests incoming live DMs |
| `/api/analyze` | `POST` | Runs deep forensic diagnostics on any sender profile, raw DM, or payload |
| `/api/takedown` | `POST` | Compiles pre-formatted legal DMCA and abuse takedown dossiers |

---

## ⚙️ Live Webhook Setup Guide

1. Navigate to **Live Connectors** in the left sidebar.
2. Select your platform (**Instagram**, **X/Twitter**, **Telegram**, etc.).
3. Copy the platform-specific webhook endpoint:
   `https://<your-domain>/api/webhooks/<platform>`
4. In your Meta or Twitter Developer Portal, enter this URL and verify the challenge.
5. Inbound DMs will immediately appear in the **Threat Inbox** with real-time risk scores and recommended mitigation playbooks.
