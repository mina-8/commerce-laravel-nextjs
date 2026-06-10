"use client"
import axiosInstance from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';


interface Product {
    id: number;
    name: string;
    description: string;
    category: { name: string };
    brand: { name: string };
    attributes: Record<string, Array<{ id: number; name: string }>>;
    default_variant: { id: number; price: string; sku: string; images: string };
    variants_map: Record<string, { id: number; price: string; sku: string; images: string; is_default: number }>;
}

const ProductPage = () => {
    const {user } = useAuth();
    const {addToCart} = useCart()
    const router = useRouter();
    const params = useParams<{ slug: string }>();
    const slug = params.slug;
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [currentVariant, setCurrentVariant] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (!slug) return;

        const fetchProduct = async () => {
            try {
                const res = await axiosInstance.get(`/product/${slug}`);
                setProduct(res.data);

                // Set initial selections from attributes
                if (res.data.attributes.Color?.[0]) {
                    setSelectedColor(res.data.attributes.Color[0].id);
                }
                if (res.data.attributes.Size?.[0]) {
                    setSelectedSize(res.data.attributes.Size[0].id);
                }
                setCurrentVariant(res.data.default_variant);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [slug]);

    // Update variant when selections change
    useEffect(() => {
        if (!product || !selectedColor || !selectedSize) return;

        const variantKey = `${selectedColor}-${selectedSize}`;
        const variant = product.variants_map[variantKey] || product.default_variant;
        setCurrentVariant(variant);
    }, [selectedColor, selectedSize, product]);

    if (!product) {
        return <div className="p-8">Loading...</div>;
    }

    const BuyNow = () => {
        if(!user){
            router.push(`/login?redirect=/checkout/${slug}`);
            return;
        }

        if(!currentVariant){
            return;
        }

        router.push(`/checkout/${slug}?variant=${currentVariant.id}&quantity=${quantity}`);
    }


    return (
        <div className="min-h-screen ">
            <div className="max-w-3xl lg:max-w-7xl w-full mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="flex items-center justify-center rounded-lg h-96 md:h-full">
                        {currentVariant?.images && (
                            <Image
                                src={currentVariant.images}
                                alt={product.name}
                                width={400}
                                height={400}
                                className="object-cover rounded-lg"
                            />
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-start">
                        {/* Brand and Category */}
                        <div className="flex gap-4 mb-4">
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                                {product.brand.name}
                            </span>
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                                {product.category.name}
                            </span>
                        </div>

                        {/* Product Title */}
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                        {/* Description */}
                        <p className="text-gray-600 text-lg mb-6">{product.description}</p>

                        {/* Price */}
                        <div className="text-3xl font-bold text-blue-600 mb-6">
                            ${parseFloat(currentVariant?.price || 0).toFixed(2)}
                        </div>

                        {/* Attributes */}
                        <div className="space-y-6">
                            {/* Color Selection */}
                            {product.attributes.Color && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Color</h3>
                                    <div className="flex gap-3 flex-wrap">
                                        {product.attributes.Color.map((color) => (
                                            <Button
                                                key={color.id}
                                                onClick={() => setSelectedColor(color.id)}
                                                className={`px-4 py-2 rounded border-2 transition-all ${selectedColor === color.id
                                                        ? 'border-blue-600 text-white font-semibold dark:bg-gray-800'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                {color.name}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection */}
                            {product.attributes.Size && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Size</h3>
                                    <div className="flex gap-3 flex-wrap">
                                        {product.attributes.Size.map((size) => (
                                            <Button
                                                key={size.id}
                                                onClick={() => setSelectedSize(size.id)}
                                                className={`px-4 py-2 rounded border-2 transition-all ${selectedSize === size.id
                                                        ? 'border-blue-600 text-white font-semibold dark:bg-gray-800'
                                                        : 'border-gray-500 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                                                    }`}
                                            >
                                                {size.name}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SKU */}
                        <div className="mt-8 p-4 bg-gray-50 rounded">
                            <p className="text-sm text-gray-600">SKU: <span className="font-mono font-semibold">{currentVariant?.sku}</span></p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer transition-colors font-semibold"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 h-10 border border-gray-300 rounded-lg text-center font-semibold"
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer  transition-colors font-semibold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-center w-full my-4 gap-3"
                        >
                            {/* Add to Cart Button */}
                            <Button
                                // className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                className="cursor-pointer"
                                onClick={()=>addToCart(currentVariant.id , quantity)}
                            >
                                Add to Cart 
                            </Button>
                            <Button
                                className="cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                onClick={BuyNow}
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage