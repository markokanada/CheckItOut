<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;

class CreateDefaultCategoriesForUser
{
    public function handle(Registered $event): void
    {
        $user = $event->user;

        $defaultCategories = [
            ["category_name" => "Tanulás", "lang" => "hu"],
            ["category_name" => "Házi feladat", "lang" => "hu"],
            ["category_name" => "Vizsgafelkészülés", "lang" => "hu"],
            ["category_name" => "Kutatás", "lang" => "hu"],
            ["category_name" => "Olvasás", "lang" => "hu"],
            ["category_name" => "Gyakorlás", "lang" => "hu"],
            ["category_name" => "Projektmunka", "lang" => "hu"],
            ["category_name" => "Előadáskészítés", "lang" => "hu"],
            ["category_name" => "Csoportmunka", "lang" => "hu"],
            ["category_name" => "Feladatmegoldás", "lang" => "hu"],

            ["category_name" => "Learning", "lang" => "en"],
            ["category_name" => "Homework", "lang" => "en"],
            ["category_name" => "Exam preparation", "lang" => "en"],
            ["category_name" => "Research", "lang" => "en"],
            ["category_name" => "Reading", "lang" => "en"],
            ["category_name" => "Practice", "lang" => "en"],
            ["category_name" => "Project work", "lang" => "en"],
            ["category_name" => "Presentation preparation", "lang" => "en"],
            ["category_name" => "Group work", "lang" => "en"],
            ["category_name" => "Problem solving", "lang" => "en"],
        ];

        foreach ($defaultCategories as $category) {
            \App\Models\Category::firstOrCreate([
                'category_name' => $category['category_name'],
                'lang' => $category['lang'],
                'user_id' => $user->id,
            ]);
        }
    }
}
