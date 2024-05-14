"use client";

import React, { useEffect, useState} from "react";
import Link from "next/link";

function ProductCard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products/api')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    throw new Error('Data is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setProducts([]);
            })
    }, []);

    return (
        <div className="grid grid-cols-4 gap-1">
            {products.map(product => (
                <Link key={product.id} href={`/product/${product.id}`} className="no-underline block">
                <div className="card bg-white p-4 shadow flex flex-col cursor-pointer">
                        <img src={product.image[0]} alt={product.name} className="img-hover-zoom items-center mx-auto max-w-full pt-4" width={220} />
                    <div className="pl-7 pr-7 pt-3 text-left">
                        <div className="font-semibold text-gray-800">{product.name}</div>
                        <div className="font-semibold text-gray-800">¥{product.price}</div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    );
}

export default ProductCard;