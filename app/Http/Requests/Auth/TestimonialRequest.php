<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('id');

        $validation = [
            'name' => ['required', 'string', 'max:50'],
            'review' => ['required', 'string', 'max:255'],
            'rating' => ['nullable', 'numeric', 'between:1,5'],
            'order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:active,inactive'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif|max:4096']
        ];

        if (!$id) {
            $validation['image'] = ['required', 'image', 'mimes:jpeg,png,jpg,gif|max:4096'];
        }

        return $validation;
    }
}