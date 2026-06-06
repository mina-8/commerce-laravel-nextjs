"use client"
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import Productcard from '../product-card';
import { barnds, ProductPagination , categories } from '@/types/product';
import PaginationPage from '../pagination-page';
import { Button } from '../ui/button';


const Home = () => {
    const [products, setProducts] = useState<ProductPagination | null>(null);
    const [categories, setCategories] = useState<categories>([]);
    const [brands, setBrands] = useState<barnds>([]);
    const [loading, setLoading] = useState(false);
    const [page , setPage] = useState(1);
    const [brandId , setBrandId] = useState<number | null>(null);
    const [categoryId , setCategoryId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async (page = 1) => {
            setLoading(true);
            try {
                const res = await axiosInstance.get("/home" , {
                    params:{
                        page,
                        brand: brandId,
                        category:categoryId
                    }
                })
                console.log(res.data);
                setProducts(res.data.products);
                setCategories(res.data.categories);
                setBrands(res.data.brands);
                setLoading(false);
            } catch (error) {
                const err = error as AxiosError<{ message: string }>;
                setLoading(false);
                console.log(err.response?.data);
            }
        }
        fetchData(page);
    }, [page, brandId, categoryId]);

    

    if (loading) {
        return <div
            className="flex items-center justify-center flex-col text-2xl font-bold w-full"
        >

            <svg
                className="w-24 h-24 animate-spin text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >

                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
            <span>
                Loading...
            </span>
        </div>
    }

    return (
        <div
            className="relative w-full"
        >
            <div
                // className="sticky top-20 z-50 flex flex-col "
            >
                <h2 className="text-2xl font-bold ">Category</h2>
                <div
                    className="flex items-center gap-4 overflow-x-auto py-2"
                >
                    <Button
                    variant= {categoryId === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {setCategoryId(null)}}
                    >
                        All
                    </Button>
                    {Array.isArray(categories) &&
                        categories.map((category: categories[0]) => (
                            <Button
                            className="cursor-pointer"
                            variant={categoryId === category.id ? "default" : "outline"}
                            onClick={() => {
                                setCategoryId(category.id)
                                setPage(1);
                            }}
                            key={category.id}>
                                <h2 className="text-lg font-semibold">{category.name}</h2>
                            </Button>
                        ))}

                </div>
                <h2 className="text-2xl font-bold ">Brands</h2>
                <div
                    className="flex items-center gap-4 overflow-x-auto py-2"
                >
                    <Button
                    variant= {brandId === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {setBrandId(null)}}
                    >
                        All
                    </Button>
                    {Array.isArray(brands) &&
                        brands.map((brand: barnds[0]) => (
                            <Button key={brand.id} 
                            className="cursor-pointer"
                            variant={brandId === brand.id ? "default" : "outline"}
                            onClick={() => {
                                setBrandId(brand.id)
                                setPage(1);
                            }}
                            >
                                <h2 className="text-lg font-semibold">{brand.name}</h2>
                            </Button>
                        ))}
                </div>
            </div>
            
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
                {Array.isArray(products?.data) && 
                    products?.data.map((product: ProductPagination['data'][0]) => (
                        <Productcard
                        key={product.id}
                        product={product} />
                    ))
                }
                
            </div>

                <div
                className="my-4"
                >
            <PaginationPage 
            paginations={products}
            onPageChange={(page) => setPage(page)}
            />

            </div>
            
        </div>
    )
}

export default Home