<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->enum('customer_type', ['business', 'individual'])->default('business')->after('name');
            $table->string('primary_contact')->nullable()->after('customer_type');
            $table->string('sales_person')->nullable()->after('primary_contact');
            $table->string('display_name')->nullable()->after('sales_person');
            $table->string('email')->nullable()->after('display_name');
            $table->string('office_phone')->nullable()->after('email');
            $table->string('mobile_phone')->nullable()->after('office_phone');
            $table->text('address')->nullable()->after('mobile_phone');
            $table->text('job_card')->nullable()->after('address');
        });
    }

    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn([
                'customer_type',
                'primary_contact',
                'sales_person',
                'display_name',
                'email',
                'office_phone',
                'mobile_phone',
                'address',
                'job_card',
            ]);
        });
    }
};
