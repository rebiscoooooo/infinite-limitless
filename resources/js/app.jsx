import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'INFINITE: Live Limitless';

const appEl = typeof document !== 'undefined' ? document.getElementById('app') : null;
const initialPage = appEl?.dataset?.page ? JSON.parse(appEl.dataset.page) : undefined;

createInertiaApp({
    title: (title) => title ? `${title} | ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    page: initialPage,
    setup({ el, App, props }) {
        const targetEl = el || appEl;
        const root = createRoot(targetEl);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#14b8a6',
        showSpinner: true,
    },
});
