<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class AuthorFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->name();
        return [
            'name' => $name,
            'slug' => Str::slug($name . '-' . uniqid()),
            'bio' => $this->faker->paragraph(),
            'photo' => null,
            'website' => $this->faker->url(),
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }
}
