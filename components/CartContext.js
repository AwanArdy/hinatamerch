"use client";

import React, { createContext, useContext, useReducer } from "react";

const initialState = {
    items: [],
    total: 0
};

const CartContext = createContext(initialState);

function cartReducer(state, action) {
    console.log("Action received:", action);
    switch (action.type) {
        case 'ADD_ITEM':
            console.log('Item added to cart:', action.payload);
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (itemIndex >= 0) {
                let newItems = [...state.items];
                newItems[itemIndex] = {
                    ...newItems[itemIndex],
                    quantity: newItems[itemIndex].quantity + 1
                };
                return {
                    ...state,
                    items: newItems,
                    total: state.total + action.payload.price
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                    total: state.total + action.payload.price
                };
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
                total: state.total - (action.payload.price * action.payload.quantity),
            };
        default:
            return state;
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    console.log("CartProvider state:", state);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);