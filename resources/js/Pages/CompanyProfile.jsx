import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function CompanyProfile({ executiveTiers = [], proofs = {} }) {
    const [activeTab, setActiveTab] = useState('leadership');
    const [selectedLeader, setSelectedLeader] = useState(null);

    const leaders = [
        {
            id: 'willy',
            name: 'Willy Q. Tee Ten',
            role: 'Chairman WQT',
            organization: 'President, AUTOHUB GROUP',
            image: '/assets/image/Willy.png',
            bio: "Mr. Tee Ten, also known as WQT, is a respected Filipino business leader and President of AUTOHUB GROUP. With over 40 years of experience, he built one of the country's leading automotive empires, managing 22 multinational brands, more than 85 dealer branches, and over 2,000 employees nationwide. He also plays a major role in the automotive industry as President of the Philippine Automotive Dealers Association and the Electric Vehicle Association of the Philippines. Known for his achievements and leadership, he earned Top 2 in the 1985 Chemical Engineering Board Exams and received several prestigious awards and recognitions in the motoring and business industries.",
            highlights: [
                'Top 2 — 1985 Chemical Engineering Board Examinations',
                'President of AUTOHUB GROUP (22 multinational brands, 85+ dealer branches)',
                'President, Philippine Automotive Dealers Association (PADA)',
                'President, Electric Vehicle Association of the Philippines (EVAP)',
                'Over 40 years of proven corporate and entrepreneurial leadership',
            ],
        },
        {
            id: 'owee',
            name: 'Norwejann “Owee” Cruz',
            role: 'President',
            organization: 'CMO, AUTOHUB GROUP',
            image: '/assets/image/owee.png',
            bio: "Ms. Cruz is a skilled business leader and creative executive known for driving the success of INFINITE Group through her strong leadership and extensive industry experience. She currently serves as the Chief Marketing Officer and Head of Fleet Sales of AUTOHUB GROUP, General Manager of GAC's flagship store in BGC, Managing Director of ODV Creative Media Inc., and President of Two Scents International Corporation. With over 20 years of experience in marketing and public relations, she is recognized for her innovation, strategic leadership, and business growth expertise. She is also an alumna of the University of the Philippines, an internationally certified Color Analyst, and a respected BNI Elite Network Leader and Gold Club Member.",
            highlights: [
                'Chief Marketing Officer & Head of Fleet Sales, AUTOHUB GROUP',
                'General Manager, GAC Flagship Store Bonifacio Global City (BGC)',
                'Managing Director, ODV Creative Media Inc.',
                'President, Two Scents International Corporation',
                'Alumna, University of the Philippines & Certified Color Analyst',
                'BNI Elite Network Leader & Gold Club Member',
            ],
        },
        {
            id: 'anne',
            name: 'Joanne Reyes',
            role: 'Founder and Director',
            organization: 'Treasurer, Cimplex Solutions',
            image: '/assets/image/anne.png',
            bio: 'Ms. Reyes is the youngest partner of INFINITE Group, recognized for her creative mindset, people-centered leadership, and passion for collaboration and innovation. She currently serves as the Treasurer of Cimplex Solutions, Inc. while pursuing her entrepreneurial and creative interests. With more than ten years of experience in network marketing and five years as a professional performer under the Viva Artist Agency, she has developed strong communication and leadership skills. She is also an alumna of the Philippine School of Interior Design and Mapúa University.',
            highlights: [
                'Treasurer & Board Member, Cimplex Solutions, Inc.',
                'Over a decade of successful network marketing & team leadership',
                '5 years as professional performing artist under Viva Artist Agency',
                'Alumna, Philippine School of Interior Design (PSID) & Mapúa University',
                'Co-architect of INFINITE product development and distributor compensation',
            ],
        },
    ];

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

    const registrationsList = [
        {
            title: 'Securities & Exchange Commission',
            code: 'SEC Registered Entity',
            iconClass: 'fa-solid fa-building-columns',
            desc: 'Legally registered corporation under Philippine commercial law with certified articles of incorporation and corporate registry.',
        },
        {
            title: 'Bureau of Internal Revenue',
            code: 'BIR Tax Compliant',
            iconClass: 'fa-solid fa-file-invoice-dollar',
            desc: 'Full tax compliance, official receipt issuance, withholding and corporate reporting across all distribution territories.',
        },
        {
            title: 'Food and Drug Administration',
            code: 'FDA CPR & LTO Accreditations',
            iconClass: 'fa-solid fa-shield-virus',
            desc: 'All health, beverage, and skincare formulations undergo rigorous lab tests and hold registered Certificates of Product Registration.',
        },
        {
            title: 'Department of Trade & Industry',
            code: 'DTI Certified Trademarks',
            iconClass: 'fa-solid fa-award',
            desc: 'Protected international patents, logos, trademarks, and franchise frameworks ensuring distributors operate with total security.',
        },
    ];

    const chambers = [
        { name: 'Australian Organic Farming Certificate', code: 'ACO-4192', img: '/assets/image/logoAnzcham.png' },
        { name: 'Halal Certified Quality Assurance', code: 'HALAL-GLOBAL', img: '/assets/image/logoHadsap.png' },
        { name: 'FDA Philippines / DOH Accreditation', code: 'FDA-CPR', img: '/assets/image/logoCCIP.png' },
        { name: 'ECCP European Chamber Partner', code: 'ECCP-EU', img: '/assets/image/logoECCP.png' },
    ];

    return (
        <AppLayout>
            <Head>
                <title>Infinite | Company Profile &amp; Proof of Legitimacy</title>
                <link rel="stylesheet" href="/assets/css/info.css" />
            </Head>

            {/* HERO SECTION - IDENTICAL TO INFO.JSX */}
            <section
                className="modern-hero"
                id="hero"
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    paddingTop: '160px',
                    paddingBottom: '100px',
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
                        zIndex: 0,
                    }}
                >
                    <div className="hero-grid-lines"></div>
                </div>
                <div className="container hero-wrapper">
                    <div className="hero-text">
                        <small>100% VERIFIED &amp; TRUSTED</small>
                        <h1>COMPANY <span>Profile</span></h1>
                        <div className="hero-line"></div>
                        <p>
                            At Infinite, we believe that true success is built on a foundation of trust. Explore our visionary leadership, verified government registrations, accredited certifications, and global logistics infrastructure powering the INFINITE enterprise worldwide.
                        </p>
                    </div>
                    <div className="hero-image">
                        <div className="shield-icon">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                    </div>
                </div>
            </section>

            {/* TABS NAVIGATION - IDENTICAL TO INFO.JSX */}
            <section className="tabs-section">
                <div className="container">
                    <div className="tabs" id="tabButtons">
                        <div
                            className={`tab-item ${activeTab === 'leadership' ? 'active' : ''}`}
                            onClick={() => setActiveTab('leadership')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-users"></i></div>
                            <h4>LEADERSHIP</h4>
                            <div className="active-line"></div>
                        </div>

                        <div
                            className={`tab-item ${activeTab === 'registrations' ? 'active' : ''}`}
                            onClick={() => setActiveTab('registrations')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-certificate"></i></div>
                            <h4>REGISTRATIONS</h4>
                            <div className="active-line"></div>
                        </div>

                        <div
                            className={`tab-item ${activeTab === 'executives' ? 'active' : ''}`}
                            onClick={() => setActiveTab('executives')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-crown"></i></div>
                            <h4>EXECUTIVES</h4>
                            <div className="active-line"></div>
                        </div>

                        <div
                            className={`tab-item ${activeTab === 'logistics' ? 'active' : ''}`}
                            onClick={() => setActiveTab('logistics')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-truck"></i></div>
                            <h4>LOGISTICS</h4>
                            <div className="active-line"></div>
                        </div>

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
                            className={`tab-item ${activeTab === 'offices' ? 'active' : ''}`}
                            onClick={() => setActiveTab('offices')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="tab-icon"><i className="fa-solid fa-building"></i></div>
                            <h4>OFFICES</h4>
                            <div className="active-line"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PANELS CONTAINER - IDENTICAL TO INFO.JSX */}
            <div className="panel-container">
                <div className="container">
                    {/* PANEL 1: PILLARS OF LEADERSHIP */}
                    <div id="panel-leadership" className={`content-panel ${activeTab === 'leadership' ? 'active-panel' : ''}`}>
                        <div className="panel-header">
                            <i className="fa-solid fa-users"></i>
                            <h2>Pillars of Leadership</h2>
                        </div>
                        <div className="cards-grid">
                            {leaders.map((leader) => (
                                <div key={leader.id} className="info-card">
                                    <div
                                        className="card-img"
                                        style={{
                                            height: '320px',
                                            background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            padding: '16px',
                                        }}
                                    >
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            loading="lazy"
                                            decoding="async"
                                            style={{
                                                maxHeight: '100%',
                                                maxWidth: '100%',
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                                            }}
                                        />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                bottom: '14px',
                                                left: '14px',
                                                background: 'rgba(20, 184, 166, 0.95)',
                                                color: '#fff',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '800',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                            }}
                                        >
                                            {leader.role}
                                        </span>
                                    </div>
                                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                                                {leader.name}
                                            </h3>
                                            <div className="price" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#14b8a6', marginBottom: '10px' }}>
                                                {leader.organization}
                                            </div>
                                            <p className="meta" style={{ fontSize: '0.85rem', lineHeight: '1.7', color: '#64748b' }}>
                                                {leader.bio.slice(0, 160)}...
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedLeader(leader)}
                                            className="btn w-100 text-white mt-4 fw-bold"
                                            style={{
                                                backgroundColor: 'var(--ch-teal)',
                                                borderRadius: '12px',
                                                padding: '10px',
                                                border: 'none',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                            }}
                                        >
                                            Learn More <i className="fa-solid fa-arrow-right ms-2"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PANEL 2: LEGAL & GOVERNMENT REGISTRATIONS */}
                    <div id="panel-registrations" className={`content-panel ${activeTab === 'registrations' ? 'active-panel' : ''}`}>
                        <div className="panel-header">
                            <i className="fa-solid fa-certificate"></i>
                            <h2>Legal &amp; Government Registrations</h2>
                        </div>

                        {/* Showcase Banner 30.png */}
                        <div className="text-center mb-5">
                            <div className="position-relative d-inline-block w-100" style={{ maxWidth: '920px' }}>
                                <img
                                    src="/assets/image/30.png"
                                    alt="Legal and Government Registrations"
                                    className="img-fluid rounded-4 shadow-lg w-100"
                                    loading="lazy"
                                    decoding="async"
                                    style={{ objectFit: 'cover', maxHeight: '460px', border: '4px solid #fff' }}
                                />
                            </div>
                        </div>

                        <div className="cards-grid">
                            {registrationsList.map((item, idx) => (
                                <div key={idx} className="info-card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div
                                                style={{
                                                    width: '52px',
                                                    height: '52px',
                                                    borderRadius: '14px',
                                                    background: 'rgba(20, 184, 166, 0.12)',
                                                    color: 'var(--ch-teal)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.4rem',
                                                }}
                                            >
                                                <i className={item.iconClass}></i>
                                            </div>
                                            <span
                                                className="badge"
                                                style={{
                                                    backgroundColor: '#0f172a',
                                                    color: '#14b8a6',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                }}
                                            >
                                                {item.code}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                                            {item.title}
                                        </h3>
                                        <p className="meta" style={{ fontSize: '0.88rem', lineHeight: '1.7', color: '#64748b' }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Accredited Chambers & Quality Certifications */}
                        <div className="mt-5 pt-4" style={{ borderTop: '1px solid #e2e8f0' }}>
                            <h4 className="text-center fw-bold mb-4" style={{ color: '#0f172a', letterSpacing: '1px' }}>
                                ACCREDITED CHAMBERS &amp; QUALITY CERTIFICATIONS
                            </h4>
                            <div className="row g-4 justify-content-center">
                                {chambers.map((c, i) => (
                                    <div key={i} className="col-6 col-md-3 text-center">
                                        <div
                                            className="p-3 bg-light rounded-4 shadow-sm h-100 d-flex flex-column align-items-center justify-content-center"
                                            style={{ border: '1px solid #e2e8f0' }}
                                        >
                                            <img
                                                src={c.img}
                                                alt={c.name}
                                                style={{ maxHeight: '60px', maxWidth: '100%', objectFit: 'contain', marginBottom: '10px' }}
                                            />
                                            <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>{c.name}</div>
                                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{c.code}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* PANEL 3: EXECUTIVES - ROYAL COUNCIL TIERS (IDENTICAL TO INFO.JSX) */}
                    <div id="panel-executives" className={`content-panel ${activeTab === 'executives' ? 'active-panel' : ''}`}>
                        <div className="elite-executives" style={{ padding: '20px 0 0' }}>
                            <div className="executive-heading">
                                <div className="mini-crown">♛</div>
                                <h1>EXECUTIVES</h1>
                                <p>LEADERSHIP. EXCELLENCE. LEGACY.</p>
                                <div className="heading-divider">
                                    <span></span>
                                    <div className="diamond-shape"></div>
                                    <span></span>
                                </div>
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

                    {/* PANEL 4: LOGISTICS & SHIPPING */}
                    <div id="panel-logistics" className={`content-panel ${activeTab === 'logistics' ? 'active-panel' : ''}`}>
                        <div className="panel-header">
                            <i className="fa-solid fa-truck"></i>
                            <h2>Logistics &amp; Shipping</h2>
                        </div>
                        <div className="cards-grid">
                            <div className="info-card">
                                <div className="card-img">
                                    <img src="/assets/image/product-received/5.jpg" alt="Order Preparation" loading="lazy" decoding="async" />
                                </div>
                                <div className="card-body">
                                    <h3>Order Preparation &amp; Air Freight</h3>
                                    <div className="price">DHL Global Express</div>
                                    <div className="meta">Door-to-door insured air shipments dispatching directly to nationwide branches and global hubs.</div>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="card-img">
                                    <img src="/assets/image/product-received/6.jpg" alt="Courier Turnover" loading="lazy" decoding="async" />
                                </div>
                                <div className="card-body">
                                    <h3>Direct Port Container Cargo</h3>
                                    <div className="price">Ocean Freight Logistics</div>
                                    <div className="meta">Climate-controlled supply chain transport ensuring optimal organic potency from source farms to shelves.</div>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="card-img">
                                    <img src="/assets/image/product-received/1.jpg" alt="Bulk Customs Clearance" loading="lazy" decoding="async" />
                                </div>
                                <div className="card-body">
                                    <h3>Bulk Customs Clearance</h3>
                                    <div className="price">Batch #A-489 Release</div>
                                    <div className="meta">Official inbound customs clearance documentation and verified logistics handovers.</div>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="card-img">
                                    <img src="/assets/image/product-received/2.jpg" alt="Global Shipping" loading="lazy" decoding="async" />
                                </div>
                                <div className="card-body">
                                    <h3>West Africa Central Hub</h3>
                                    <div className="price">International Distribution</div>
                                    <div className="meta">Rapid distribution corridors supporting our expanding African and Asian network partners.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PANEL 5: PAYMENT RECEIPTS */}
                    <div id="panel-receipt" className={`content-panel ${activeTab === 'receipt' ? 'active-panel' : ''}`}>
                        <div className="panel-header">
                            <i className="fa-solid fa-receipt"></i>
                            <h2>Payment Receipts</h2>
                        </div>
                        <div className="cards-grid">
                            <div className="info-card">
                                <div className="card-img">
                                    <div className="coming-soon-img">
                                        <i className="fa-solid fa-file-invoice-dollar"></i>
                                        <span>IMAGE TBD</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h3>Bank Transfers</h3>
                                    <div className="price">Coming Soon</div>
                                    <div className="meta">Verified payment receipts will be displayed here</div>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="card-img">
                                    <div className="coming-soon-img">
                                        <i className="fa-solid fa-mobile-screen"></i>
                                        <span>IMAGE TBD</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h3>E-Wallets</h3>
                                    <div className="price">Coming Soon</div>
                                    <div className="meta">Verified GCash/Maya transactions</div>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="card-img">
                                    <div className="coming-soon-img">
                                        <i className="fa-solid fa-money-bill-transfer"></i>
                                        <span>IMAGE TBD</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h3>Remittances</h3>
                                    <div className="price">Coming Soon</div>
                                    <div className="meta">International &amp; local remittance proofs</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PANEL 6: OUR OFFICES */}
                    <div id="panel-offices" className={`content-panel ${activeTab === 'offices' ? 'active-panel' : ''}`}>
                        <div className="panel-header">
                            <i className="fa-solid fa-building"></i>
                            <h2>Our Corporate Offices</h2>
                        </div>
                        <div className="cards-grid">
                            <div className="info-card">
                                <div className="card-img">
                                    <div className="coming-soon-img">
                                        <i className="fa-solid fa-building-flag"></i>
                                        <span>IMAGE TBD</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h3>Headquarters</h3>
                                    <div className="price">Coming Soon</div>
                                    <div className="meta">Main corporate office facade and executive suites</div>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="card-img">
                                    <div className="coming-soon-img">
                                        <i className="fa-solid fa-map-location-dot"></i>
                                        <span>IMAGE TBD</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h3>Regional Branches</h3>
                                    <div className="price">Coming Soon</div>
                                    <div className="meta">Photos of our ongoing international expansion hubs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURES SECTION - IDENTICAL TO INFO.JSX */}
            <section className="features-modern" id="features">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-modern">
                            <div className="feature-icon-modern">
                                <i className="fa-solid fa-file-shield"></i>
                            </div>
                            <h3>Legally Registered</h3>
                            <p>We are a fully registered corporate entity compliant with all local and international commercial regulations.</p>
                        </div>

                        <div className="feature-modern">
                            <div className="feature-icon-modern">
                                <i className="fa-solid fa-shield-heart"></i>
                            </div>
                            <h3>Premium Quality</h3>
                            <p>Our skincare and wellness formulations undergo strict laboratory quality control and certified testing.</p>
                        </div>

                        <div className="feature-modern">
                            <div className="feature-icon-modern">
                                <i className="fa-solid fa-handshake"></i>
                            </div>
                            <h3>Transparent Process</h3>
                            <p>Full transparency from order placement to international doorstep delivery with verified logistics tracking.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA TO START PRE-REGISTRATION / SELECT COUNTRY */}
            <section className="py-5" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <div className="container text-center py-4">
                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: '#0f172a', letterSpacing: '1px' }}>
                        READY TO PARTNER WITH A <span style={{ color: 'var(--ch-teal)' }}>LEGITIMATE GLOBAL ENTERPRISE?</span>
                    </h2>
                    <p className="text-muted mx-auto mb-4" style={{ maxWidth: '650px', fontSize: '1rem', lineHeight: '1.7' }}>
                        Join thousands of leaders across the Philippines, Africa, and beyond. Select your region to get started today.
                    </p>
                    <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
                        <Link
                            href="/select-country"
                            className="btn text-white px-5 py-3 fw-bold shadow-sm"
                            style={{ backgroundColor: 'var(--ch-teal)', borderRadius: '2rem', fontSize: '1rem', textDecoration: 'none' }}
                        >
                            <i className="fa-solid fa-globe me-2"></i> Choose Country to Join
                        </Link>
                        <Link
                            href="/world-plan"
                            className="btn btn-outline-secondary px-5 py-3 fw-bold shadow-sm"
                            style={{ borderRadius: '2rem', fontSize: '1rem', textDecoration: 'none' }}
                        >
                            Explore World Plan
                        </Link>
                    </div>
                </div>
            </section>

            {/* EXECUTIVE LEADER DETAIL MODAL */}
            {selectedLeader && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(6px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                    }}
                    onClick={() => setSelectedLeader(null)}
                >
                    <div
                        className="modal-content text-start p-4 p-md-5 bg-white rounded-4 shadow-lg"
                        style={{ maxWidth: '620px', width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-4"
                            onClick={() => setSelectedLeader(null)}
                            aria-label="Close"
                        ></button>

                        <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-4 mb-4">
                            <div
                                style={{
                                    width: '110px',
                                    height: '110px',
                                    borderRadius: '20px',
                                    background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '8px',
                                    flexShrink: 0,
                                }}
                            >
                                <img
                                    src={selectedLeader.image}
                                    alt={selectedLeader.name}
                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            <div className="text-center text-sm-start">
                                <span
                                    className="badge mb-1"
                                    style={{
                                        backgroundColor: 'rgba(20, 184, 166, 0.15)',
                                        color: 'var(--ch-teal)',
                                        fontSize: '0.8rem',
                                        padding: '5px 12px',
                                        borderRadius: '20px',
                                        fontWeight: 700,
                                    }}
                                >
                                    {selectedLeader.role}
                                </span>
                                <h3 className="fw-bold mb-1" style={{ color: '#0f172a', fontSize: '1.5rem' }}>
                                    {selectedLeader.name}
                                </h3>
                                <div className="text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>
                                    {selectedLeader.organization}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h6 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--ch-teal)', letterSpacing: '1px', fontSize: '0.85rem' }}>
                                Executive Biography
                            </h6>
                            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: 0 }}>
                                {selectedLeader.bio}
                            </p>
                        </div>

                        {selectedLeader.highlights && selectedLeader.highlights.length > 0 && (
                            <div className="mb-4 pt-3" style={{ borderTop: '1px solid #f1f5f9' }}>
                                <h6 className="fw-bold text-uppercase mb-3" style={{ color: 'var(--ch-teal)', letterSpacing: '1px', fontSize: '0.85rem' }}>
                                    Notable Distinctions
                                </h6>
                                <ul className="list-unstyled mb-0" style={{ fontSize: '0.9rem', color: '#334155' }}>
                                    {selectedLeader.highlights.map((h, i) => (
                                        <li key={i} className="mb-2 d-flex align-items-start">
                                            <i className="fa-solid fa-circle-check text-success me-2 mt-1"></i>
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            type="button"
                            className="btn text-white w-100 py-2 fw-bold shadow-sm"
                            style={{ backgroundColor: 'var(--ch-teal)', borderRadius: '0.75rem', fontSize: '1rem', border: 'none' }}
                            onClick={() => setSelectedLeader(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
