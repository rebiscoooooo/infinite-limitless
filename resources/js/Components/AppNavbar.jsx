import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function AppNavbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const isHomePage = url === '/' || url === '' || url.startsWith('/#') || url.startsWith('/?');
    const isAlwaysSolidPage = url.startsWith('/world-plan') || url.startsWith('/select-country');
    const isNavbarScrolled = scrolled || isAlwaysSolidPage;

    // Scroll listener for sticky navbar background and active section detection
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Detect active section on scroll if on home page
            if (isHomePage) {
                const sections = ['contact', 'testimonials', 'team', 'menu', 'features'];
                const scrollPos = window.scrollY + 200;

                for (const sec of sections) {
                    const el = document.getElementById(sec);
                    if (el && el.offsetTop <= scrollPos) {
                        setActiveSection(sec);
                        return;
                    }
                }
                setActiveSection('home');
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    // Close mobile menu on desktop resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle initial hash scrolling on mount or Inertia url change
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            const targetId = window.location.hash.replace('#', '');
            const timer = setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(targetId);
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [url]);

    const closeMenu = () => setMenuOpen(false);

    // Smooth scroll handler for Home & Logo clicks
    const handleHomeClick = (e) => {
        closeMenu();
        if (isHomePage) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.pushState(null, '', '/');
            setActiveSection('home');
        } else {
            router.visit('/');
        }
    };

    // Smooth scroll handler for anchor links (About, Products, Team, Testimony, Contact)
    const handleNavClick = (e, targetId) => {
        closeMenu();
        if (isHomePage) {
            e.preventDefault();
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `/#${targetId}`);
                setActiveSection(targetId);
            }
        } else {
            e.preventDefault();
            router.visit(`/#${targetId}`, {
                onFinish: () => {
                    setTimeout(() => {
                        const el = document.getElementById(targetId);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                            setActiveSection(targetId);
                        }
                    }, 250);
                }
            });
        }
    };

    return (
        <nav
            className={`navbar navbar-expand-lg fixed-top ${isNavbarScrolled ? 'scrolled' : ''}`}
            id="mainNav"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                zIndex: 1040,
                transition: 'all 0.3s ease',
                padding: isNavbarScrolled ? '10px 0' : '15px 0',
                background: isNavbarScrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
                backdropFilter: isNavbarScrolled ? 'blur(15px)' : 'none',
                WebkitBackdropFilter: isNavbarScrolled ? 'blur(15px)' : 'none',
                boxShadow: isNavbarScrolled ? '0 4px 30px rgba(0, 0, 0, 0.25)' : 'none',
                borderBottom: isNavbarScrolled ? '1px solid rgba(148, 163, 184, 0.15)' : 'none',
            }}
        >
            <div className="container-fluid px-3 px-lg-5 d-flex flex-wrap align-items-center justify-content-between">
                {/* Brand Logo (Left on desktop, centered on mobile) */}
                <Link
                    className="text-logo d-flex flex-column align-items-center text-decoration-none me-auto me-lg-4"
                    href="/"
                    onClick={handleHomeClick}
                    style={{ flexShrink: 0 }}
                >
                    <span
                        style={{
                            color: '#fff',
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontWeight: 900,
                            lineHeight: 0.8,
                            letterSpacing: '1.5px',
                            fontSize: 'clamp(32px, 5vw, 46px)',
                        }}
                    >
                        INFINITE
                    </span>
                    <span
                        style={{
                            color: 'var(--ch-teal, #14b8a6)',
                            fontFamily: "'Barlow', sans-serif",
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            fontSize: 'clamp(9px, 1.5vw, 11px)',
                            marginTop: '2px',
                        }}
                    >
                        LIVE LIMITLESS
                    </span>
                </Link>

                {/* Right Actions & Mobile Hamburger (Right) */}
                <div className="d-flex align-items-center gap-2 gap-lg-3 order-lg-3 ms-auto ms-lg-0">
                    <Link
                        href="/admin/login"
                        className="btn-nav-order nav-link d-none d-lg-inline-flex text-decoration-none"
                    >
                        Login
                    </Link>
                    <Link
                        href="/join-ph"
                        className="btn-nav-order nav-link d-none d-lg-inline-flex text-decoration-none"
                        style={{
                            background: 'var(--ch-teal, #14b8a6)',
                            color: '#fff !important',
                            borderColor: 'var(--ch-teal, #14b8a6)',
                        }}
                    >
                        Join Us <i className="bi bi-arrow-right ms-1"></i>
                    </Link>

                    {/* Hamburger Button on Mobile */}
                    <button
                        className="navbar-toggler border-0 shadow-none d-lg-none"
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation"
                        style={{ background: 'transparent', padding: '0.25rem 0.5rem' }}
                    >
                        <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'} text-white`} style={{ fontSize: '1.85rem' }}></i>
                    </button>
                </div>

                {/* Center Navigation Links (Center on desktop / Dropdown on mobile) */}
                <div
                    className={`navbar-collapse order-lg-2 flex-grow-1 ${menuOpen ? 'show d-block' : 'd-none d-lg-flex'}`}
                    id="navMenu"
                    style={{
                        visibility: 'visible',
                        opacity: 1,
                        ...(menuOpen ? {
                            background: 'rgba(15, 23, 42, 0.98)',
                            borderRadius: '1rem',
                            padding: '1.25rem',
                            marginTop: '0.75rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                            width: '100%',
                        } : {})
                    }}
                >
                    <ul className="navbar-nav mx-auto gap-lg-1 text-start text-lg-center ps-2 ps-lg-0 pt-3 pt-lg-0 align-items-lg-center">
                        <li className={`nav-item ${isHomePage && activeSection === 'home' ? 'active' : ''}`}>
                            <a className="nav-link" href="/" onClick={handleHomeClick}>
                                Home
                            </a>
                        </li>
                        <li className={`nav-item ${isHomePage && activeSection === 'features' ? 'active' : ''}`}>
                            <a className="nav-link" href="/#features" onClick={(e) => handleNavClick(e, 'features')}>
                                About
                            </a>
                        </li>
                        <li className={`nav-item ${isHomePage && activeSection === 'menu' ? 'active' : ''}`}>
                            <a className="nav-link" href="/#menu" onClick={(e) => handleNavClick(e, 'menu')}>
                                Products
                            </a>
                        </li>
                        <li className={`nav-item ${isHomePage && activeSection === 'team' ? 'active' : ''}`}>
                            <a className="nav-link" href="/#team" onClick={(e) => handleNavClick(e, 'team')}>
                                Team
                            </a>
                        </li>
                        <li className={`nav-item ${isHomePage && activeSection === 'testimonials' ? 'active' : ''}`}>
                            <a className="nav-link" href="/#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')}>
                                Testimony
                            </a>
                        </li>
                        <li className={`nav-item ${isHomePage && activeSection === 'contact' ? 'active' : ''}`}>
                            <a className="nav-link" href="/#contact" onClick={(e) => handleNavClick(e, 'contact')}>
                                Contact
                            </a>
                        </li>
                        <li className={`nav-item ${url.startsWith('/world-plan') ? 'active' : ''}`}>
                            <Link className="nav-link" href="/world-plan" onClick={closeMenu}>
                                World Plan
                            </Link>
                        </li>

                        {/* Mobile Only Links inside collapse */}
                        <li className="nav-item d-lg-none mt-3 pt-3 border-top border-secondary border-opacity-25">
                            <Link
                                className="nav-link py-2.5 px-4 text-center rounded-pill text-white text-decoration-none shadow-sm"
                                href="/join-ph"
                                onClick={closeMenu}
                                style={{ background: 'var(--ch-teal, #14b8a6)', fontWeight: 700 }}
                            >
                                Join Us <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                        </li>
                        <li className="nav-item d-lg-none mt-2">
                            <Link
                                className="nav-link py-2.5 px-4 text-center rounded-pill text-white text-decoration-none border"
                                href="/admin/login"
                                onClick={closeMenu}
                                style={{ borderColor: 'rgba(255,255,255,0.2)', fontWeight: 600 }}
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
