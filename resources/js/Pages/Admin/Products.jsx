import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import {
    Package,
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Archive,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Eye,
    Tag,
    DollarSign,
    Layers,
    Image as ImageIcon,
    ExternalLink,
    LayoutGrid,
    List,
    X,
    Sparkles,
    Check,
    AlertCircle,
    ShoppingBag,
    ArrowUpRight,
} from 'lucide-react';

export default function Products({ products = { data: [] }, categories = [], stats = {}, filters = {} }) {
    const productList = products.data || [];
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || 'all');
    const [status, setStatus] = useState(filters.status || 'all');
    const [currentView, setCurrentView] = useState(filters.view || 'active');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

    // Selection for bulk actions
    const [selectedIds, setSelectedIds] = useState([]);

    // Modals
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteModalProduct, setDeleteModalProduct] = useState(null);
    const [viewProduct, setViewProduct] = useState(null);

    // Filter submit
    const applyFilters = (newParams = {}) => {
        const params = {
            search,
            category,
            status,
            view: currentView,
            ...newParams,
        };
        router.get('/admin/products', params, { preserveState: true, replace: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const handleViewChange = (v) => {
        setCurrentView(v);
        setSelectedIds([]);
        applyFilters({ view: v });
    };

    // Selection handlers
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(productList.map((p) => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleToggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Bulk actions
    const handleBulkArchive = () => {
        if (!selectedIds.length) return;
        if (confirm(`Archive ${selectedIds.length} selected product(s)? They will be hidden from public landing page view.`)) {
            router.post('/admin/products/bulk-archive', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const handleBulkRestore = () => {
        if (!selectedIds.length) return;
        router.post('/admin/products/bulk-restore', { ids: selectedIds }, {
            onSuccess: () => setSelectedIds([]),
        });
    };

    const handleBulkDelete = () => {
        if (!selectedIds.length) return;
        if (confirm(`WARNING: Are you sure you want to permanently delete ${selectedIds.length} selected product(s)? This cannot be undone.`)) {
            router.post('/admin/products/bulk-delete', { ids: selectedIds }, {
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    // Toggle Single Product Live Status
    const handleToggleStatus = (product) => {
        router.patch(`/admin/products/${product.id}/toggle-status`, {}, { preserveScroll: true });
    };

    // Create Form
    const createForm = useForm({
        name: '',
        category: 'skincare',
        category_name: 'Skincare',
        short_description: '',
        description: '',
        benefits: '',
        price: '',
        price_display: '',
        badge: '',
        display_order: 0,
        is_active: true,
        is_featured: false,
        is_coming_soon: false,
        image_file: null,
        image_url_custom: '',
    });

    const [createPreview, setCreatePreview] = useState(null);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/products', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowCreateModal(false);
                createForm.reset();
                setCreatePreview(null);
            },
        });
    };

    // Edit Form
    const editForm = useForm({
        name: '',
        category: '',
        category_name: '',
        short_description: '',
        description: '',
        benefits: '',
        price: '',
        price_display: '',
        badge: '',
        display_order: 0,
        is_active: true,
        is_featured: false,
        is_coming_soon: false,
        image_file: null,
        image_url_custom: '',
    });

    const [editPreview, setEditPreview] = useState(null);

    const openEditModal = (product) => {
        setEditingProduct(product);
        editForm.setData({
            name: product.name || '',
            category: product.category || 'skincare',
            category_name: product.category_name || 'Skincare',
            short_description: product.short_description || '',
            description: product.description || '',
            benefits: product.benefits || '',
            price: product.price || '',
            price_display: product.price_display || '',
            badge: product.badge || '',
            display_order: product.display_order || 0,
            is_active: !!product.is_active,
            is_featured: !!product.is_featured,
            is_coming_soon: !!product.is_coming_soon,
            image_file: null,
            image_url_custom: product.image_url || product.image || '',
        });
        setEditPreview(product.image_url || product.image || null);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingProduct) return;
        editForm.post(`/admin/products/${editingProduct.id}/update-with-file`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEditingProduct(null);
                setEditPreview(null);
            },
        });
    };

    const confirmDelete = () => {
        if (!deleteModalProduct) return;
        router.delete(`/admin/products/${deleteModalProduct.id}`, {
            onSuccess: () => setDeleteModalProduct(null),
        });
    };

    return (
        <AdminLayout
            title="Products Catalog & Store Management"
            subtitle="Add, modify, categorize, and control products displayed across the public Infinite landing page"
        >
            <Head title="Products Catalog & Inventory | INFINITE Admin" />

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
                {/* TOP HEADER CARD */}
                <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 xl:p-8 bg-[#061726]/90 border border-[#2c6973]/75 shadow-[0_15px_45px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#15cbb7]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24dbc3]/10 border border-[#24dbc3]/30 text-[#27dec9] text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-[#25dec0] shrink-0" />
                            <span>Storefront Registry</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                            <Package className="w-6 h-6 text-[#25dec0]" />
                            <span>Products Catalog &amp; Inventory</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                            Add, organize, and publish official product lines shown on the public landing page showcase.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="relative z-10 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-extrabold text-xs flex items-center gap-2 shadow-[0_4px_20px_rgba(36,219,195,0.25)] hover:brightness-110 active:scale-[.99] transition-all border-0 shrink-0 cursor-pointer"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Add New Product</span>
                    </button>
                </div>

                {/* 4 HIGH-END KPI STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {/* Card 1: Total */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-[#24dbc3]/50 hover:shadow-[0_10px_35px_rgba(36,219,195,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-[#24dbc3] before:to-[#42f1ce]">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Total Products
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-[#25dec0] group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Package className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-white tracking-wide">
                                {stats.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-[#24dbc3]/15 text-[#27dec9] border border-[#24dbc3]/30 shrink-0">
                                Total Items
                            </span>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Database Records</span>
                            <span className="text-slate-300 font-mono text-[11px]">{stats.active || 0} published</span>
                        </div>
                    </div>

                    {/* Card 2: Live */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-[0_10px_35px_rgba(16,185,129,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-emerald-400 before:to-teal-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Live On Website
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-emerald-400 tracking-wide">
                                {stats.active || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                                Active Catalog
                            </span>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Store Visibility</span>
                            <span className="text-emerald-400 font-bold text-[11px]">Visible to Public</span>
                        </div>
                    </div>

                    {/* Card 3: Archived */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-amber-500/50 hover:shadow-[0_10px_35px_rgba(245,158,11,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-amber-400 before:to-orange-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Archived Items
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Archive className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-amber-400 tracking-wide">
                                {stats.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                                Hidden
                            </span>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Archived Records</span>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>View Archive</span>
                                <RotateCcw className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Card 4: Categories */}
                    <div className="rounded-2xl p-4 sm:p-5 xl:p-6 bg-[#061726]/90 border border-[#1b5361]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)] relative overflow-hidden group hover:border-purple-500/50 hover:shadow-[0_10px_35px_rgba(168,85,247,0.1)] transition-all duration-300 before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:to-indigo-500">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] xl:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider truncate">
                                Categories
                            </span>
                            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-[#082033] border border-[#1e4e5b]/80 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                <Layers className="w-4 h-4 xl:w-5 xl:h-5" />
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-purple-300 tracking-wide">
                                {stats.categories || 3}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0">
                                Product Lines
                            </span>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#1b5361]/60 flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px] xl:text-[11px]">Skincare, Wellness &amp; O'Lamour</span>
                            <span className="text-purple-300 font-bold text-[11px]">Standard</span>
                        </div>
                    </div>
                </div>

                {/* MAIN FILTER & ACTION CARD */}
                <div className="bg-[#061726]/90 border border-[#1b5361]/60 rounded-2xl p-4 sm:p-6 shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl space-y-4">
                    {/* View Switcher Tabs & View Mode */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b5361]/60">
                        {/* View Tabs */}
                        <div className="flex items-center gap-1.5 bg-[#082033]/90 p-1 rounded-xl border border-[#1e4e5b]/70 text-xs font-semibold shadow-inner">
                            <button
                                type="button"
                                onClick={() => handleViewChange('active')}
                                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'active'
                                        ? 'bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-extrabold shadow-[0_2px_12px_rgba(36,219,195,0.25)]'
                                        : 'text-slate-300 hover:text-white bg-transparent'
                                }`}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Active Catalog ({stats.active || 0})</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'archived'
                                        ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                                        : 'text-slate-300 hover:text-white bg-transparent'
                                }`}
                            >
                                <Archive className="w-3.5 h-3.5" />
                                <span>Archived ({stats.archived || 0})</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleViewChange('all')}
                                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'all'
                                        ? 'bg-[#0c2638] text-white font-extrabold border border-[#276472]/80 shadow-md'
                                        : 'text-slate-300 hover:text-white bg-transparent'
                                }`}
                            >
                                <Layers className="w-3.5 h-3.5" />
                                <span>All ({stats.total || 0})</span>
                            </button>
                        </div>

                        {/* Grid / Table layout switcher */}
                        <div className="flex items-center gap-1 bg-[#082033]/90 p-1 rounded-xl border border-[#1e4e5b]/70 shadow-inner">
                            <button
                                type="button"
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg border-0 transition-colors cursor-pointer ${
                                    viewMode === 'grid'
                                        ? 'bg-[#24dbc3] text-[#031927]'
                                        : 'text-slate-400 hover:text-white bg-transparent'
                                }`}
                                title="Grid View"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('table')}
                                className={`p-1.5 rounded-lg border-0 transition-colors cursor-pointer ${
                                    viewMode === 'table'
                                        ? 'bg-[#24dbc3] text-[#031927]'
                                        : 'text-slate-400 hover:text-white bg-transparent'
                                }`}
                                title="Table View"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <form onSubmit={handleSearch} className="flex-1 relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search products by title, benefits, description, badge..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30 transition-all"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        applyFilters({ search: '' });
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer p-0.5"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </form>

                        {/* Category Dropdown */}
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                applyFilters({ category: e.target.value });
                            }}
                            className="bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#24dbc3] font-medium"
                        >
                            <option value="all">All Categories</option>
                            <option value="skincare">Skincare Collection</option>
                            <option value="wellness">Wellness &amp; Health</option>
                            <option value="o'lamour">O'Lamour Luxury</option>
                        </select>

                        {/* Status Dropdown */}
                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                applyFilters({ status: e.target.value });
                            }}
                            className="bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#24dbc3] font-medium"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Live on Store</option>
                            <option value="inactive">Hidden</option>
                            <option value="coming_soon">Coming Soon</option>
                        </select>
                    </div>
                </div>

                {/* VIEW 1: ELEGANT PRODUCT GRID */}
                {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
                        {productList.length === 0 ? (
                            <div className="col-span-full rounded-2xl bg-[#061726]/90 border border-[#1b5361]/60 p-12 text-center text-slate-400 shadow-xl">
                                <Package className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#25dec0]" />
                                <h4 className="text-sm font-bold text-white mb-1">No products found</h4>
                                <p className="text-xs text-slate-400">Try adjusting your category or search filter.</p>
                            </div>
                        ) : (
                            productList.map((p) => {
                                const isSelected = selectedIds.includes(p.id);

                                return (
                                    <div
                                        key={p.id}
                                        className={`rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden relative group shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${
                                            isSelected
                                                ? 'bg-[#092b3a]/90 border-[#24dbc3]/60 shadow-[0_10px_35px_rgba(36,219,195,0.15)]'
                                                : 'bg-[#061726]/90 border-[#1b5361]/60 hover:border-[#24dbc3]/40 hover:shadow-2xl'
                                        }`}
                                    >
                                        {/* Top Card Checkbox */}
                                        <div className="absolute top-3 left-3 z-10">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleToggleSelect(p.id)}
                                                className="w-4 h-4 rounded border-[#1e4e5b] bg-[#082033]/90 text-[#24dbc3] focus:ring-[#24dbc3] cursor-pointer"
                                            />
                                        </div>

                                        {/* Badge / Status Tag Overlay */}
                                        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                                            {p.is_coming_soon ? (
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] shadow-md">
                                                    Coming Soon
                                                </span>
                                            ) : p.badge ? (
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#082033]/95 text-[#27dec9] border border-[#24dbc3]/40 shadow backdrop-blur-sm">
                                                    {p.badge}
                                                </span>
                                            ) : null}
                                        </div>

                                        {/* Product Photo Box: Clean Podium Presentation */}
                                        <div className="h-52 bg-gradient-to-b from-[#082033]/90 to-[#061726]/80 p-4 flex items-center justify-center border-b border-[#1b5361]/60 relative overflow-hidden group-hover:bg-[#0c2638]/90 transition-colors">
                                            <div className="w-full h-full rounded-xl bg-white/95 p-3 flex items-center justify-center shadow-inner">
                                                <img
                                                    src={p.image_url || p.image}
                                                    alt={p.name}
                                                    className="max-h-36 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.src = '/assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png';
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Product Body */}
                                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                            <div>
                                                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                                                    <span className="text-[#25dec0] font-extrabold">{p.category_name || p.category}</span>
                                                    <span>Order: #{p.display_order || 0}</span>
                                                </div>

                                                <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-[#42f1ce] transition-colors mb-1" title={p.name}>
                                                    {p.name}
                                                </h4>

                                                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-0">
                                                    {p.short_description || p.description}
                                                </p>
                                            </div>

                                            {/* Status Switcher & Order */}
                                            <div className="pt-3 border-t border-[#1b5361]/60 flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${
                                                            p.is_active ? 'bg-emerald-400' : 'bg-slate-500'
                                                        }`}
                                                    />
                                                    <span className="text-xs text-slate-300 font-medium">
                                                        {p.is_active ? 'Live on Site' : 'Hidden'}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleStatus(p)}
                                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border-0 cursor-pointer transition-all ${
                                                        p.is_active
                                                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                                                            : 'bg-[#082033] text-slate-400 hover:bg-[#0c2638] border border-[#1e4e5b]/60'
                                                    }`}
                                                >
                                                    {p.is_active ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </div>

                                            {/* Card Footer Actions */}
                                            <div className="pt-2 flex items-center justify-between gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setViewProduct(p)}
                                                    className="px-2.5 py-1.5 rounded-lg bg-[#082033] hover:bg-[#0c2638] text-slate-300 text-xs font-semibold flex items-center gap-1 border border-[#1e4e5b]/70 transition-colors cursor-pointer"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Preview</span>
                                                </button>

                                                <div className="flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(p)}
                                                        className="p-1.5 rounded-lg bg-[#24dbc3]/10 hover:bg-[#24dbc3]/20 text-[#27dec9] transition-colors border border-[#24dbc3]/30 cursor-pointer"
                                                        title="Edit Product"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteModalProduct(p)}
                                                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors border border-rose-500/30 cursor-pointer"
                                                        title="Delete Product"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

                {/* VIEW 2: HIGH-DENSITY SPREADSHEET TABLE */}
                {viewMode === 'table' && (
                    <div className="rounded-2xl border border-[#1b5361]/60 bg-[#061726]/90 shadow-[0_15px_45px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden relative">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs min-w-[760px]">
                                <thead className="bg-[#082033]/95 text-slate-300 uppercase tracking-wider font-bold text-[11px] border-b border-[#1b5361]/70">
                                    <tr>
                                        <th className="py-4 px-4 w-10 text-center">
                                            <input
                                                type="checkbox"
                                                checked={productList.length > 0 && selectedIds.length === productList.length}
                                                onChange={handleSelectAll}
                                                className="rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] cursor-pointer"
                                            />
                                        </th>
                                        <th className="py-4 px-4">Product</th>
                                        <th className="py-4 px-4">Category</th>
                                        <th className="py-4 px-4">Order</th>
                                        <th className="py-4 px-4">Badge</th>
                                        <th className="py-4 px-4 text-center">Live Status</th>
                                        <th className="py-4 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1b5361]/40 text-slate-300">
                                    {productList.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="py-12 text-center text-slate-400">
                                                <Package className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#25dec0]" />
                                                <span>No products found matching filters.</span>
                                            </td>
                                        </tr>
                                    ) : (
                                        productList.map((p) => {
                                            const isSelected = selectedIds.includes(p.id);

                                            return (
                                                <tr
                                                    key={p.id}
                                                    className={`transition-colors ${
                                                        isSelected ? 'bg-[#15cbb7]/15' : 'hover:bg-[#0c2638]/70'
                                                    }`}
                                                >
                                                    <td className="py-3 px-4 text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleToggleSelect(p.id)}
                                                            className="rounded border-[#1e4e5b] bg-[#082033] text-[#24dbc3] focus:ring-[#24dbc3] cursor-pointer"
                                                        />
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-[#1e4e5b]/60 shadow-sm">
                                                                <img
                                                                    src={p.image_url || p.image}
                                                                    alt={p.name}
                                                                    className="max-h-8 max-w-full object-contain"
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-white text-xs">{p.name}</div>
                                                                <div className="text-[11px] text-slate-400 truncate max-w-xs">{p.short_description || p.description}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#24dbc3]/10 text-[#27dec9] border border-[#24dbc3]/30">
                                                            {p.category_name || p.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 font-mono text-slate-300">
                                                        #{p.display_order || 0}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {p.is_coming_soon ? (
                                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#24dbc3] text-[#031927]">Coming Soon</span>
                                                        ) : p.badge ? (
                                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#082033] text-slate-200 border border-[#1e4e5b]/60">{p.badge}</span>
                                                        ) : (
                                                            <span className="text-slate-500">—</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleStatus(p)}
                                                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border-0 cursor-pointer transition-all ${
                                                                p.is_active
                                                                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                                                    : 'bg-[#082033] text-slate-400 border border-[#1e4e5b]/60'
                                                            }`}
                                                        >
                                                            {p.is_active ? 'Live' : 'Hidden'}
                                                        </button>
                                                    </td>
                                                    <td className="py-3 px-4 text-right">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <button
                                                                type="button"
                                                                onClick={() => setViewProduct(p)}
                                                                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#082033] hover:bg-[#0c2638] transition-colors border border-[#1e4e5b]/70 cursor-pointer"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => openEditModal(p)}
                                                                className="p-1.5 rounded-lg bg-[#24dbc3]/10 hover:bg-[#24dbc3]/20 text-[#27dec9] transition-colors border border-[#24dbc3]/30 cursor-pointer"
                                                                title="Edit Product"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteModalProduct(p)}
                                                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors border border-rose-500/30 cursor-pointer"
                                                                title="Delete Product"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* PAGINATION */}
                {products.links && products.links.length > 3 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#1b5361]/60 text-xs text-slate-400">
                        <div>
                            Showing <strong className="text-white">{products.from || 0}</strong> to{' '}
                            <strong className="text-white">{products.to || 0}</strong> of{' '}
                            <strong className="text-white">{products.total || 0}</strong> catalog products
                        </div>
                        <div className="flex items-center gap-1">
                            {products.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                    className={`px-3 py-1.5 rounded-lg font-medium transition-all border-0 cursor-pointer ${
                                        link.active
                                            ? 'bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-bold shadow'
                                            : 'bg-[#061726] text-slate-400 hover:text-white disabled:opacity-30'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* FIXED BOTTOM FLOATING BULK ACTIONS TOOLBAR */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-[#061726]/95 backdrop-blur-xl border border-[#24dbc3]/40 rounded-2xl p-3 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
                    <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] text-[#031927] font-black flex items-center justify-center text-xs shadow-md">
                            {selectedIds.length}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white">
                            Product(s) Selected
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {currentView === 'archived' ? (
                            <button
                                type="button"
                                onClick={handleBulkRestore}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Restore</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleBulkArchive}
                                className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer"
                            >
                                <Archive className="w-3.5 h-3.5" />
                                <span>Archive</span>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleBulkDelete}
                            className="bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedIds([])}
                            className="bg-[#082033] text-slate-300 hover:text-white rounded-xl px-2.5 py-1.5 text-xs border border-[#1e4e5b]/80 cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL 1: CREATE NEW PRODUCT
            ======================================================== */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />

                        <div className="flex items-center justify-between pb-4 border-b border-[#1b5361]/60 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#24dbc3]/10 border border-[#24dbc3]/30 flex items-center justify-center text-[#25dec0]">
                                    <Plus className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white tracking-tight">Add New Product</h3>
                                    <p className="text-xs text-slate-400 mt-0.5">Upload item details to display on website</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="w-8 h-8 rounded-xl bg-[#082033] hover:bg-[#0c2638] text-slate-400 hover:text-white flex items-center justify-center border border-[#1e4e5b]/80 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Product Title <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="e.g. Infinite Glow-Up Soap"
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                    />
                                    {createForm.errors.name && (
                                        <p className="text-rose-400 text-xs mt-1">{createForm.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Category <span className="text-rose-400">*</span>
                                    </label>
                                    <select
                                        value={createForm.data.category}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            createForm.setData({
                                                ...createForm.data,
                                                category: val,
                                                category_name: val === "o'lamour" ? "O'Lamour" : (val === 'wellness' ? 'Wellness' : 'Skincare'),
                                            });
                                        }}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                    >
                                        <option value="skincare">Skincare</option>
                                        <option value="wellness">Wellness</option>
                                        <option value="o'lamour">O'Lamour</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Badge Label (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.badge}
                                        onChange={(e) => createForm.setData('badge', e.target.value)}
                                        placeholder="e.g. Top Seller, Certified Organic"
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Display Order (Sequence #)
                                    </label>
                                    <input
                                        type="number"
                                        value={createForm.data.display_order}
                                        onChange={(e) => createForm.setData('display_order', parseInt(e.target.value) || 0)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Short Summary Description
                                </label>
                                <textarea
                                    rows="2"
                                    value={createForm.data.short_description}
                                    onChange={(e) => createForm.setData('short_description', e.target.value)}
                                    placeholder="Brief highlight shown on product cards..."
                                    className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Full Product Details
                                </label>
                                <textarea
                                    rows="3"
                                    value={createForm.data.description}
                                    onChange={(e) => createForm.setData('description', e.target.value)}
                                    placeholder="Detailed ingredients, skin benefits, usage..."
                                    className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#24dbc3] focus:ring-1 focus:ring-[#24dbc3]/30"
                                />
                            </div>

                            {/* Image Upload / URL */}
                            <div className="p-4 bg-[#082033]/80 rounded-2xl border border-[#1e4e5b]/70 space-y-3">
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                                    Product Image
                                </label>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    {createPreview && (
                                        <div className="w-20 h-20 rounded-xl bg-white p-1 border border-[#1e4e5b]/80 flex items-center justify-center shrink-0">
                                            <img
                                                src={createPreview}
                                                alt="Preview"
                                                className="max-h-16 max-w-full object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 w-full space-y-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                createForm.setData('image_file', file);
                                                if (file) {
                                                    setCreatePreview(URL.createObjectURL(file));
                                                }
                                            }}
                                            className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#24dbc3]/10 file:text-[#27dec9] hover:file:bg-[#24dbc3]/20 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={createForm.data.image_url_custom}
                                            onChange={(e) => {
                                                createForm.setData('image_url_custom', e.target.value);
                                                setCreatePreview(e.target.value);
                                            }}
                                            placeholder="Or enter existing path: /assets/image/product/..."
                                            className="w-full bg-[#061726] border border-[#1e4e5b]/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#24dbc3]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/70 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={createForm.data.is_active}
                                        onChange={(e) => createForm.setData('is_active', e.target.checked)}
                                        className="rounded border-[#1e4e5b] bg-[#061726] text-[#24dbc3] focus:ring-[#24dbc3]"
                                    />
                                    <span className="text-xs text-slate-300 font-semibold">Publish Live on Landing Page</span>
                                </label>

                                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/70 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={createForm.data.is_coming_soon}
                                        onChange={(e) => createForm.setData('is_coming_soon', e.target.checked)}
                                        className="rounded border-[#1e4e5b] bg-[#061726] text-[#24dbc3] focus:ring-[#24dbc3]"
                                    />
                                    <span className="text-xs text-slate-300 font-semibold">Mark as "Coming Soon"</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1b5361]/60">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#082033] border border-[#1e4e5b]/80 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#031927] bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] hover:brightness-110 border-0 shadow-[0_4px_20px_rgba(36,219,195,0.25)] disabled:opacity-60 cursor-pointer"
                                >
                                    {createForm.processing ? 'Saving...' : 'Save & Publish Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL 2: EDIT PRODUCT
            ======================================================== */}
            {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />

                        <div className="flex items-center justify-between pb-4 border-b border-[#1b5361]/60 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#24dbc3]/10 border border-[#24dbc3]/30 flex items-center justify-center text-[#25dec0]">
                                    <Edit2 className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white tracking-tight">
                                        Edit Product: {editingProduct.name}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-0.5">Update pricing, description, or visibility</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="w-8 h-8 rounded-xl bg-[#082033] hover:bg-[#0c2638] text-slate-400 hover:text-white flex items-center justify-center border border-[#1e4e5b]/80 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Product Title <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Category <span className="text-rose-400">*</span>
                                    </label>
                                    <select
                                        value={editForm.data.category}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            editForm.setData({
                                                ...editForm.data,
                                                category: val,
                                                category_name: val === "o'lamour" ? "O'Lamour" : (val === 'wellness' ? 'Wellness' : 'Skincare'),
                                            });
                                        }}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                    >
                                        <option value="skincare">Skincare</option>
                                        <option value="wellness">Wellness</option>
                                        <option value="o'lamour">O'Lamour</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Badge Label
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.data.badge}
                                        onChange={(e) => editForm.setData('badge', e.target.value)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        value={editForm.data.display_order}
                                        onChange={(e) => editForm.setData('display_order', parseInt(e.target.value) || 0)}
                                        className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Short Summary Description
                                </label>
                                <textarea
                                    rows="2"
                                    value={editForm.data.short_description}
                                    onChange={(e) => editForm.setData('short_description', e.target.value)}
                                    className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Full Product Details
                                </label>
                                <textarea
                                    rows="3"
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                    className="w-full bg-[#082033]/90 border border-[#1e4e5b]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                />
                            </div>

                            {/* Image Upload / URL */}
                            <div className="p-4 bg-[#082033]/80 rounded-2xl border border-[#1e4e5b]/70 space-y-3">
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                                    Update Image
                                </label>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    {editPreview && (
                                        <div className="w-20 h-20 rounded-xl bg-white p-1 border border-[#1e4e5b]/80 flex items-center justify-center shrink-0">
                                            <img
                                                src={editPreview}
                                                alt="Preview"
                                                className="max-h-16 max-w-full object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 w-full space-y-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                editForm.setData('image_file', file);
                                                if (file) {
                                                    setEditPreview(URL.createObjectURL(file));
                                                }
                                            }}
                                            className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#24dbc3]/10 file:text-[#27dec9] hover:file:bg-[#24dbc3]/20 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={editForm.data.image_url_custom}
                                            onChange={(e) => {
                                                editForm.setData('image_url_custom', e.target.value);
                                                setEditPreview(e.target.value);
                                            }}
                                            placeholder="Or enter image path: /assets/image/product/..."
                                            className="w-full bg-[#061726] border border-[#1e4e5b]/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#24dbc3]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/70 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.is_active}
                                        onChange={(e) => editForm.setData('is_active', e.target.checked)}
                                        className="rounded border-[#1e4e5b] bg-[#061726] text-[#24dbc3] focus:ring-[#24dbc3]"
                                    />
                                    <span className="text-xs text-slate-300 font-semibold">Publish Live on Landing Page</span>
                                </label>

                                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#082033]/90 border border-[#1e4e5b]/70 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.is_coming_soon}
                                        onChange={(e) => editForm.setData('is_coming_soon', e.target.checked)}
                                        className="rounded border-[#1e4e5b] bg-[#061726] text-[#24dbc3] focus:ring-[#24dbc3]"
                                    />
                                    <span className="text-xs text-slate-300 font-semibold">Mark as "Coming Soon"</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1b5361]/60">
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#082033] border border-[#1e4e5b]/80 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-[#031927] bg-gradient-to-r from-[#24dbc3] to-[#29dfb4] hover:brightness-110 border-0 shadow-[0_4px_20px_rgba(36,219,195,0.25)] disabled:opacity-60 cursor-pointer"
                                >
                                    {editForm.processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL 3: VIEW PRODUCT DETAILS
            ======================================================== */}
            {viewProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18d8c5] via-[#42f1ce] to-[#17c9b9]" />

                        <div className="flex items-center justify-between pb-4 border-b border-[#1b5361]/60 mb-5">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#24dbc3]/10 text-[#27dec9] border border-[#24dbc3]/30">
                                    {viewProduct.category_name || viewProduct.category}
                                </span>
                                {viewProduct.is_coming_soon && (
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#24dbc3] text-[#031927]">
                                        Coming Soon
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setViewProduct(null)}
                                className="w-8 h-8 rounded-xl bg-[#082033] hover:bg-[#0c2638] text-slate-400 hover:text-white flex items-center justify-center border border-[#1e4e5b]/80 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="h-56 rounded-2xl bg-white p-4 flex items-center justify-center shadow-inner border border-[#1e4e5b]/60">
                                <img
                                    src={viewProduct.image_url || viewProduct.image}
                                    alt={viewProduct.name}
                                    className="max-h-48 max-w-full object-contain"
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{viewProduct.name}</h3>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    {viewProduct.description || viewProduct.short_description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-[#1b5361]/60 flex items-center justify-between">
                                <span className="text-xs text-slate-400">
                                    Status: <strong className="text-white">{viewProduct.is_active ? 'Live on Site' : 'Hidden'}</strong>
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setViewProduct(null)}
                                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#082033] hover:bg-[#0c2638] text-white border border-[#1e4e5b]/80 cursor-pointer"
                                >
                                    Close Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL 4: DELETE CONFIRMATION
            ======================================================== */}
            {deleteModalProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020d1b]/85 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="bg-[#061726]/98 border border-[#2c6973]/80 rounded-2xl sm:rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl text-center relative overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500" />

                        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">Delete Product from Catalog?</h4>
                        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                            Are you sure you want to permanently delete <strong className="text-white">{deleteModalProduct.name}</strong> from the database? This item will be removed immediately.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteModalProduct(null)}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#082033] border border-[#1e4e5b]/80 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 border-0 shadow-lg shadow-rose-500/20 cursor-pointer"
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
