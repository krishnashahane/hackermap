# 🌍 Real-Time Global Hacker Map

A **live cyber threat visualization system** that displays ongoing cyber attacks across the world on an interactive globe.
The project aggregates data from **honeypots and public threat intelligence feeds** and maps attack origins and targets in real time.

The goal is to make global cyber activity **visible, understandable, and educational**.

---

## 🚀 Features

* 🌐 **Live Global Attack Visualization**
  Displays cyber attacks in real time on a 3D globe.

* 🛰 **Threat Intelligence Feeds**
  Collects data from multiple security feeds and honeypots.

* ⚡ **Real-Time Streaming**
  Uses WebSockets / streaming pipelines to update attacks instantly.

* 📍 **IP Geolocation Mapping**
  Converts attacker IPs into geographical locations.

* 🔎 **Attack Type Classification**
  Detects categories such as:

  * SSH brute force
  * DDoS attempts
  * Port scans
  * Malware probes

* 📊 **Analytics Dashboard**

  * Top attacking countries
  * Most targeted ports
  * Attack frequency

---

## 🧠 How It Works

1. **Honeypots capture malicious traffic**
2. **Threat feeds provide additional attack data**
3. **Backend processes incoming events**
4. **IP addresses are geolocated**
5. **Frontend renders attacks on a live globe**

Architecture pipeline:

```
Threat Feeds / Honeypots
        │
        ▼
   Data Collector
        │
        ▼
  Stream Processor
        │
        ▼
   WebSocket API
        │
        ▼
 Interactive Globe UI
```

---

## 🛠 Tech Stack

**Frontend**

* Three.js / WebGL
* React
* Globe visualization libraries

**Backend**

* Node.js
* WebSocket server
* Stream processing

**Data Sources**

* Honeypots
* Threat intelligence feeds
* Public cybersecurity datasets

---

## 📡 Data Sources (Example)

* Open threat intelligence feeds
* Network honeypots
* Security research datasets
* Malware traffic monitoring

---

## 🎯 Purpose

This project is built for:

* cybersecurity researchers
* developers learning about cyber threats
* security visualization
* educational demonstrations

It shows how **global cyber activity happens constantly and automatically**.

---

## ⚠️ Disclaimer

This project is for **educational and research purposes only**.

It **does not perform attacks** and only visualizes publicly available security data or honeypot data.

---

## 📸 Demo

```
Incoming attack → Russia → US (SSH brute force)
Incoming attack → China → Germany (Port scan)
Incoming attack → Brazil → India (Malware probe)
```

Displayed live on the globe with animated attack paths.

---

## 🧑‍💻 Author

**Krishna Shahane**

Self-taught programmer building tools to explore technology, security, and global systems.

---

## ⭐ Support

If you find this project interesting, consider giving it a **star ⭐** to support development.
