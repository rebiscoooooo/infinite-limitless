import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import {
    Globe,
    UploadCloud,
    CheckCircle2,
    AlertCircle,
    Loader2,
    CreditCard,
    DollarSign,
    ShieldCheck,
    FileText,
    ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorldPlan({ packageOptions = [] }) {
    const [previewUrl, setPreviewUrl] = useState(null);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        username: '',
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthdate: '',
        contact: '',
        address: '',
        packageType: 'exec-ruby',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentProof: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('paymentProof', file);
            if (file.type.startsWith('image/')) {
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register-world-plan', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setPreviewUrl(null);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="World Plan Registration & Payment Verification | INFINITE" />

            {/* HERO SECTION */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-dot-matrix">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-ch-teal/40 shadow-glow-teal mb-6">
                        <Globe className="w-4 h-4 text-ch-teal" />
                        <span className="text-xs uppercase font-bold tracking-[0.25em] text-ch-teal">
                            GLOBAL DISTRIBUTOR ONBOARDING
                        </span>
                    </div>

                    <h1 className="font-bebas text-5xl sm:text-7xl tracking-wide text-white leading-none">
                        INFINITE WORLD PLAN REGISTRATION
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                        Activate your international business account, secure your position on the global leadership tree, and upload your payment transaction receipt.
                    </p>
                </div>
            </section>

            {/* MAIN FORM & PAYMENT INSTRUCTIONS */}
            <section className="py-16 bg-slate-950 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Banner */}
                    <AnimatePresence>
                        {recentlySuccessful && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-10 p-6 rounded-3xl bg-teal-950/80 border border-ch-teal text-teal-100 flex items-start gap-4 shadow-glow-teal"
                            >
                                <CheckCircle2 className="w-6 h-6 text-ch-teal shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-lg text-white">Registration Application Received!</h3>
                                    <p className="text-sm text-teal-200 mt-1">
                                        Your registration and payment receipt have been securely logged. Our compliance department will review your proof of payment and send approval notifications to your email.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left Column: Multi-Part Form */}
                        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-10 bg-slate-900 border border-white/10 shadow-2xl">
                            <div className="border-b border-white/10 pb-6 mb-8">
                                <span className="text-xs uppercase tracking-widest text-ch-teal font-bold">OFFICIAL APPLICATION</span>
                                <h2 className="font-bebas text-3xl sm:text-4xl text-white mt-1">APPLICANT DEMOGRAPHICS</h2>
                                <p className="text-xs text-slate-400 mt-1">Please ensure your email and contact information are accurate for DHL tracking notifications.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Username & Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="reg-username" className="block text-xs font-semibold text-slate-300 mb-1">
                                            Desired Username <span className="text-rose-400">*</span>
                                        </label>
                                        <input
                                            id="reg-username"
                                            type="text"
                                            required
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                            placeholder="e.g. infinite_leader"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-ch-teal text-sm"
                                        />
                                        {errors.username && <p className="text-xs text-rose-400 mt-1">{errors.username}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-300 mb-1">
                                            Email Address <span className="text-rose-400">*</span>
                                        </label>
                                        <input
                                            id="reg-email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="leader@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-ch-teal text-sm"
                                        />
                                        {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                {/* Full Name row */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="reg-first-name" className="block text-xs font-semibold text-slate-300 mb-1">
                                            First Name <span className="text-rose-400">*</span>
                                        </label>
                                        <input
                                            id="reg-first-name"
                                            type="text"
                                            required
                                            value={data.firstName}
                                            onChange={(e) => setData('firstName', e.target.value)}
                                            placeholder="Alexandre"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                        />
                                        {errors.firstName && <p className="text-xs text-rose-400 mt-1">{errors.firstName}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="reg-middle-name" className="block text-xs font-semibold text-slate-300 mb-1">
                                            Middle Name
                                        </label>
                                        <input
                                            id="reg-middle-name"
                                            type="text"
                                            value={data.middleName}
                                            onChange={(e) => setData('middleName', e.target.value)}
                                            placeholder="T."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="reg-last-name" className="block text-xs font-semibold text-slate-300 mb-1">
                                            Last Name <span className="text-rose-400">*</span>
                                        </label>
                                        <input
                                            id="reg-last-name"
                                            type="text"
                                            required
                                            value={data.lastName}
                                            onChange={(e) => setData('lastName', e.target.value)}
                                            placeholder="Kaboré"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                        />
                                        {errors.lastName && <p className="text-xs text-rose-400 mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>

                                {/* Birthdate & Contact */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="reg-birthdate" className="block text-xs font-semibold text-slate-300 mb-1">
                                            Date of Birth <span className="text-rose-400">*</span>
                                        </label>
                                        <input
                                            id="reg-birthdate"
                                            type="date"
                                            required
                                            value={data.birthdate}
                                            onChange={(e) => setData('birthdate', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                        />
                                        {errors.birthdate && <p className="text-xs text-rose-400 mt-1">{errors.birthdate}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="reg-contact" className="block text-xs font-semibold text-slate-300 mb-1">
                                            Phone / WhatsApp No. <span className="text-rose-400">*</span>
                                        </label>
                                        <input
                                            id="reg-contact"
                                            type="text"
                                            required
                                            value={data.contact}
                                            onChange={(e) => setData('contact', e.target.value)}
                                            placeholder="+226 70 12 34 56"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                        />
                                        {errors.contact && <p className="text-xs text-rose-400 mt-1">{errors.contact}</p>}
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="reg-address" className="block text-xs font-semibold text-slate-300 mb-1">
                                        Complete Shipping Address (City, Country, Postal) <span className="text-rose-400">*</span>
                                    </label>
                                    <textarea
                                        id="reg-address"
                                        required
                                        rows={3}
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Street Address, City, Region, Country"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal resize-none"
                                    />
                                    {errors.address && <p className="text-xs text-rose-400 mt-1">{errors.address}</p>}
                                </div>

                                {/* Package Selection */}
                                <div>
                                    <label htmlFor="reg-package-type" className="block text-xs font-semibold text-slate-300 mb-1">
                                        Selected Global Package <span className="text-rose-400">*</span>
                                    </label>
                                    <select
                                        id="reg-package-type"
                                        value={data.packageType}
                                        onChange={(e) => setData('packageType', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                    >
                                        <option value="exec-diamond">Diamond Executive Global Set ($5,000 / CFA 2.8M / ₱268,888)</option>
                                        <option value="exec-sapphire">Sapphire Executive Global Set ($3,400 / CFA 1.85M / ₱178,888)</option>
                                        <option value="exec-ruby">Ruby Executive Global Set ($1,750 / CFA 750,000 / ₱72,888) [Recommended]</option>
                                        <option value="exec-pearl">Pearl Executive Global Set ($680 / CFA 295,000 / ₱28,888)</option>
                                        <option value="exec-emerald">Emerald Executive Global Set ($350 / CFA 156,000 / ₱14,888)</option>
                                        <option value="reg-diamond">Regular Diamond Health Package ($4,600 / CFA 1.95M / ₱188,888)</option>
                                        <option value="reg-sapphire">Regular Sapphire Health Package ($2,850 / CFA 1.2M / ₱118,888)</option>
                                        <option value="reg-ruby">Regular Ruby Health Package ($1,150 / CFA 490,000 / ₱48,888)</option>
                                        <option value="reg-pearl">Regular Pearl Health Package ($430 / CFA 185,000 / ₱17,888)</option>
                                        <option value="reg-emerald">Regular Emerald Health Package ($250 / CFA 110,000 / ₱9,888)</option>
                                    </select>
                                </div>

                                {/* Payment Date */}
                                <div>
                                    <label htmlFor="reg-payment-date" className="block text-xs font-semibold text-slate-300 mb-1">
                                        Date Payment Transferred <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        id="reg-payment-date"
                                        type="date"
                                        required
                                        value={data.paymentDate}
                                        onChange={(e) => setData('paymentDate', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-ch-teal"
                                    />
                                    {errors.paymentDate && <p className="text-xs text-rose-400 mt-1">{errors.paymentDate}</p>}
                                </div>

                                {/* Payment Proof File Upload */}
                                <div>
                                    <label htmlFor="reg-payment-proof" className="block text-xs font-semibold text-slate-300 mb-1">
                                        Upload Payment Proof Receipt (JPG, PNG, PDF up to 10MB) <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-white/20 hover:border-ch-teal/50 rounded-2xl bg-slate-950/60 transition-colors">
                                        <div className="space-y-2 text-center">
                                            <UploadCloud className="mx-auto h-10 w-10 text-ch-teal" />
                                            <div className="flex text-xs text-slate-400 justify-center">
                                                <label
                                                    htmlFor="reg-payment-proof"
                                                    className="relative cursor-pointer rounded-md font-bold text-ch-teal hover:underline focus-within:outline-none"
                                                >
                                                    <span>Click to choose file</span>
                                                    <input
                                                        id="reg-payment-proof"
                                                        name="paymentProof"
                                                        type="file"
                                                        required
                                                        accept=".jpg,.jpeg,.png,.pdf"
                                                        onChange={handleFileChange}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-[10px] text-slate-500">Bank deposit slip, Western Union, RIA, Wave, Orange Money or Crypto TxID</p>
                                        </div>
                                    </div>
                                    {errors.paymentProof && <p className="text-xs text-rose-400 mt-1">{errors.paymentProof}</p>}

                                    {/* Preview if image */}
                                    {previewUrl && (
                                        <div className="mt-4 p-2 rounded-xl bg-slate-950 border border-white/10 max-w-xs">
                                            <span className="text-[10px] text-slate-400 block mb-1">File Preview:</span>
                                            <img src={previewUrl} alt="Payment proof preview" className="rounded-lg max-h-36 object-contain" />
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 px-6 rounded-2xl bg-ch-teal hover:bg-ch-teal-darker text-ch-dark-slate hover:text-white font-extrabold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:shadow-glow-teal hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Submitting Application & Uploading Proof...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                                            <span>Complete World Plan Registration</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Right Column: Payment Instructions & Channel Credentials */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="rounded-3xl p-8 bg-slate-900 border border-white/10 shadow-2xl">
                                <span className="text-xs uppercase tracking-widest text-ch-teal font-bold">OFFICIAL PAYMENT CHANNELS</span>
                                <h3 className="font-bebas text-3xl text-white mt-1">SETTLEMENT DETAILS</h3>
                                <p className="text-xs text-slate-400 mt-1">Please reference your desired username on your payment deposit note.</p>

                                <div className="mt-6 space-y-4 text-xs text-slate-300">
                                    {/* Bank Wire */}
                                    <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                                        <div className="font-bold text-white flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-ch-teal" />
                                            <span>International Bank Wire Transfer</span>
                                        </div>
                                        <p>Bank: <strong className="text-white">BDO Unibank (Central Treasury)</strong></p>
                                        <p>Account Name: <strong className="text-white">Infinite Limitless Corp.</strong></p>
                                        <p>SWIFT Code: <strong className="text-ch-teal">BNORPHMM</strong></p>
                                    </div>

                                    {/* USDT Crypto */}
                                    <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                                        <div className="font-bold text-white flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-emerald-400" />
                                            <span>USDT (TRC-20 Fast Clearance)</span>
                                        </div>
                                        <p className="text-[11px] font-mono break-all text-emerald-300 bg-black/40 p-2 rounded">
                                            TYsM9vL38e12wXjK8mNvQ9p9zB124Infinite
                                        </p>
                                        <p className="text-[10px] text-slate-500">Zero international remittance fees & instant block confirmation.</p>
                                    </div>

                                    {/* Mobile Money / Western Union */}
                                    <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-1">
                                        <div className="font-bold text-white flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-amber-400" />
                                            <span>West/Central Africa Mobile Money & Remittance</span>
                                        </div>
                                        <p>Orange Money &bull; Wave &bull; Moov &bull; Western Union &bull; RIA</p>
                                        <p className="text-slate-400">Recipient: <strong className="text-white">Primo Ecalne Jr.</strong> (CEO)</p>
                                        <p className="text-slate-400">Direct WhatsApp Verification: <strong className="text-ch-teal">+63 917 123 4567</strong></p>
                                    </div>
                                </div>
                            </div>

                            {/* Compliance Assurance */}
                            <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 text-xs text-slate-400 space-y-2">
                                <div className="flex items-center gap-2 text-white font-semibold">
                                    <ShieldCheck className="w-4 h-4 text-ch-teal" />
                                    <span>Verified Corporate Registration</span>
                                </div>
                                <p>
                                    All registrations are backed by our global physical inventory guarantee, registered tax identities, and trackable air freight waybills.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
