<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        DB::statement("
            ALTER TABLE tasks 
            MODIFY COLUMN status ENUM('assigned','doing','submitted','completed') 
            NOT NULL DEFAULT 'assigned'
        ");
    }

    public function down()
    {
        DB::statement("
            ALTER TABLE tasks 
            MODIFY COLUMN status ENUM('assigned','completed') 
            NOT NULL DEFAULT 'assigned'
        ");
    }
};
