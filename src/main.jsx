import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CharDetail from "./components/CharDetail";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route index={true} path="/" element={<App />} />
        <Route index={false} path="/character/:id" element={<CharDetail/>} />
        <Route
    path="*"
    element={
      <main>
        <p>There's nothing here!</p>
        <Link to="/">
          Back to Home
        </Link>
      </main>
    }
  />

    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
