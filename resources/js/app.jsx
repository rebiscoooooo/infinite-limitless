import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'INFINITE: Live Limitless';

const getInitialPage = () => {
    if (typeof document === 'undefined') return undefined;
    const scriptEl = document.querySelector('script[data-page="app"][type="application/json"]');
    if (scriptEl?.textContent) {
        try {
            return JSON.parse(scriptEl.textContent);
        } catch (e) {
            console.error('Failed to parse script data-page', e);
        }
    }
    const appEl = document.getElementById('app');
    if (appEl?.dataset?.page) {
        try {
            return JSON.parse(appEl.dataset.page);
        } catch (e) {
            console.error('Failed to parse appEl dataset page', e);
        }
    }
    return undefined;
};

const initialPage = getInitialPage();

createInertiaApp({
    title: (title) => title ? `${title} | ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    page: initialPage,
    setup({ el, App, props }) {
        const targetEl = el || document.getElementById('app');
        const root = createRoot(targetEl);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#14b8a6',
        showSpinner: true,
    },
});
