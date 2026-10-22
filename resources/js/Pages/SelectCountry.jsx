import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function SelectCountry() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedInitials, setSelectedInitials] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [loading, setLoading] = useState(false);

    const countryOptions = [
        { name: 'Burkina Faso', initials: 'bf' },
        { name: 'Cameroon', initials: 'cm' },
        { name: "Côte D'ivoire", initials: 'ci' },
        { name: 'Democratic Republic Of Congo', initials: 'drc' },
        { name: 'Papua New Guinea', initials: 'png' },
        { name: 'Philippines', initials: 'ph' },
        { name: 'South Africa', initials: 'sa' },
        { name: 'Togo', initials: 'tg' },
        { name: 'Uganda', initials: 'ug' },
        { name: 'Zimbabwe', initials: 'zw' },
        { name: 'Others Countries', initials: 'others' }
    ];

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedCountry(value);
        const opt = countryOptions.find((c) => c.name === value);
        if (opt) {
            setSelectedInitials(opt.initials);
            setShowWarning(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCountry || !selectedInitials) {
            setShowWarning(true);
            return;
        }

        setShowWarning(false);
        setLoading(true);

        try {
            sessionStorage.setItem('selectedCountry', selectedCountry);
        } catch (err) {}

        if (selectedInitials === 'ph') {
            router.visit('/join-ph');
        } else {
            router.visit(`/join-community/${selectedInitials}`);
        }
    };

    return (
        <AppLayout>
            <Head>
                <title>Choose Region | Infinite</title>
                <link rel="stylesheet" href="/assets/css/select-country.css" />
            </Head>

            <section className="region-section">
                <div className="container">
                    <div className="region-wrapper">
                        <div className="row g-0 align-items-center">
                            <div className="col-lg-7">
                                <div className="region-left">
                                    <div className="region-tag">OUR GLOBAL FOOTPRINT</div>
                                    <h1 className="region-title">CHOOSE YOUR REGION</h1>
                                    <p className="region-desc">
                                        Access your local business presentation, currency, and registration details
                                    </p>

                                    <form id="regionForm" onSubmit={handleSubmit}>
                                        <div className="country-select">
                                            <i className="bi bi-globe2"></i>
                                            <select
                                                id="countrySelect"
                                                value={selectedCountry}
                                                onChange={handleSelectChange}
                                                required
                                            >
                                                <option value="" disabled>Select your region</option>
                                                {countryOptions.map((country) => (
                                                    <option key={country.initials} value={country.name} data-initials={country.initials}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div
                                            className="warning-message"
                                            id="warningMessage"
                                            style={{ display: showWarning ? 'block' : 'none' }}
                                        >
                                            <i className="bi bi-exclamation-circle"></i> Please select your country first.
                                        </div>

                                        <div className="text-center mt-4">
                                            <button
                                                type="submit"
                                                className="btn-continue"
                                                id="continueBtn"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Redirecting...
                                                    </>
                                                ) : (
                                                    'Continue'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-5">
                                <div className="region-right">
                                    <div className="map-wrapper">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/BlankMap-World_gray.svg" alt="World Map" />
                                        <div className="pin pin1"></div>
                                        <div className="pin pin2"></div>
                                        <div className="pin pin3"></div>
                                        <div className="pin pin4"></div>
                                        <div className="pin pin5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
