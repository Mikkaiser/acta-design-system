import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Page } from './Page.jsx';

// The HTML is pre-rendered at build time; this only attaches hover states,
// the theme switch and the rail's scroll tracking.
hydrateRoot(document.getElementById('app'), <Page />);
