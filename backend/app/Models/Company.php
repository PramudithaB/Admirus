<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
     protected $fillable = [
        'name',
        'monthly_posts',
        'monthly_videos',

        // new fields
    'customer_type',
    'primary_contact',
    'sales_person',
    'display_name',
    'email',
    'office_phone',
    'mobile_phone',
    'address',
    'job_card',
    ];
}
