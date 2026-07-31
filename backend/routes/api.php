<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\SocialiteController;
use App\Http\Controllers\Api\Admin\BookController as AdminBookController;
use App\Http\Controllers\Api\Public\BookController as PublicBookController;
use App\Models\Author;
use App\Models\Category;
use App\Models\Genre;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::prefix('auth')->group(function () {
    // Registration & OTP
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/verify-otp', [RegisterController::class, 'verifyOtp']);
    Route::post('/resend-otp', [RegisterController::class, 'resendOtp']);
    // Forgot Password
    Route::prefix('forgot-password')->group(function () {
        Route::post('/send-otp', [\App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendOtp']);
        Route::post('/verify-otp', [\App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'verifyOtp']);
        Route::post('/reset', [\App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'reset']);
    });

    // Login
    Route::post('/login', [LoginController::class, 'login']);

    // Logout (requires authentication)
    Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

    // Google Socialite (stubbed for future)
    Route::get('/google', [SocialiteController::class, 'redirectToGoogle']);
    Route::get('/google/callback', [SocialiteController::class, 'handleGoogleCallback']);
});

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Get authenticated user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Profile Routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\ProfileController::class, 'show']);
        Route::put('/', [\App\Http\Controllers\Api\ProfileController::class, 'update']);
        Route::put('/password', [\App\Http\Controllers\Api\ProfileController::class, 'updatePassword']);
    });

    // Admin only routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // Uploads
        Route::post('upload', [\App\Http\Controllers\Api\Admin\UploadController::class, 'store']);

        // Orders Management
        Route::get('orders', [\App\Http\Controllers\Api\Admin\OrderController::class, 'index']);
        Route::get('orders/{id}', [\App\Http\Controllers\Api\Admin\OrderController::class, 'show']);
        Route::patch('orders/{id}/status', [\App\Http\Controllers\Api\Admin\OrderController::class, 'updateStatus']);
        Route::post('orders/{id}/cancel', [\App\Http\Controllers\Api\Admin\OrderController::class, 'cancel']);

        // Shipping Management
        Route::get('shipments', [\App\Http\Controllers\Api\Admin\ShipmentController::class, 'index']);
        Route::post('orders/{id}/shipment', [\App\Http\Controllers\Api\Admin\ShipmentController::class, 'updateTracking']);

        // Payments Management
        Route::get('payments', [\App\Http\Controllers\Api\Admin\PaymentController::class, 'index']);

        // Refunds Management
        Route::get('refunds', [\App\Http\Controllers\Api\Admin\RefundController::class, 'index']);
        Route::post('refunds/{id}/resolve', [\App\Http\Controllers\Api\Admin\RefundController::class, 'resolve']);

        // Customers Management
        Route::get('customers', [\App\Http\Controllers\Api\Admin\CustomerController::class, 'index']);
        Route::get('customers/{id}', [\App\Http\Controllers\Api\Admin\CustomerController::class, 'show']);

        // Invoice & PDF
        Route::get('orders/{id}/invoice', [\App\Http\Controllers\Api\Admin\InvoiceController::class, 'downloadInvoice']);
        Route::get('orders/{id}/packing-slip', [\App\Http\Controllers\Api\Admin\InvoiceController::class, 'downloadPackingSlip']);

        // Books CRUD
        Route::apiResource('books', AdminBookController::class);
        Route::post('books/{book}/duplicate', [AdminBookController::class, 'duplicate']);
        Route::patch('books/{book}/inventory', [AdminBookController::class, 'updateInventory']);
        Route::patch('books/{book}/isbn', [AdminBookController::class, 'updateIsbn']);
        Route::patch('books/{book}/digital', [AdminBookController::class, 'updateDigital']);
        Route::patch('books/{book}/pricing', [AdminBookController::class, 'updatePricing']);

        // Authors CRUD
        Route::apiResource('authors', \App\Http\Controllers\Api\Admin\AuthorController::class);
        
        // Categories CRUD
        Route::apiResource('categories', \App\Http\Controllers\Api\Admin\CategoryController::class);
        
        // Genres CRUD
        Route::apiResource('genres', \App\Http\Controllers\Api\Admin\GenreController::class);
        
        // Master Data for Publishers (since we don't have PublisherController yet)
        Route::get('publishers', function () {
            return Publisher::orderBy('name')->get(['id', 'name', 'slug']);
        });

        // Blog Module
        Route::apiResource('blog-categories', \App\Http\Controllers\Api\Admin\BlogCategoryController::class)->parameters(['blog-categories' => 'category']);
        Route::apiResource('blog-tags', \App\Http\Controllers\Api\Admin\BlogTagController::class)->parameters(['blog-tags' => 'tag']);
        Route::apiResource('blog-authors', \App\Http\Controllers\Api\Admin\BlogAuthorController::class)->parameters(['blog-authors' => 'author']);
        Route::apiResource('blog-ctas', \App\Http\Controllers\Api\Admin\BlogCTAController::class)->parameters(['blog-ctas' => 'cta']);
        Route::apiResource('blog-posts', \App\Http\Controllers\Api\Admin\BlogPostController::class)->parameters(['blog-posts' => 'post']);
        Route::post('blog-posts/{post}/duplicate', [\App\Http\Controllers\Api\Admin\BlogPostController::class, 'duplicate']);
    });
    // E-Commerce Routes
    Route::prefix('store')->group(function () {
        // Cart
        Route::get('cart', [\App\Http\Controllers\Api\Store\CartController::class, 'index']);
        Route::post('cart', [\App\Http\Controllers\Api\Store\CartController::class, 'add']);
        Route::patch('cart/{itemId}', [\App\Http\Controllers\Api\Store\CartController::class, 'updateQuantity']);
        Route::delete('cart/{itemId}', [\App\Http\Controllers\Api\Store\CartController::class, 'remove']);
        Route::delete('cart', [\App\Http\Controllers\Api\Store\CartController::class, 'clear']);

        // Wishlist
        Route::get('wishlist', [\App\Http\Controllers\Api\Store\WishlistController::class, 'index']);
        Route::post('wishlist/toggle', [\App\Http\Controllers\Api\Store\WishlistController::class, 'toggle']);
        Route::get('wishlist/check/{bookId}', [\App\Http\Controllers\Api\Store\WishlistController::class, 'check']);

        // Checkout
        Route::post('checkout/summary', [\App\Http\Controllers\Api\Store\CheckoutController::class, 'summary']);
        Route::post('checkout/process', [\App\Http\Controllers\Api\Store\CheckoutController::class, 'process']);

        // Shipping
        Route::post('shipping/cost', [\App\Http\Controllers\Api\Store\ShippingController::class, 'cost']);

        // Payment
        Route::post('payment/sync/{orderId}', [\App\Http\Controllers\Api\Store\PaymentController::class, 'sync']);

        // Orders
        Route::get('orders', [\App\Http\Controllers\Api\Store\OrderController::class, 'index']);
        Route::get('orders/{id}', [\App\Http\Controllers\Api\Store\OrderController::class, 'show']);

        // Reviews
        Route::get('reviews', [\App\Http\Controllers\Api\Store\ReviewController::class, 'index']);
        Route::post('reviews', [\App\Http\Controllers\Api\Store\ReviewController::class, 'store']);
    });

    // User Dashboard Routes
    Route::prefix('user')->group(function () {
        Route::get('dashboard', [\App\Http\Controllers\Api\User\DashboardController::class, 'summary']);
        Route::put('profile', [\App\Http\Controllers\Api\User\ProfileController::class, 'updateProfile']);
        Route::put('password', [\App\Http\Controllers\Api\User\ProfileController::class, 'updatePassword']);
        Route::apiResource('addresses', \App\Http\Controllers\Api\User\AddressController::class);
        Route::post('orders/{id}/refund', [\App\Http\Controllers\Api\User\OrderController::class, 'requestRefund']);
    });

});

