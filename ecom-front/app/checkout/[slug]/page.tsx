"use client"
import axiosInstance from '@/lib/axios';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Checkout = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const productId = params.slug;
    const variantId = searchParams.get("variant");
    const quantity = searchParams.get("quantity");

    const items = [
        {
            variant_id: variantId,
            quantity: quantity
        }
    ]
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    useEffect(() => {

        const checkoutPreview = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.post('/checkout/preview', { items });
                setProduct(res.data);
                setLoading(false);
                console.log("Checkout preview data:", res.data);
            } catch (err) {
                setLoading(false);
                console.error("Checkout preview error:", err.response?.data || err.message);
            }
        }
        checkoutPreview();
    }, [productId, variantId]);

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
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto  rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold  mb-8">Order Summary</h1>
                
                {product ? (
                    <div>
                        {/* Items Table */}
                        <div className="overflow-x-auto mb-8">
                            <table className="w-full">
                                <thead className=" border-b ">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold ">Product Name</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold ">Price</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold ">Quantity</th>
                                        <th className="px-6 py-3 text-right text-sm font-semibold ">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {product.items.map((item, index) => (
                                        <tr key={index} className="">
                                            <td className="px-6 py-4 text-sm ">{item.product_name}</td>
                                            <td className="px-6 py-4 text-sm ">${parseFloat(item.price).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-sm ">{item.quantity}</td>
                                            <td className="px-6 py-4 text-sm text-right ">${parseFloat(item.total).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Grand Total */}
                        <div className="flex justify-end mb-8 border-t pt-6">
                            <div className="w-64">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xl font-bold ">Grand Total:</span>
                                    <span className="text-2xl font-bold text-blue-600">${parseFloat(product.grand_total).toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        console.log("Processing payment for:", product);
                                        // Add payment processing logic here
                                    }}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No items to display</p>
                )}
            </div>
        </div>
    )
}

export default Checkout