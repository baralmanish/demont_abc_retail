<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'description' => ['required', 'string', 'max:255'],
            'price' => ['nullable', 'numeric', 'min:1'],
            'category_id' => ['required', 'exists:categories,id'],
            'status' => ['required', 'in:active,inactive'],
            'image' => [$id ? 'nullable' : 'required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:4096']
        ];

        return $validation;
    }
}
