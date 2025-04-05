# Book Recommendation Platform

**Book Recommendation Platform** is a full-stack web application that provides personalized book suggestions based on user input. Users can describe their preferences in plain language, and the system responds with AI-generated recommendations. The backend integrates with the Mistral model via the OpenRouter API, while the frontend delivers a responsive and animation-enhanced user interface.

## Features

- AI-generated book recommendations using Mistral (OpenRouter API)
- React + Vite frontend for a modern, fast UI
- Express.js backend with secure API handling
- Environment-based API key management
- Clean, animated, and responsive design

## Technology Stack

**Frontend:**
- React (with Vite)
- JavaScript
- Plain CSS
- Framer Motion (for UI animations)

**Backend:**
- Node.js
- Express.js
- Axios (for HTTP requests)
- dotenv (for environment variable handling)

**AI Integration:**
- Mistral model via [OpenRouter API](https://openrouter.ai/)

## Project Structure

Book-Recommendation/ ├── client/ # Frontend (React + Vite) │ ├── public/ │ └── src/ ├── api.js # Handles requests to OpenRouter ├── server.js # Express backend server ├── .env # Environment variables (not committed) ├── .gitignore ├── README.md └── requirements.txt # Backend dependencies (for reference)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/book-recommendation.git
cd book-recommendation
```

### 2. Set up the backend
Install dependencies:
```
npm install
```
Create a .env file in the root directory:
```
OPENROUTER_API_KEY=your_openrouter_api_key
```
Start the server:
```
node server.js
```
### 3. Set up the frontend
```
cd client
npm install
npm run dev
```

The frontend will start at http://localhost:5173 (default Vite port).

## API Configuration
The backend sends a POST request to OpenRouter’s API endpoint using the Mistral model:

- Endpoint: https://openrouter.ai/api/v1/chat/completions

- Model: mistralai/mistral-7b-instruct:free

- Authentication: via Authorization: Bearer <OPENROUTER_API_KEY>

## Deployment

This project is suitable for deployment on:

- Frontend: Vercel, Netlify

- Backend: Render, Railway, or any Node-compatible server
