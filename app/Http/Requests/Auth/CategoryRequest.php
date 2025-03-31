<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            'description' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp,svg|max:4096']
        ];

        if (!$id) {
            $validation['image'] = ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp,svg|max:4096'];
        }

        // if ($id) {
        // Healthy and nutritious almonds.
        //     // $validation['image'] = ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp,svg|max:4096'];
        // } else {
        //     $validation['image'] = ['required'];
        // }

        return $validation;
    }
}
