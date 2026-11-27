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
                <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-white border border-slate-200/90 shadow-xs overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0f766e] text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-[#0f766e] shrink-0" />
                            <span>Storefront Registry</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <Package className="w-6 h-6 text-[#0f766e]" />
                            <span>Products Catalog &amp; Inventory</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
                            Add, organize, and publish official product lines shown on the public landing page showcase.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all border-0 shrink-0 cursor-pointer"
                    >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>Add New Product</span>
                    </button>
                </div>

                {/* 4 HIGH-END KPI STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                    {/* Card 1: Total */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[inset_4px_0_0_#0f766e,0_2px_12px_rgba(15,23,42,0.045)] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Total Products
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0f766e] shadow-xs">
                                <Package className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                {stats.total || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#0f766e] border border-teal-200">
                                Total Items
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Database Records</span>
                            <span className="text-slate-700 font-mono text-[11px] font-semibold">{stats.active || 0} published</span>
                        </div>
                    </div>

                    {/* Card 2: Live */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[inset_4px_0_0_#10b981,0_2px_12px_rgba(15,23,42,0.045)] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Live On Website
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                                {stats.active || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Active Catalog
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Store Visibility</span>
                            <span className="text-emerald-700 font-bold text-[11px]">Visible to Public</span>
                        </div>
                    </div>

                    {/* Card 3: Archived */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[inset_4px_0_0_#f59e0b,0_2px_12px_rgba(15,23,42,0.045)] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Archived Items
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#f59e0b] shadow-xs">
                                <Archive className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-[#d97706] tracking-tight">
                                {stats.archived || 0}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                Hidden
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Archived Records</span>
                            <button
                                type="button"
                                onClick={() => handleViewChange('archived')}
                                className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0 text-xs"
                            >
                                <span>View Archive</span>
                                <RotateCcw className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Card 4: Categories */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[inset_4px_0_0_#a855f7,0_2px_12px_rgba(15,23,42,0.045)] transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Categories
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-xs">
                                <Layers className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between gap-2 flex-wrap">
                            <div className="text-2xl sm:text-3xl font-black text-purple-700 tracking-tight">
                                {stats.categories || 3}
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                                Product Lines
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-500 text-[11px]">Skincare, Wellness &amp; O'Lamour</span>
                            <span className="text-purple-700 font-bold text-[11px]">Standard</span>
                        </div>
                    </div>
                </div>

                {/* MAIN FILTER & ACTION CARD */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
                    {/* View Switcher Tabs & View Mode */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        {/* View Tabs */}
                        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
                            <button
                                type="button"
                                onClick={() => handleViewChange('active')}
                                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 border-0 cursor-pointer ${
                                    currentView === 'active'
                                        ? 'bg-[#0f766e] text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
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
                                        ? 'bg-[#f59e0b] text-slate-900 font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
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
                                        ? 'bg-slate-800 text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                }`}
                            >
                                <Layers className="w-3.5 h-3.5" />
                                <span>All ({stats.total || 0})</span>
                            </button>
                        </div>

                        {/* Grid / Table layout switcher */}
                        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
                            <button
                                type="button"
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg border-0 transition-colors cursor-pointer ${
                                    viewMode === 'grid'
                                        ? 'bg-[#0f766e] text-white'
                                        : 'text-slate-500 hover:text-slate-900 bg-transparent'
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
                                        ? 'bg-[#0f766e] text-white'
                                        : 'text-slate-500 hover:text-slate-900 bg-transparent'
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
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        applyFilters({ search: '' });
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-0.5"
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
                            className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#0f766e] focus:bg-white font-medium"
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
                            className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#0f766e] focus:bg-white font-medium"
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
                            <div className="col-span-full rounded-2xl bg-white border border-slate-200/90 p-12 text-center text-slate-500 shadow-xs">
                                <Package className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#0f766e]" />
                                <h4 className="text-sm font-bold text-slate-900 mb-1">No products found</h4>
                                <p className="text-xs text-slate-500">Try adjusting your category or search filter.</p>
                            </div>
                        ) : (
                            productList.map((p) => {
                                const isSelected = selectedIds.includes(p.id);

                                return (
                                    <div
                                        key={p.id}
                                        className={`rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden relative group shadow-xs ${
                                            isSelected
                                                ? 'bg-teal-50/60 border-[#0f766e] shadow-md'
                                                : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                                        }`}
                                    >
                                        {/* Top Card Checkbox */}
                                        <div className="absolute top-3 left-3 z-10">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleToggleSelect(p.id)}
                                                className="w-4 h-4 rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e] cursor-pointer"
                                            />
                                        </div>

                                        {/* Badge / Status Tag Overlay */}
                                        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                                            {p.is_coming_soon ? (
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#0f766e] to-[#14b8a6] text-white shadow-xs">
                                                    Coming Soon
                                                </span>
                                            ) : p.badge ? (
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#0f766e] border border-teal-200 shadow-xs backdrop-blur-sm">
                                                    {p.badge}
                                                </span>
                                            ) : null}
                                        </div>

                                        {/* Product Photo Box: Clean Podium Presentation */}
                                        <div className="h-52 bg-slate-50 p-4 flex items-center justify-center border-b border-slate-100 relative overflow-hidden group-hover:bg-slate-100/70 transition-colors">
                                            <div className="w-full h-full rounded-xl bg-white p-3 flex items-center justify-center shadow-xs border border-slate-200/60">
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
                                                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                                                    <span className="text-[#0f766e] font-extrabold">{p.category_name || p.category}</span>
                                                    <span>Order: #{p.display_order || 0}</span>
                                                </div>

                                                <h4 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-[#0f766e] transition-colors mb-1" title={p.name}>
                                                    {p.name}
                                                </h4>

                                                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-0">
                                                    {p.short_description || p.description}
                                                </p>
                                            </div>

                                            {/* Status Switcher & Order */}
                                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${
                                                            p.is_active ? 'bg-emerald-500' : 'bg-slate-400'
                                                        }`}
                                                    />
                                                    <span className="text-xs text-slate-600 font-medium">
                                                        {p.is_active ? 'Live on Site' : 'Hidden'}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleStatus(p)}
                                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border-0 cursor-pointer transition-all ${
                                                        p.is_active
                                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
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
                                                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-200 transition-colors cursor-pointer"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Preview</span>
                                                </button>

                                                <div className="flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(p)}
                                                        className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#0f766e] transition-colors border border-teal-200 cursor-pointer"
                                                        title="Edit Product"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteModalProduct(p)}
                                                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200 cursor-pointer"
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
                    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden relative">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs min-w-[760px]">
                                <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold text-[11px] border-b border-slate-200">
                                    <tr>
                                        <th className="py-3.5 px-4 w-10 text-center">
                                            <input
                                                type="checkbox"
                                                checked={productList.length > 0 && selectedIds.length === productList.length}
                                                onChange={handleSelectAll}
                                                className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e] cursor-pointer"
                                            />
                                        </th>
                                        <th className="py-3.5 px-4">Product</th>
                                        <th className="py-3.5 px-4">Category</th>
                                        <th className="py-3.5 px-4">Order</th>
                                        <th className="py-3.5 px-4">Badge</th>
                                        <th className="py-3.5 px-4 text-center">Live Status</th>
                                        <th className="py-3.5 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {productList.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="py-12 text-center text-slate-500">
                                                <Package className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#0f766e]" />
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
                                                        isSelected ? 'bg-teal-50/70 shadow-[inset_4px_0_0_#0f766e,0_2px_12px_rgba(15,23,42,0.045)]' : 'hover:bg-slate-50/70'
                                                    }`}
                                                >
                                                    <td className="py-3 px-4 text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleToggleSelect(p.id)}
                                                            className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e] cursor-pointer"
                                                        />
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-50 p-1 flex items-center justify-center shrink-0 border border-slate-200 shadow-xs">
                                                                <img
                                                                    src={p.image_url || p.image}
                                                                    alt={p.name}
                                                                    className="max-h-8 max-w-full object-contain"
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-slate-900 text-xs">{p.name}</div>
                                                                <div className="text-[11px] text-slate-500 truncate max-w-xs">{p.short_description || p.description}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-[#0f766e] border border-teal-200">
                                                            {p.category_name || p.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 font-mono text-slate-600 font-semibold">
                                                        #{p.display_order || 0}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {p.is_coming_soon ? (
                                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0f766e] text-white">Coming Soon</span>
                                                        ) : p.badge ? (
                                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">{p.badge}</span>
                                                        ) : (
                                                            <span className="text-slate-400">—</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleStatus(p)}
                                                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border-0 cursor-pointer transition-all ${
                                                                p.is_active
                                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                                    : 'bg-slate-100 text-slate-500 border border-slate-200'
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
                                                                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => openEditModal(p)}
                                                                className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#0f766e] transition-colors border border-teal-200 cursor-pointer"
                                                                title="Edit Product"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteModalProduct(p)}
                                                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200 cursor-pointer"
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
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs text-slate-500">
                        <div>
                            Showing <strong className="text-slate-900">{products.from || 0}</strong> to{' '}
                            <strong className="text-slate-900">{products.to || 0}</strong> of{' '}
                            <strong className="text-slate-900">{products.total || 0}</strong> catalog products
                        </div>
                        <div className="flex items-center gap-1">
                            {products.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true })}
                                    className={`px-3 py-1.5 rounded-lg font-medium transition-all border-0 cursor-pointer ${
                                        link.active
                                            ? 'bg-[#0f766e] text-white font-bold shadow-xs'
                                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 disabled:opacity-30'
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
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-slate-900 text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
                    <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-[#14b8a6] text-slate-950 font-black flex items-center justify-center text-xs shadow-md">
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
                                className="bg-[#f59e0b] hover:bg-amber-600 text-slate-950 font-bold rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs border-0 shadow cursor-pointer"
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
                            className="bg-slate-800 text-slate-300 hover:text-white rounded-xl px-2.5 py-1.5 text-xs border border-slate-700 cursor-pointer"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e]">
                                    <Plus className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight">Add New Product</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">Upload item details to display on website</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center border border-slate-200 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Product Title <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="e.g. Infinite Glow-Up Soap"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white"
                                    />
                                    {createForm.errors.name && (
                                        <p className="text-rose-600 text-xs mt-1">{createForm.errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Category <span className="text-rose-500">*</span>
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
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    >
                                        <option value="skincare">Skincare</option>
                                        <option value="wellness">Wellness</option>
                                        <option value="o'lamour">O'Lamour</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Badge Label (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.badge}
                                        onChange={(e) => createForm.setData('badge', e.target.value)}
                                        placeholder="e.g. Top Seller, Certified Organic"
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Display Order (Sequence #)
                                    </label>
                                    <input
                                        type="number"
                                        value={createForm.data.display_order}
                                        onChange={(e) => createForm.setData('display_order', parseInt(e.target.value) || 0)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Short Summary Description
                                </label>
                                <textarea
                                    rows="2"
                                    value={createForm.data.short_description}
                                    onChange={(e) => createForm.setData('short_description', e.target.value)}
                                    placeholder="Brief highlight shown on product cards..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Full Product Details
                                </label>
                                <textarea
                                    rows="3"
                                    value={createForm.data.description}
                                    onChange={(e) => createForm.setData('description', e.target.value)}
                                    placeholder="Detailed ingredients, skin benefits, usage..."
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-teal-500/20 focus:bg-white"
                                />
                            </div>

                            {/* Image Upload / URL */}
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Product Image
                                </label>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    {createPreview && (
                                        <div className="w-20 h-20 rounded-xl bg-white p-1 border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
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
                                            className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-[#0f766e] hover:file:bg-teal-100 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={createForm.data.image_url_custom}
                                            onChange={(e) => {
                                                createForm.setData('image_url_custom', e.target.value);
                                                setCreatePreview(e.target.value);
                                            }}
                                            placeholder="Or enter existing path: /assets/image/product/..."
                                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f766e]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={createForm.data.is_active}
                                        onChange={(e) => createForm.setData('is_active', e.target.checked)}
                                        className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                                    />
                                    <span className="text-xs text-slate-700 font-semibold">Publish Live on Landing Page</span>
                                </label>

                                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={createForm.data.is_coming_soon}
                                        onChange={(e) => createForm.setData('is_coming_soon', e.target.checked)}
                                        className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                                    />
                                    <span className="text-xs text-slate-700 font-semibold">Mark as "Coming Soon"</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0f766e] hover:bg-[#115e59] border-0 shadow-xs disabled:opacity-60 cursor-pointer"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0f766e]">
                                    <Edit2 className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                                        Edit Product: {editingProduct.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">Update details, images, or visibility</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center border border-slate-200 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Product Title <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Category <span className="text-rose-500">*</span>
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
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    >
                                        <option value="skincare">Skincare</option>
                                        <option value="wellness">Wellness</option>
                                        <option value="o'lamour">O'Lamour</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Badge Label
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.data.badge}
                                        onChange={(e) => editForm.setData('badge', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        value={editForm.data.display_order}
                                        onChange={(e) => editForm.setData('display_order', parseInt(e.target.value) || 0)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Short Summary Description
                                </label>
                                <textarea
                                    rows="2"
                                    value={editForm.data.short_description}
                                    onChange={(e) => editForm.setData('short_description', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Full Product Details
                                </label>
                                <textarea
                                    rows="3"
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e] focus:bg-white"
                                />
                            </div>

                            {/* Image Upload / URL */}
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Update Image
                                </label>
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    {editPreview && (
                                        <div className="w-20 h-20 rounded-xl bg-white p-1 border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
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
                                            className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-[#0f766e] hover:file:bg-teal-100 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={editForm.data.image_url_custom}
                                            onChange={(e) => {
                                                editForm.setData('image_url_custom', e.target.value);
                                                setEditPreview(e.target.value);
                                            }}
                                            placeholder="Or enter image path: /assets/image/product/..."
                                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0f766e]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.is_active}
                                        onChange={(e) => editForm.setData('is_active', e.target.checked)}
                                        className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                                    />
                                    <span className="text-xs text-slate-700 font-semibold">Publish Live on Landing Page</span>
                                </label>

                                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editForm.data.is_coming_soon}
                                        onChange={(e) => editForm.setData('is_coming_soon', e.target.checked)}
                                        className="rounded border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                                    />
                                    <span className="text-xs text-slate-700 font-semibold">Mark as "Coming Soon"</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editForm.processing}
                                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0f766e] hover:bg-[#115e59] border-0 shadow-xs disabled:opacity-60 cursor-pointer"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#f59e0b]" />

                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-[#0f766e] border border-teal-200">
                                    {viewProduct.category_name || viewProduct.category}
                                </span>
                                {viewProduct.is_coming_soon && (
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#0f766e] text-white">
                                        Coming Soon
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setViewProduct(null)}
                                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center border border-slate-200 cursor-pointer transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="h-56 rounded-2xl bg-slate-50 p-4 flex items-center justify-center shadow-inner border border-slate-200">
                                <img
                                    src={viewProduct.image_url || viewProduct.image}
                                    alt={viewProduct.name}
                                    className="max-h-48 max-w-full object-contain"
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{viewProduct.name}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {viewProduct.description || viewProduct.short_description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs text-slate-500">
                                    Status: <strong className="text-slate-900">{viewProduct.is_active ? 'Live on Site' : 'Hidden'}</strong>
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setViewProduct(null)}
                                    className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 cursor-pointer"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl w-full max-w-md max-h-[90dvh] overflow-y-auto p-5 sm:p-7 shadow-2xl text-center relative">
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-rose-500 via-rose-400 to-[#f59e0b]" />

                        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
                            <Trash2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Delete Product from Catalog?</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                            Are you sure you want to permanently delete <strong className="text-slate-900">{deleteModalProduct.name}</strong> from the database? This item will be removed immediately.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteModalProduct(null)}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 border-0 shadow-xs cursor-pointer"
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
