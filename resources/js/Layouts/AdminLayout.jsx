import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    Inbox,
    Globe,
    FileSpreadsheet,
    LogOut,
    Menu,
    X,
    ExternalLink,
    Shield,
    Bell,
    User
} from 'lucide-react';
import FlashToast from '../Components/FlashToast';

export default function AdminLayout({ children, title = 'Admin Portal' }) {
    const { auth, flash, url } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
        { name: 'World Plan Registrations', href: '/admin/world-plan', icon: Globe },
        { name: 'Activity Audit Logs', href: '/admin/activity-logs', icon: FileSpreadsheet },
    ];

    const isActive = (href) => url.startsWith(href);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/admin/logout');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex font-barlow">
            {/* Flash Toasts */}
            <FlashToast flash={flash} />

            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex w-64 flex-col justify-between bg-slate-900 border-r border-white/10 p-6 shrink-0">
                <div>
                    {/* Brand */}
                    <div className="pb-6 border-b border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-ch-teal/15 border border-ch-teal/30 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-ch-teal" />
                        </div>
                        <div>
                            <span className="font-bebas text-2xl tracking-wider text-white block leading-none">
                                INFINITE PORTAL
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-ch-teal">
                                SYSTEM CONSOLE
                            </span>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <nav className="mt-8 space-y-2">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-all ${
                                        active
                                            ? 'bg-ch-teal text-ch-dark-slate shadow-md'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Profile & Actions */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-ch-teal">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-white block truncate">
                                {auth.admin?.username || 'Administrator'}
                            </span>
                            <span className="text-[10px] text-emerald-400 block">Authenticated</span>
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-1">
                        <Link
                            href="/"
                            target="_blank"
                            className="w-full px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 flex items-center justify-between"
                        >
                            <span>Live Website</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 flex items-center gap-2 transition-colors text-left"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
                    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-white/10 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-6 border-b border-white/10">
                                <div>
                                    <span className="font-bebas text-2xl text-white">INFINITE PORTAL</span>
                                    <span className="text-[9px] uppercase font-bold text-ch-teal block">ADMIN CONSOLE</span>
                                </div>
                                <button onClick={() => setSidebarOpen(false)} className="p-1 rounded text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="mt-6 space-y-2">
                                {navItems.map((item) => {
                                    const active = isActive(item.href);
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 ${
                                                active ? 'bg-ch-teal text-ch-dark-slate' : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="pt-6 border-t border-white/10">
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 rounded-xl bg-rose-950/60 text-rose-300 text-xs font-semibold flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">{title}</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-400 hidden sm:inline">
                            Logged in as <strong className="text-ch-teal">{auth.admin?.username}</strong>
                        </span>
                        <Link
                            href="/"
                            target="_blank"
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5"
                        >
                            <span>Live Site</span>
                            <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
