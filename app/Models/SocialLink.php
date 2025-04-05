<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'facebook',
        'instagram',
        'twitter',
        'youtube',
        'whatsapp',
        'linkedin'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
