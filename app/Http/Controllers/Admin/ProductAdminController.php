<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductAdminController extends Controller
{
    /**
     * Display a listing of products with filtering, search, and category sorting.
     */
    public function index(Request $request): Response
    {
        $query = Product::query();

        // View filter: active, archived, all
        $view = $request->input('view', 'active');
        if ($view === 'archived') {
            $query->archived();
        } elseif ($view === 'active') {
            $query->unarchived();
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%")
                  ->orWhere('badge', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->filled('category') && $request->input('category') !== 'all') {
            $query->where('category', $request->input('category'));
        }

        // Status filter (active/inactive)
        if ($request->filled('status') && $request->input('status') !== 'all') {
            $isActive = $request->input('status') === 'active';
            $query->where('is_active', $isActive);
        }

        // Sorting
        $sort = $request->input('sort', 'display_order');
        match ($sort) {
            'name_asc' => $query->orderBy('name', 'asc'),
            'price_asc' => $query->orderBy('price', 'asc'),
            'price_desc' => $query->orderBy('price', 'desc'),
            'newest' => $query->orderBy('created_at', 'desc'),
            default => $query->orderBy('display_order', 'asc')->orderBy('id', 'asc'),
        };

        $products = $query->paginate(12)->withQueryString();

        $stats = [
            'total' => Product::count(),
            'active' => Product::where('is_active', true)->unarchived()->count(),
            'inactive' => Product::where('is_active', false)->unarchived()->count(),
            'archived' => Product::archived()->count(),
            'categories' => Product::distinct('category')->count('category'),
        ];

        $categories = [
            ['id' => 'skincare', 'name' => 'Skincare'],
            ['id' => 'wellness', 'name' => 'Wellness'],
            ['id' => "o'lamour", 'name' => "O'Lamour"],
        ];

        return Inertia::render('Admin/Products', [
            'products' => $products,
            'categories' => $categories,
            'stats' => $stats,
            'filters' => $request->only(['search', 'category', 'status', 'sort', 'view']),
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'category_name' => ['nullable', 'string', 'max:150'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'benefits' => ['nullable'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'price_display' => ['nullable', 'string', 'max:100'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'image_url_custom' => ['nullable', 'string', 'max:255'],
            'badge' => ['nullable', 'string', 'max:50'],
            'display_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'is_coming_soon' => ['nullable', 'boolean'],
        ]);

        // Process benefits array
        $benefits = [];
        if (!empty($validated['benefits'])) {
            if (is_array($validated['benefits'])) {
                $benefits = array_values(array_filter($validated['benefits']));
            } elseif (is_string($validated['benefits'])) {
                $benefits = array_values(array_filter(array_map('trim', explode("\n", $validated['benefits']))));
            }
        }

        // Generate unique slug
        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $counter = 1;
        while (Product::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        // Handle Image upload
        $imagePath = $validated['image_url_custom'] ?? '/assets/image/product/INFINITE_BARLEY_Pure_Organic_Barley_Powder.png';
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $ext = $file->getClientOriginalExtension();
            $fileName = 'prod_' . time() . '_' . Str::random(6) . '.' . $ext;
            
            // Save to public assets directory
            $targetDir = public_path('assets/image/product');
            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0755, true);
            }
            $file->move($targetDir, $fileName);
            $imagePath = '/assets/image/product/' . $fileName;
        }

        $categoryName = ($validated['category_name'] ?? null) ?: match ($validated['category']) {
            'barley' => 'Organic Barley & Wellness',
            'skincare' => "O'Lamour Luxury Skincare",
            'beverages' => 'Healthy Beverages & Coffee',
            'supplements' => 'Health & Radiance Supplements',
            'packages' => 'Global Business Packages',
            default => ucwords(str_replace(['-', '_'], ' ', $validated['category'])),
        };

        $product = Product::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'category' => $validated['category'],
            'category_name' => $categoryName,
            'short_description' => $validated['short_description'] ?? null,
            'description' => $validated['description'] ?? null,
            'benefits' => $benefits,
            'price' => $validated['price'] ?? 0,
            'price_display' => $validated['price_display'] ?? ($validated['price'] ? '$' . number_format($validated['price'], 2) : null),
            'image' => $imagePath,
            'badge' => $validated['badge'] ?? null,
            'display_order' => $validated['display_order'] ?? 0,
            'is_active' => $request->boolean('is_active', true),
            'is_featured' => $request->boolean('is_featured', false),
            'is_coming_soon' => $request->boolean('is_coming_soon', false),
        ]);

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Administrator',
            'action_type' => 'Product Created',
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ? substr($request->userAgent(), 0, 100) : 'Admin Panel',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Product '{$product->name}' created successfully!");
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'category_name' => ['nullable', 'string', 'max:150'],
            'short_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'benefits' => ['nullable'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'price_display' => ['nullable', 'string', 'max:100'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'image_url_custom' => ['nullable', 'string', 'max:255'],
            'badge' => ['nullable', 'string', 'max:50'],
            'display_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'is_coming_soon' => ['nullable', 'boolean'],
        ]);

        // Process benefits array
        $benefits = [];
        if (!empty($validated['benefits'])) {
            if (is_array($validated['benefits'])) {
                $benefits = array_values(array_filter($validated['benefits']));
            } elseif (is_string($validated['benefits'])) {
                $benefits = array_values(array_filter(array_map('trim', explode("\n", $validated['benefits']))));
            }
        }

        // Handle Image upload if provided
        $imagePath = $product->image;
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $ext = $file->getClientOriginalExtension();
            $fileName = 'prod_' . time() . '_' . Str::random(6) . '.' . $ext;
            
            $targetDir = public_path('assets/image/product');
            if (!file_exists($targetDir)) {
                mkdir($targetDir, 0755, true);
            }
            $file->move($targetDir, $fileName);
            $imagePath = '/assets/image/product/' . $fileName;
        } elseif (!empty($validated['image_url_custom'])) {
            $imagePath = $validated['image_url_custom'];
        }

        $categoryName = ($validated['category_name'] ?? null) ?: match ($validated['category']) {
            'barley' => 'Organic Barley & Wellness',
            'skincare' => "O'Lamour Luxury Skincare",
            'beverages' => 'Healthy Beverages & Coffee',
            'supplements' => 'Health & Radiance Supplements',
            'packages' => 'Global Business Packages',
            default => ucwords(str_replace(['-', '_'], ' ', $validated['category'])),
        };

        $product->update([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'category_name' => $categoryName,
            'short_description' => $validated['short_description'] ?? null,
            'description' => $validated['description'] ?? null,
            'benefits' => $benefits,
            'price' => $validated['price'] ?? $product->price,
            'price_display' => $validated['price_display'] ?? $product->price_display,
            'image' => $imagePath,
            'badge' => $validated['badge'] ?? null,
            'display_order' => $validated['display_order'] ?? $product->display_order,
            'is_active' => $request->boolean('is_active', $product->is_active),
            'is_featured' => $request->boolean('is_featured', $product->is_featured),
            'is_coming_soon' => $request->boolean('is_coming_soon', $product->is_coming_soon),
        ]);

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Administrator',
            'action_type' => 'Product Updated',
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ? substr($request->userAgent(), 0, 100) : 'Admin Panel',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Product '{$product->name}' updated successfully!");
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        $name = $product->name;
        $product->delete();

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Administrator',
            'action_type' => 'Product Deleted',
            'device_type' => 'Desktop PC',
            'os_browser' => request()->userAgent() ? substr(request()->userAgent(), 0, 100) : 'Admin Panel',
            'ip_address' => request()->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Product '{$name}' permanently deleted.");
    }

    /**
     * Toggle active status.
     */
    public function toggleStatus(Product $product): RedirectResponse
    {
        $product->update(['is_active' => !$product->is_active]);
        $statusStr = $product->is_active ? 'Active' : 'Inactive';

        return back()->with('success', "Product '{$product->name}' status changed to {$statusStr}.");
    }

    /**
     * Bulk archive products.
     */
    public function bulkArchive(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:products,id'],
        ]);

        $count = Product::whereIn('id', $validated['ids'])->update(['archived_at' => now()]);

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Administrator',
            'action_type' => "Bulk Archive Products ({$count})",
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ? substr($request->userAgent(), 0, 100) : 'Admin Panel',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Successfully archived {$count} product(s).");
    }

    /**
     * Bulk restore archived products.
     */
    public function bulkRestore(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:products,id'],
        ]);

        $count = Product::whereIn('id', $validated['ids'])->update(['archived_at' => null]);

        return back()->with('success', "Successfully restored {$count} product(s).");
    }

    /**
     * Bulk permanently delete products.
     */
    public function bulkDelete(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:products,id'],
        ]);

        $count = Product::whereIn('id', $validated['ids'])->delete();

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Administrator',
            'action_type' => "Bulk Delete Products ({$count})",
            'device_type' => 'Desktop PC',
            'os_browser' => $request->userAgent() ? substr($request->userAgent(), 0, 100) : 'Admin Panel',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return back()->with('success', "Permanently deleted {$count} product(s) from database.");
    }
}
