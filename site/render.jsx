import React from 'react';
import { renderToString } from 'react-dom/server';
import { Page } from './Page.jsx';

export { SITE, OWNER, REPO } from './meta.js';
export const html = renderToString(<Page />);
