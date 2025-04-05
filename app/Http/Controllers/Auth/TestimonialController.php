<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Auth\TestimonialRequest;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::all();

        return Inertia::render('dashboard/testimonials/index', [
            'testimonials' => $testimonials
        ]);
    }

    public function add()
    {
        return Inertia::render('dashboard/testimonials/form');
    }

    public function edit(Request $request)
    {
        $testimonial = Testimonial::findOrFail($request->id);

        return Inertia::render('dashboard/testimonials/form', [
            'id' => $request->id,
            'testimonial' => $testimonial
        ]);
    }

    public function create(TestimonialRequest $request)
    {
        $data = $request->validated();

        // Store new image
        $imagePath = $request->file('image')->storeAs(
            'testimonials',
            time() . '_' . $request->file('image')->getClientOriginalName(),
            'public'
        );
        $data['image'] = asset('storage/' . $imagePath);

        Testimonial::create($data);

        return to_route('dashboard.testimonials')->with('success', 'Testimonial created successfully.');
    }

    public function update(TestimonialRequest $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($testimonial->image) {
                $oldImagePath = str_replace(asset('storage/'), '', $testimonial->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            // Store new image
            $imagePath = $request->file('image')->storeAs(
                'testimonials',
                time() . '_' . $request->file('image')->getClientOriginalName(),
                'public'
            );
            $data['image'] = asset('storage/' . $imagePath);
        } else {
            $data['image'] = $testimonial->image;
        }

        $testimonial->update($data);

        return redirect()->route('dashboard.testimonials')->with('success', 'Testimonial updated successfully');
    }

    public function delete(Request $request)
    {
        $id = $request->id;
        $testimonial = Testimonial::findOrFail($id);

        $oldImagePath = str_replace(asset('storage/'), '', $testimonial->image);
        Storage::disk('public')->delete($oldImagePath);

        $testimonial->delete();

        return redirect()->route('dashboard.testimonials')->with('success', 'Testimonial deleted successfully');
    }
}
