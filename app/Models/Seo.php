<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seo extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
        'meta_title',
        'meta_description'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
