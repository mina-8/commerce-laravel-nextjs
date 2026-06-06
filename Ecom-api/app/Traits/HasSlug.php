<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    /**
     * Boot trait
     */
    protected static function bootHasSlug()
    {
        static::creating(function ($model) {
            $model->generateSlug();
        });
    }

    /**
     * Generate slug
     */
    protected function generateSlug() : void
    {
        if (!empty($this->slug)) {
            return;
        }

        $title = $this->getSlugSource();

        $slug = Str::slug($title);

        if (!$slug) {
            $slug = static::getSlugPrefix() . Str::random(8);
        }

        $original = $slug;
        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $original . '-' . $count++;
        }

        $this->slug = $slug;
    }

    /**
     * مصدر الـ slug (يدعم multi-language)
     */
    protected function getSlugSource(): string
    {
        if (method_exists($this, 'getTranslation')) {
            return $this->getTranslation('title', 'en')
                ?: $this->getTranslation('title', 'ar');
        }

        return $this->title ?? $this->name ?? '';
    }

    /**
     * Prefix لكل Model (اختياري override)
     */
    protected static function getSlugPrefix(): string
    {
        return '';
    }

    /**
     * Route model binding باستخدام slug
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
