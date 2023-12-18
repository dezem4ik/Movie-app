import React from 'react';
import { createRoot } from 'react-dom/client'

import MovieApp from './components/movie-app'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<MovieApp />);
