import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Info({ executiveTiers = [] }) {
    const [activeTab, setActiveTab] = useState('receipt');

    const defaultTiers = [
        {
            id: 'diamond',
            theme_class: 'diamond-theme diamond-layout',
            gem_img: '/assets/image/diamond.png',
            rank_name: 'DIAMOND EXECUTIVES',
            rank_sub: '',
            is_diamond_layout: true,
            leaders: [
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true }
            ]
        },
        {
            id: 'sapphire',
            theme_class: 'sapphire-theme',
            gem_img: '/assets/image/sapphire.png',
            rank_name: 'SAPPHIRE',
            rank_sub: 'EXECUTIVES',
            is_diamond_layout: false,
            leaders: [
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true }
            ]
        },
        {
            id: 'ruby',
            theme_class: 'ruby-theme',
            gem_img: '/assets/image/ruby.png',
            rank_name: 'RUBY',
            rank_sub: 'EXECUTIVES',
            is_diamond_layout: false,
            leaders: [
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true }
            ]
        },
        {
            id: 'pearl',
            theme_class: 'pearl-theme',
            gem_img: '/assets/image/pearl.png',
            rank_name: 'PEARL',
            rank_sub: 'EXECUTIVES',
            is_diamond_layout: false,
            leaders: [
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true },
                { name: 'RESERVED SLOT', country: 'AVAILABLE', flag: '', img: '', coming_soon: true }
            ]
        }
    ];

    const tiers = executiveTiers && executiveTiers.length > 0 ? executiveTiers : defaultTiers;

    return (
        <AppLayout>
            <Head>
                <title>Infinite | Proof of Legitimacy</title>
                <link rel="stylesheet" href="/assets/css/info.css" />
            </Head>

            {/* HERO SECTION */}
            <section
                className="modern-hero"
                id="hero"
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    paddingTop: '160px',
                    paddingBottom: '100px'
                }}
            >
                <div
                    className="hero-bg"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: "linear-gradient(rgba(15, 23, 42, 0.90), rgba(15, 23, 42, 0.95)), url('/assets/image/bg/info.jpg') center center / cover no-repeat",
                        zIndex: 0
                    }}
                >
                    <div className="hero-grid-lines"></div>
                </div>
                <div className="container hero-wrapper">
                    <div className="hero-text">
                        <small>100% VERIFIED &amp; TRUSTED</small>
                        <h1>PROOF OF <span>Legitimacy</span></h1>
                        <div className="hero-line"></div>
                        <p>At Infinite, we believe that true success is built on a foundation of trust. Explore our legal certifications, daily transaction proofs, and real feedback from our growing global community.</p>
                    </div>
                    <div className="hero-image">
                        <div className="shield-icon">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                    </div>
                </div>
            </section>

            {/* TABS NAVIGATION */}
            <section className="tabs-section">
                <div className="container">
                    <div className="tabs" id="tabButtons">
                        <div
                            className={`tab-item ${activeTab === 'receipt' ? 'active' : ''}`}
                            onClick={() => setActiveTab('receipt')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-receipt"></i></div>
                            <h4>RECEIPT</h4>
                            <div className="active-line"></div>
                        </div>

                        <div
                            className={`tab-item ${activeTab === 'tracking' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tracking')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-truck"></i></div>
                            <h4>LOGISTICS</h4>
                            <div className="active-line"></div>
                        </div>

                        <div
                            className={`tab-item ${activeTab === 'delivered' ? 'active' : ''}`}
                            onClick={() => setActiveTab('delivered')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-circle-check"></i></div>
                            <h4>DELIVERED</h4>
                            <div className="active-line"></div>
                        </div>

                        <div
                            className={`tab-item ${activeTab === 'offices' ? 'active' : ''}`}
                            onClick={() => setActiveTab('offices')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-building"></i></div>
                            <h4>OFFICES</h4>
                            <div className="active-line"></div>
                        </div>

                        <div
                            className={`tab-item ${activeTab === 'certificate' ? 'active' : ''}`}
                            onClick={() => setActiveTab('certificate')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-certificate"></i></div>
                            <h4>CERTIFICATE</h4>
                            <div className="active-line"></div>
                        </div>

                        <div
                            className={`tab-item ${activeTab === 'gallery' ? 'active' : ''}`}
                            onClick={() => setActiveTab('gallery')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-image"></i></div>
                            <h4>GALLERY</h4>
                            <div className="active-line"></div>
                        </div>

                        <div
                            className={`tab-item ${activeTab === 'executives' ? 'active' : ''}`}
                            onClick={() => setActiveTab('executives')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-users"></i></div>
                            <h4>EXECUTIVES</h4>
                            <div className="active-line"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PANELS CONTAINER */}
            <div className="panel-container">
                <div className="container">
                    {/* PANEL RECEIPT */}
                    <div id="panel-receipt" className={`content-panel ${activeTab === 'receipt' ? 'active-panel' : ''}`}>
                        <div className="panel-header"><i className="fa-solid fa-receipt"></i><h2>Payment Receipts</h2></div>
                        <div className="cards-grid">
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-file-invoice-dollar"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Bank Transfers</h3><div className="price">Coming Soon</div><div className="meta">Verified payment receipts will be displayed here</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-mobile-screen"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>E-Wallets</h3><div className="price">Coming Soon</div><div className="meta">Verified GCash/Maya transactions</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-money-bill-transfer"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Remittances</h3><div className="price">Coming Soon</div><div className="meta">International &amp; local remittance proofs</div></div>
                            </div>
                        </div>
                    </div>

                    {/* PANEL LOGISTICS */}
                    <div id="panel-tracking" className={`content-panel ${activeTab === 'tracking' ? 'active-panel' : ''}`}>
                        <div className="panel-header"><i className="fa-solid fa-truck"></i><h2>Logistics &amp; Shipping</h2></div>
                        <div className="cards-grid">
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-boxes-packing"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Order Preparation</h3><div className="meta">Photos of packages ready for dispatch</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-truck-fast"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Courier Turnover</h3><div className="meta">Waybills and logistics handover</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-plane-departure"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Global Shipping</h3><div className="meta">International dispatch tracking</div></div>
                            </div>
                        </div>
                    </div>

                    {/* PANEL DELIVERED */}
                    <div id="panel-delivered" className={`content-panel ${activeTab === 'delivered' ? 'active-panel' : ''}`}>
                        <div className="panel-header"><i className="fa-solid fa-circle-check"></i><h2>Successfully Delivered</h2></div>
                        <div className="cards-grid">
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-house-circle-check"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Local Deliveries</h3><div className="price">Coming Soon</div><div className="meta">Packages safely arrived at destinations</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-globe"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>International Orders</h3><div className="price">Coming Soon</div><div className="meta">Worldwide successful deliveries</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-box-open"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Unboxing</h3><div className="price">Coming Soon</div><div className="meta">Customer unboxing photos</div></div>
                            </div>
                        </div>
                    </div>

                    {/* PANEL OFFICES */}
                    <div id="panel-offices" className={`content-panel ${activeTab === 'offices' ? 'active-panel' : ''}`}>
                        <div className="panel-header"><i className="fa-solid fa-building"></i><h2>Our Offices</h2></div>
                        <div className="cards-grid">
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-building-flag"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Headquarters</h3><div className="price">Coming Soon</div><div className="meta">Main office facade and interior</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-map-location-dot"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Regional Branches</h3><div className="price">Coming Soon</div><div className="meta">Photos of our expansion hubs</div></div>
                            </div>
                        </div>
                    </div>

                    {/* PANEL CERTIFICATE */}
                    <div id="panel-certificate" className={`content-panel ${activeTab === 'certificate' ? 'active-panel' : ''}`}>
                        <div className="panel-header"><i className="fa-solid fa-certificate"></i><h2>Certifications &amp; Accreditations</h2></div>
                        <div className="cards-grid">
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-award"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Business Registration</h3><div className="price">Coming Soon</div><div className="meta">Official government permits</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-file-contract"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Product Quality</h3><div className="price">Coming Soon</div><div className="meta">Safety &amp; health accreditations</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-handshake-angle"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Chamber Memberships</h3><div className="price">Coming Soon</div><div className="meta">ECCP, KCCP, HADSAP accreditations</div></div>
                            </div>
                        </div>
                    </div>

                    {/* PANEL GALLERY */}
                    <div id="panel-gallery" className={`content-panel ${activeTab === 'gallery' ? 'active-panel' : ''}`}>
                        <div className="panel-header"><i className="fa-solid fa-image"></i><h2>Brand Gallery</h2></div>
                        <div className="cards-grid">
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-camera-retro"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Product Highlights</h3><div className="price">Coming Soon</div><div className="meta">High-quality lifestyle shots</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-people-group"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Community Events</h3><div className="price">Coming Soon</div><div className="meta">Summits, meetups, and gatherings</div></div>
                            </div>
                            <div className="info-card">
                                <div className="card-img"><div className="coming-soon-img"><i className="fa-solid fa-star"></i><span>IMAGE TBD</span></div></div>
                                <div className="card-body"><h3>Transformations</h3><div className="price">Coming Soon</div><div className="meta">Real customer results</div></div>
                            </div>
                        </div>
                    </div>

                    {/* PANEL EXECUTIVES */}
                    <div id="panel-executives" className={`content-panel ${activeTab === 'executives' ? 'active-panel' : ''}`}>
                        <div className="elite-executives" style={{ padding: '20px 0 0' }}>
                            <div className="executive-heading">
                                <div className="mini-crown">♛</div>
                                <h1>EXECUTIVES</h1>
                                <p>LEADERSHIP. EXCELLENCE. LEGACY.</p>
                                <div className="heading-divider"><span></span><div className="diamond-shape"></div><span></span></div>
                            </div>

                            <div className="executive-wrapper">
                                {tiers.map((tier) => (
                                    tier.is_diamond_layout ? (
                                        <div key={tier.id} className={`executive-row ${tier.theme_class}`}>
                                            <div className="diamond-header">
                                                <div className="gem-circle diamond-gem">
                                                    <img src={tier.gem_img} alt="Diamond Logo" />
                                                </div>
                                                <div className="rank-text diamond-rank-text">
                                                    <h2>{tier.rank_name}</h2>
                                                    <div className="mini-divider center-divider">
                                                        <span></span>
                                                        <div className="mini-diamond"></div>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="leaders-grid diamond-grid">
                                                {tier.leaders.map((leader, lIdx) => (
                                                    <div key={lIdx} className="leader-box">
                                                        {leader.coming_soon ? (
                                                            <div className="leader-photo coming-soon-photo">
                                                                <i className="fa-solid fa-user-lock"></i>
                                                                <span>RESERVED</span>
                                                            </div>
                                                        ) : (
                                                            <div className="leader-photo"><img src={leader.img} alt={leader.name} /></div>
                                                        )}

                                                        <div className="leader-meta">
                                                            <h4>{leader.name}</h4>
                                                            <p>
                                                                {leader.coming_soon ? (
                                                                    <i className="fa-solid fa-globe me-2" style={{ opacity: 0.5 }}></i>
                                                                ) : (
                                                                    <img src={`/assets/image/flags/${leader.flag}.png`} alt={leader.country} className="flag-img" />
                                                                )}
                                                                {leader.country}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={tier.id} className={`executive-row ${tier.theme_class}`}>
                                            <div className="rank-side">
                                                <div className={`gem-circle ${tier.id}-gem`}><img src={tier.gem_img} alt={`${tier.id} Logo`} /></div>
                                                <div className="rank-text">
                                                    <h2>{tier.rank_name}</h2><h3>{tier.rank_sub}</h3>
                                                    <div className="mini-divider"><span></span><div className="mini-diamond"></div><span></span></div>
                                                </div>
                                            </div>
                                            <div className="leaders-grid">
                                                {tier.leaders.map((leader, lIdx) => (
                                                    <div key={lIdx} className="leader-box">
                                                        {leader.coming_soon ? (
                                                            <div className="leader-photo coming-soon-photo">
                                                                <i className="fa-solid fa-user-lock"></i>
                                                                <span>RESERVED</span>
                                                            </div>
                                                        ) : (
                                                            <div className="leader-photo"><img src={leader.img} alt={leader.name} /></div>
                                                        )}

                                                        <div className="leader-meta">
                                                            <h4>{leader.name}</h4>
                                                            <p>
                                                                {leader.coming_soon ? (
                                                                    <i className="fa-solid fa-globe me-2" style={{ opacity: 0.5 }}></i>
                                                                ) : (
                                                                    <img src={`/assets/image/flags/${leader.flag}.png`} alt={leader.country} className="flag-img" />
                                                                )}
                                                                {leader.country}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <section className="features-modern" id="features">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-modern"><div className="feature-icon-modern"><i className="fa-solid fa-file-shield"></i></div><h3>Legally Registered</h3><p>We are a fully registered business entity compliant with all local and international trading regulations.</p></div>
                        <div className="feature-modern"><div className="feature-icon-modern"><i className="fa-solid fa-shield-heart"></i></div><h3>Premium Quality</h3><p>Our skincare and wellness products undergo strict quality control and testing.</p></div>
                        <div className="feature-modern"><div className="feature-icon-modern"><i className="fa-solid fa-handshake"></i></div><h3>Transparent Process</h3><p>Full transparency from order to doorstep with tracking and reliable support.</p></div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
