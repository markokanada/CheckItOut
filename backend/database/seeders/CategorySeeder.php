<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ["id" => 1, "category_name" => "Tanulás", "lang" => "hu"],
            ["id" => 2, "category_name" => "Házi feladat", "lang" => "hu"],
            ["id" => 3, "category_name" => "Vizsgafelkészülés", "lang" => "hu"],
            ["id" => 4, "category_name" => "Kutatás", "lang" => "hu"],
            ["id" => 5, "category_name" => "Olvasás", "lang" => "hu"],
            ["id" => 6, "category_name" => "Gyakorlás", "lang" => "hu"],
            ["id" => 7, "category_name" => "Projektmunka", "lang" => "hu"],
            ["id" => 8, "category_name" => "Előadáskészítés", "lang" => "hu"],
            ["id" => 9, "category_name" => "Csoportmunka", "lang" => "hu"],
            ["id" => 10, "category_name" => "Feladatmegoldás", "lang" => "hu"],

            ["id" => 11, "category_name" => "Learning", "lang" => "en"],
            ["id" => 12, "category_name" => "Homework", "lang" => "en"],
            ["id" => 13, "category_name" => "Exam preparation", "lang" => "en"],
            ["id" => 14, "category_name" => "Research", "lang" => "en"],
            ["id" => 15, "category_name" => "Reading", "lang" => "en"],
            ["id" => 16, "category_name" => "Practice", "lang" => "en"],
            ["id" => 17, "category_name" => "Project work", "lang" => "en"],
            ["id" => 18, "category_name" => "Presentation preparation", "lang" => "en"],
            ["id" => 19, "category_name" => "Group work", "lang" => "en"],
            ["id" => 20, "category_name" => "Problem solving", "lang" => "en"],
        ]);
    }
}
