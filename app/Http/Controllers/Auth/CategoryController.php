<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CategoryRequest;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('dashboard/categories/index', [
            'categories' => $categories
        ]);
    }

    public function add()
    {
        return Inertia::render('dashboard/categories/form');
    }

    public function edit(Request $request)
    {
        $category = Category::findOrFail($request->id);

        return Inertia::render('dashboard/categories/form', [
            'id' => $request->id,
            'category' => $category
        ]);
    }

    public function create(CategoryRequest $request)
    {
        $data = $request->validated();

        $imagePath = $request->file('image')->storeAs(
            'categories',
            time() . '_' . $request->file('image')->getClientOriginalName(),
            'public'
        );
        $data['image'] = asset('storage/' . $imagePath);

        Category::create($data);

        return to_route('dashboard.categories')->with('success', 'Category created successfully.');
    }

    public function update(CategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);

        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($category->image) {
                $oldImagePath = str_replace(asset('storage/'), '', $category->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            // Store new image
            $imagePath = $request->file('image')->storeAs(
                'categories',
                time() . '_' . $request->file('image')->getClientOriginalName(),
                'public'
            );
            $data['image'] = asset('storage/' . $imagePath);
        } else {
            $data['image'] = $category->image;
        }

        $category->update($data);

        return redirect()->route('dashboard.categories')->with('success', 'Category updated successfully');
    }

    public function delete(Request $request)
    {
        $id = $request->id;
        $category = Category::findOrFail($id);

        $oldImagePath = str_replace(asset('storage/'), '', $category->image);
        Storage::disk('public')->delete($oldImagePath);

        $category->delete();

        return redirect()->route('dashboard.categories')->with('success', 'Category deleted successfully');
    }
}
