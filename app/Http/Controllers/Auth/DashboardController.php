<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\SocialLink;

class DashboardController extends Controller
{
    public function index()
    {
        $orders = Order::getOrders();
        
        if (Auth::user()->role === 'ADMIN') {
            $totalCategories = Category::count();
            $totalProducts = Product::count();
            $totalOrder = $orders->count();

            return Inertia::render('dashboard/index', [
                'totalCategories' => $totalCategories,
                'totalProducts' => $totalProducts,
                'totalOrder' => $totalOrder,
                'orders' => $orders,
            ]);
        } else {

            return Inertia::render('dashboard/index_user', [
                'orders' => $orders,
            ]);
        }

    }

    public function products()
    {
        $products = Product::with(['category'])->get();

        return Inertia::render('dashboard/products', [
            'products' => $products
        ]);
    }

    public function order($id)
    {
        $orderData = Order::with('orderItems.product', 'payment')->findOrFail($id);
        $orderData['ordered_by'] = $orderData->user->name;
        $orderData['quantity'] = $orderData->orderItems->sum('quantity');
        $orderData['total_price'] = $orderData->total_price_formatted;
        $orderData['order_date'] = $orderData->created_at->format('Y-m-d H:i:s');

        return Inertia::render('dashboard/order', [
            'order' => $orderData
        ]);
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $orderData = Order::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        // Update only the status field
        $orderData->update($validatedData);

        return Inertia::location(route('dashboard.order', ['id' => $id]));
    }

    public function updatePaymentStatus(Request $request, $id, $paymentId)
    {
        $paymentData = Payment::findOrFail($paymentId);

        // Validate the request data
        $validatedData = $request->validate([
            'payment_status' => 'required|in:pending,paid,failed',
        ]);

        // Update only the status field
        $paymentData->update($validatedData);

        return Inertia::location(route('dashboard.order', ['id' => $id]));
    }

    public function seo()
    {
        return Inertia::render('dashboard/seo');
    }

    public function socialLinks()
    {
        $socialLink = SocialLink::first();

        return Inertia::render('dashboard/social-links', [
            'socialLink' => $socialLink
        ]);
    }

    public function socialLinksUpdate(Request $request)
    {
        $socialLink = SocialLink::first();

        $validatedData = $request->validate([
            'facebook' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
            'instagram' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
            'twitter' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
            'youtube' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
            'linkedin' => 'nullable|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/|max:255',
        ]);


        $socialLink->update($validatedData);

        return redirect()->route('dashboard.socialLinks')->with('success', 'Social links updated successfully');
    }
}