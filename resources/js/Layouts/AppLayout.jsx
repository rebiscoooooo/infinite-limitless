import React from 'react';
import { usePage } from '@inertiajs/react';
import AppNavbar from '../Components/AppNavbar';
import AppFooter from '../Components/AppFooter';
import Preloader from '../Components/Preloader';
import BackToTop from '../Components/BackToTop';
import FlashToast from '../Components/FlashToast';

export default function AppLayout({ children, hideFooter = false }) {
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen flex flex-col bg-ch-dark-slate text-slate-100 font-barlow selection:bg-ch-teal selection:text-ch-dark-slate">
            <Preloader />
            <AppNavbar />

            {/* Flash message popups */}
            <FlashToast flash={flash} />

            <main className="flex-1 pt-24 sm:pt-28">
                {children}
            </main>

            {!hideFooter && <AppFooter />}
            <BackToTop />
        </div>
    );
}
