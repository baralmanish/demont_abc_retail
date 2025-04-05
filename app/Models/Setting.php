<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_name',
        'logo_large',
        'logo_small',
        'email',
        'address',
        'phone',
        'opening_hour',
        'meta_title',
        'meta_description',
        'google_site_verification',
        'google_map',
        'google_analytics',
        'head_script',
        'body_script',
        'footer_script',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
