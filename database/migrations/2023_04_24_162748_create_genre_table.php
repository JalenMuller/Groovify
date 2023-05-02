<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table->string("name");
        });
        DB::table('genres')->insert(
            array(
                'name' => "Blues"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Classical"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Country"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Hip-Hop"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Electronic"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Folk"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Hip-Hop"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Pop"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Reggae"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Rock"
            )
        );
        DB::table('genres')->insert(
            array(
                'name' => "Other"
            )
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('genres');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
};