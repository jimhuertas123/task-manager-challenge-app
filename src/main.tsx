import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { TodoManagerApp } from './TodoManagerApp';

import './index.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoManagerApp />
  </StrictMode>
);
