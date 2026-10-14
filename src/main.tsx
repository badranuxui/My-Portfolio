import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import Maintenance from './Maintenance.tsx';
import { MAINTENANCE_MODE } from './config.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {MAINTENANCE_MODE ? <Maintenance /> : <App />}
  </StrictMode>,
);
