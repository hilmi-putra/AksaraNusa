<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class GenreFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->word();
        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name . '-' . uniqid()),
            'description' => $this->faker->sentence(),
        ];
    }
}
