import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safe service worker registration for PWA and PWABuilder audits
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('SW registration info:', err);
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