// Public Routes (No authentication required)
Route::prefix('public')->group(function () {
    Route::get('search', [\App\Http\Controllers\Api\Public\SearchController::class, 'index']);
    Route::get('books', [PublicBookController::class, 'index']);
    Route::get('books/{slug}', [PublicBookController::class, 'show']);

    // Blog Module
    Route::get('blog/categories', [\App\Http\Controllers\Api\Public\BlogController::class, 'categories']);
    Route::get('blog/featured', [\App\Http\Controllers\Api\Public\BlogController::class, 'featured']);
    Route::get('blog/popular', [\App\Http\Controllers\Api\Public\BlogController::class, 'popular']);
    Route::get('blog/posts', [\App\Http\Controllers\Api\Public\BlogController::class, 'index']);
    Route::get('blog/posts/{slug}', [\App\Http\Controllers\Api\Public\BlogController::class, 'show']);

    // Reviews
    Route::get('books/{bookId}/reviews', [\App\Http\Controllers\Api\Store\ReviewController::class, 'getProductReviews']);

    // Payment Config
    Route::get('payment/config', [\App\Http\Controllers\Api\Store\PaymentController::class, 'config']);

});

// Midtrans Webhook (no auth, signature verified in service)
Route::post('payment/notification', [\App\Http\Controllers\Api\Store\PaymentController::class, 'notification']);
