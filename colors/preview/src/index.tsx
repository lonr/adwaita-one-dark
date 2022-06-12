import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { App } from './App';
import './index.css';

const root: Root = createRoot(document.getElementById('root')!);
root.render(<App />);
