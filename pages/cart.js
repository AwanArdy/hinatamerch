import React from "react";
import Link from "next/link";
import OtherHeader from "@/components/Header";
import { useCart } from "@/components/CartContext"; // Pastikan path ini sesuai dengan lokasi file CartContext
import "/app/globals.css";

function Cart() {
  const context = useCart();
  console.log("Cart context:", context);
  if (!context) {
    return <div>Loading...</div>;
  }

  const { state, dispatch } = useCart();
  if (!state) {
    console.log("State is undefined!");
    return <div>Loading...</div>;
  }

  const { items, total } = state;
  console.log("Total is: ", total);

  // Fungsi untuk menghapus item dari keranjang
  const removeItemFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  return (
    <div className="container mx-auto px-4">
      <OtherHeader />
      <div className="cart-container">
        <div className="cart-items rounded-lg">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="cart-item flex">
                <img src={item.image} alt={item.name} className="w-20 h-20 mr-4" />
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                <button onClick={() => removeItemFromCart(item.id, item)}>
                  Remove
                </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="cart-summary">
          <h3>Total: ¥{typeof total === 'number' ? total.toFixed(2) : '0.00'}</h3>
          <Link href="/checkout" legacyBehavior>
            <a className="buy-button">Proceed to Checkout</a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="continue-shopping">Continue Shopping</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
