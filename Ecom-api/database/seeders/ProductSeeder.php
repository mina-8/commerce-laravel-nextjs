<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create categories
        $categories = [
            ['name' => 'Men'],
            ['name' => 'Women'],
            ['name' => 'Kids'],
        ];

        $categoryModels = [];
        foreach ($categories as $category) {
            $cat = Category::firstOrCreate(
                ['slug' => Str::slug($category['name'])],
                ['name' => $category['name']]
            );
            $categoryModels[$category['name']] = $cat;
        }

        // Create brands
        $brands = [
            ['name' => 'Nike'],
            ['name' => 'puma'],
        ];

        $brandModels = [];
        foreach ($brands as $brand) {
            $br = Brand::firstOrCreate(
                ['slug' => 'brand-' . Str::slug($brand['name'])],
                ['name' => $brand['name']]
            );
            $brandModels[$brand['name']] = $br;
        }

        // Create attributes
        $attributeData = [
            'Color' => ['Red', 'Blue', 'Black', 'White', 'Green'],
            'Size' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            'Material' => ['Cotton', 'Polyester', 'Wool', 'Silk'],
        ];

        $attributes = [];
        foreach ($attributeData as $attrName => $values) {
            $attr = Attribute::create(['name' => $attrName]);
            $attributes[$attrName] = $attr;

            foreach ($values as $value) {
                AttributeValue::create([
                    'attribute_id' => $attr->id,
                    'name' => $value,
                ]);
            }
        }

        // Create products for each category and brand
        $products = [
            'Nike' => [
                ['name' => 'Nike Air Max 90', 'description' => 'Classic running shoe with excellent cushioning'],
                ['name' => 'Nike React Infinity Run', 'description' => 'Advanced running technology for comfort'],
                ['name' => 'Nike Air Force 1', 'description' => 'Iconic basketball-inspired shoe'],
            ],
            'puma' => [
                ['name' => 'puma Galaxy A50', 'description' => 'Affordable smartphone with great features'],
                ['name' => 'puma Galaxy S21', 'description' => 'Premium flagship smartphone'],
                ['name' => 'puma Galaxy Z Fold 3', 'description' => 'Innovative foldable smartphone'],
            ],
        ];

        $productVariantMap = [];

        foreach ($categoryModels as $categoryName => $category) {
            foreach ($brandModels as $brandName => $brand) {
                $productList = $products[$brandName] ?? [];

                foreach ($productList as $productData) {
                    // Check if product already exists by slug
                    $slug = Str::slug($productData['name']);
                    $product = Product::where('slug', $slug)->first();

                    if (!$product) {
                        $product = new Product();
                        $product->category_id = $category->id;
                        $product->brand_id = $brand->id;
                        $product->name = $productData['name'];
                        $product->description = $productData['description'];
                        $product->slug = $slug;
                        $product->save();
                    }

                    // Create product variants with different attributes
                    $colorAttr = $attributes['Color'] ?? null;
                    $sizeAttr = $attributes['Size'] ?? null;

                    $colors = $colorAttr ? $colorAttr->values->pluck('id')->toArray() : [];
                    $sizes = $sizeAttr ? $sizeAttr->values->take(3)->pluck('id')->toArray() : [];

                    foreach ($colors as $colorId) {
                        foreach ($sizes as $sizeId) {
                            $variant = ProductVariant::create([
                                'product_id' => $product->id,
                                'price' => fake()->randomFloat(2, 20, 500),
                                'sku' => 'SKU-' . Str::random(10),
                                'images' => $this->getImagePath($brandName),
                                'is_default' => false,
                            ]);

                            // Attach attributes
                            $variant->attributeValues()->attach([$colorId, $sizeId]);

                            // Create inventory
                            Inventory::create([
                                'product_variant_id' => $variant->id,
                                'quantity' => fake()->numberBetween(10, 500),
                                'reserved_quantity' => 0,
                            ]);

                            $productVariantMap[$variant->id] = $variant;
                        }
                    }

                    // Make first variant the default
                    if ($product->productVariants()->exists()) {
                        $product->productVariants()->first()->update(['is_default' => true]);
                    }
                }
            }
        }

        $this->command->info('✓ Categories created: ' . count($categoryModels));
        $this->command->info('✓ Brands created: ' . count($brandModels));
        $this->command->info('✓ Attributes created: ' . count($attributes));
        $this->command->info('✓ Products and variants created with inventory!');
    }

    /**
     * Generate a placeholder image path
     * You can replace these with actual image URLs or paths
     */
    // private function getImagePath(string $brandName): string
    // {
    //     // Use placeholder images from a free service
    //     $brandImages = [
    //         'Nike' => 'https://via.placeholder.com/500x500?text=Nike+Product',
    //         'puma' => 'https://via.placeholder.com/500x500?text=puma+Product',
    //     ];

    //     return $brandImages[$brandName] ?? 'https://via.placeholder.com/500x500?text=Product';
    // }

    private function getImagePath(string $brandName): string
{
    $images = [
        'Nike' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        'puma' => 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
    ];

    return $images[$brandName] ?? 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab';
}
}
