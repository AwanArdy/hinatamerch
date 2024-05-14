import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import productsData from '../../backend/products.json';
import Header from "@/components/Header.client";
import { useCart } from "@/components/CartContext";
import '/app/globals.css';

const ProductDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const { dispatch } = useCart();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (!router.isReady) return;
    
        const productFound = productsData.find(p => p.id.toString() === id);
        console.log('Product Found:', productFound); // Debugging: Cek produk yang ditemukan
        if (productFound) {
            console.log('Images:', productFound.image); // Debugging: Cek array gambar
            setProduct(productFound);
            setTotalPrice(productFound.price);
            if (productFound.image.length > 0) {
                setMainImage(productFound.image[0]);
            }
        }
    }, [id, router.isReady]);

    useEffect(() => {
        if (product) {
            setTotalPrice(quantity * product.price);
        }
    }, [quantity, product]);
    
    if (!product) {
        console.log('Product is still loading or not found'); // Debugging: Cek jika produk masih loading atau tidak ditemukan
        return <div>Loading...</div>;
    }

    const addItemToCart = () => {
        console.log('Adding item with quantity:', quantity, 'and total price:', totalPrice);
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                image: mainImage,
                quantity: quantity
            }
        });
        router.push('/cart');
    }

    const handleImageChange = (src) => {
        setMainImage(src);
    };

    const handleIncrease = () => {
        setQuantity(prev => {
            const newQuantity = prev + 1;
            setTotalPrice(newQuantity * product.price);
            return newQuantity;
        });
    };

    const handleDecrease = () => {
        setQuantity(prev => {
                const newQuantity = Math.max(1, prev - 1);
                setTotalPrice(newQuantity * product.price);
                return newQuantity;
        });
    };
    
    return (
        <>
        <div className="container mx-auto px-4">
        <Header />
        <div className="container mx-auto mt-10">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row relative">
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center">
                    <img src={mainImage} alt={product ? product.name : 'Product'} className="w-full h-auto max-h-[380px] max-w-[380px]" />
                    <div className="flex justify-center mt-4">
                        {product.image && product.image.map((img, index) => (
                            <img key={index} src={img} alt="Product Thumbnail" 
                                className="w-20 h-20 p-1 cursor-pointer" 
                                onMouseEnter={() => handleImageChange(img)} />
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <h2 className="text-xl mt-2 font-semibold">¥{product.price}</h2>
                    <div className="mt-4">
                        <p className="font-semibold">Material:</p>
                        <p>{product.details.Material}</p>
                        <p className="font-semibold mt-2">Size:</p>
                        {product.type === "shirt" ? (
                            <>
                                <p>{product.details.Size.availableSizes.join(' / ')}</p>
                                {Object.keys(product.details.Size.dimensions).map((key) => (
                                    <div key={key}>
                                        <p className="font-semibold">{key} (cm):</p>
                                        <p>{product.details.Size.dimensions[key].join(' / ')}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>{product.details.Size}</p>
                        )}
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 p-4">
                <div className="flex flex-col items-center" style={{ minWidth: '200px'}}>
                    <div className="flex">
                        <button onClick={handleDecrease} className="px-3 py-2 text-lg border">-</button>
                        <span className="px-4 py-4">{quantity}</span>
                        <button onClick={handleIncrease} className="px-3 py-2 text-lg border">+</button>
                    </div>
                    <p className="text-xl mt-2">Total: ¥{totalPrice}</p>
                </div>
                <div className="pl-16 mt-2">
                    <button onClick={addItemToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                        +Cart
                    </button> 
                </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </>
    );
};

export default ProductDetail;