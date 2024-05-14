import React from "react";
import ProductCard from "@/components/ProductCard.client";
import Header from "@/components/Header.client";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import './globals.css';

export default function Home() {
    return (
        <CartProvider>
        <div className="container mx-auto px-4">
            <Header />
            <div className="mt-12 !important">
                <ProductCard />
            </div>
            <Footer />
        </div>
        </CartProvider>
    );
}