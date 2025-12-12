# Industrial Anomaly Detection - Local Setup Guide

This project is a React-based frontend dashboard for Industrial Anomaly Detection. 
It is designed to interface with a Python backend (Autoencoder/LSTM), but currently runs in **Mock Mode** for demonstration and UI development purposes.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **VS Code**: Recommended editor.

## Installation

1.  **Clone or Download** this repository to your local machine.
2.  Open the folder in **VS Code**.
3.  Open a terminal (Ctrl+` or Terminal > New Terminal).
4.  Run the following command to install dependencies:

    ```bash
    npm install
    ```

## Running the Application

1.  Start the development server:

    ```bash
    npm run dev:client
    ```

2.  Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5000`).

## Project Structure

- `client/src/pages`: Contains the main views (Dashboard, Visual Inspection, Sensor Telemetry).
- `client/src/components`: Reusable UI components.
- `client/src/lib/mockData.ts`: Contains the simulation logic for the backend (replace this with real API calls when connecting to Python).
- `attached_assets`: Contains generated images and assets.

## Connecting to Python Backend (Future Step)

To connect this frontend to the Python backend described in your PDF:
1.  Run your FastAPI server on port 8000.
2.  Update `client/src/lib/mockData.ts` (or create a new API service) to fetch from `http://localhost:8000` instead of returning mock data.
3.  Ensure CORS is enabled on the FastAPI backend.

## Deployment

To deploy this frontend:
1.  Run `npm run build` to generate static files in `dist/`.
2.  Serve the `dist/` folder using any static host (Netlify, Vercel, or serve it via FastAPI).
