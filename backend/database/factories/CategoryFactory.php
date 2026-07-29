<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->words(2, true);
        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name . '-' . uniqid()),
            'description' => $this->faker->sentence(),
            'image' => null,
        ];
    }
}
