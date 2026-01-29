<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;   // ✅ ADD THIS


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    DB::statement("ALTER TABLE posts MODIFY COLUMN status 
        ENUM('scheduled','published','delivered','deleted') 
        NOT NULL");
}

public function down()
{
    DB::statement("ALTER TABLE posts MODIFY COLUMN status 
        ENUM('scheduled','published','deleted') 
        NOT NULL");
}

};
