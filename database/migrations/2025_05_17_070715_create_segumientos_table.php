<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seguimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seguidor_id')->constrained('users')->onDelete('cascade'); // Usuario que sigue
            $table->foreignId('seguido_id')->constrained('users')->onDelete('cascade'); // Usuario seguido
            $table->timestamps();
            $table->unique(['seguidor_id', 'seguido_id']); // Evitar seguimientos duplicados
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('segumientos');
    }
};
