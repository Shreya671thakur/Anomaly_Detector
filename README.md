# 🚀 Anomaly Detector

A full-stack anomaly detection system built using **Express.js**, **TypeScript**, **Vite**, and a custom AI model.
This application allows users to upload images and automatically detect abnormal patterns or defects using a backend ML pipeline.

---

## 📌 Features

* 🖼️ Image upload interface
* 🤖 AI-powered anomaly detection
* 🌐 Full-stack architecture (Frontend + Backend)
* ⚡ Fast dev environment using Vite
* 📡 REST API for processing images
* 📁 Clean modular codebase (Express + TypeScript)

---

## 🗂️ Tech Stack

### **Frontend**

* React
* Vite
* Tailwind (if included)

### **Backend**

* Node.js + Express
* TypeScript
* tsx runtime
* Custom routes for image processing

---

## 📁 Project Structure

```
Anomaly-Detector/
 ├── server/
 │    ├── index.ts
 │    ├── routes/
 │    ├── static/
 │    └── vite.ts
 ├── client/ (if React frontend included)
 ├── package.json
 └── README.md
```

---

## ▶️ Running the Project Locally

### 1. Install dependencies

```
npm install
```

### 2. Start the server (Development)

```
npm run dev
```

### 3. Open the app

Backend will run at:

👉 **[http://localhost:5000](http://localhost:5000)**

If frontend exists (Vite):
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 API Endpoints (Examples)

| Method | Endpoint      | Description                   |
| ------ | ------------- | ----------------------------- |
| POST   | `/api/detect` | Upload image → detect anomaly |
| GET    | `/api/status` | Server health check           |

---

## 📸 Sample Workflow

1. Choose an image
2. Upload
3. AI model analyzes it
4. Result is displayed on screen

---

## 🚀 Deployment

This project can be deployed on:

* Streamlit (recommended for demo)
* Vercel (frontend)
* Render / Railway (backend)

Scroll below for full Streamlit deployment steps.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Pull requests are welcome!
Please open an issue first to discuss features or fixes.

---

## 👩‍💻 Author

**Shreya Thakur**
GitHub: [https://github.com/Shreya671thakur](https://github.com/Shreya671thakur)
