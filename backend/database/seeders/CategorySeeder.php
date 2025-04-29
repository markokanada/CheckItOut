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
            ["id" => 1, "category_name" => "Tanulás", "lang" => "hu", "user_id"=>1],
            ["id" => 2, "category_name" => "Házi feladat", "lang" => "hu", "user_id"=>1],
            ["id" => 3, "category_name" => "Vizsgafelkészülés", "lang" => "hu", "user_id"=>1],
            ["id" => 4, "category_name" => "Kutatás", "lang" => "hu", "user_id"=>1],
            ["id" => 5, "category_name" => "Olvasás", "lang" => "hu", "user_id"=>1],
            ["id" => 6, "category_name" => "Gyakorlás", "lang" => "hu", "user_id"=>1],
            ["id" => 7, "category_name" => "Projektmunka", "lang" => "hu", "user_id"=>1],
            ["id" => 8, "category_name" => "Előadáskészítés", "lang" => "hu", "user_id"=>1],
            ["id" => 9, "category_name" => "Csoportmunka", "lang" => "hu", "user_id"=>1],
            ["id" => 10, "category_name" => "Feladatmegoldás", "lang" => "hu", "user_id"=>1],

            ["id" => 11, "category_name" => "Learning", "lang" => "en", "user_id"=>1],
            ["id" => 12, "category_name" => "Homework", "lang" => "en", "user_id"=>1],
            ["id" => 13, "category_name" => "Exam preparation", "lang" => "en","user_id"=>1],
            ["id" => 14, "category_name" => "Research", "lang" => "en","user_id"=>1],
            ["id" => 15, "category_name" => "Reading", "lang" => "en","user_id"=>1],
            ["id" => 16, "category_name" => "Practice", "lang" => "en","user_id"=>1],
            ["id" => 17, "category_name" => "Project work", "lang" => "en","user_id"=>1],
            ["id" => 18, "category_name" => "Presentation preparation", "lang" => "en","user_id"=>1],
            ["id" => 19, "category_name" => "Group work", "lang" => "en","user_id"=>1],
            ["id" => 20, "category_name" => "Problem solving", "lang" => "en","user_id"=>1],
        ]);
    }
}
