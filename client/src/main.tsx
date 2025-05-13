import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add global CSS for the PDF toolkit app
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: 'Inter', sans-serif;
    background-color: #F9FAFB;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .tool-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  .upload-zone {
    border: 2px dashed #CBD5E1;
    transition: all 0.3s ease;
  }
  .upload-zone:hover, .upload-zone.dragover {
    border-color: #3B82F6;
    background-color: rgba(59, 130, 246, 0.05);
  }
  .file-preview {
    max-height: 150px;
    overflow-y: auto;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .search-result {
    animation: fadeIn 0.3s ease-out;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
