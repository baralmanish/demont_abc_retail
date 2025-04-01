<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category:id,name')->get();

        return Inertia::render('dashboard/products/index', [
            'products' => $products
        ]);
    }

    public function add()
    {
        $categories = Category::orderBy('name', 'asc')->get();

        return Inertia::render('dashboard/products/form', [
            'categories' => $categories
        ]);
    }

    public function edit(Request $request)
    {
        $categories = Category::orderBy('name', 'asc')->get();
        $product = Product::findOrFail($request->id);

        return Inertia::render('dashboard/products/form', [
            'id' => $request->id,
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function create(ProductRequest $request)
    {
        $data = $request->validated();

        // Store new image
        $imagePath = $request->file('image')->storeAs(
            'products',
            time() . '_' . $request->file('image')->getClientOriginalName(),
            'public'
        );
        $data['image'] = asset('storage/' . $imagePath);

        Product::create($data);

        return to_route('dashboard.products')->with('success', 'Product created successfully.');
    }

    public function update(ProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($product->image) {
                $oldImagePath = str_replace(asset('storage/'), '', $product->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            // Store new image
            $imagePath = $request->file('image')->storeAs(
                'products',
                time() . '_' . $request->file('image')->getClientOriginalName(),
                'public'
            );
            $data['image'] = asset('storage/' . $imagePath);
        } else {
            $data['image'] = $product->image;
        }

        $product->update($data);

        return redirect()->route('dashboard.products')->with('success', 'Product updated successfully');
    }

    public function delete(Request $request)
    {
        $id = $request->id;
        $product = Product::findOrFail($id);

        $oldImagePath = str_replace(asset('storage/'), '', $product->image);
        Storage::disk('public')->delete($oldImagePath);

        $product->delete();

        return redirect()->route('dashboard.products')->with('success', 'Product deleted successfully');
    }
}
