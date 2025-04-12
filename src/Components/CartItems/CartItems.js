import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";
import { db } from "../FirebaseAuth/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate();
    const auth = getAuth();
    const [user, setUser] = useState(null);

    // ✅ Track logged-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    // ✅ Filter cart items only for logged-in user
    const userCartItems = user ? cartItems : {};

    // ✅ Checkout function
    const handleCheckout = async () => {
        try {
            const cartData = Object.keys(userCartItems)
                .map((itemId) => {
                    const product = all_product.find((e) => e.id === Number(itemId));
                    if (!product) return null;

                    return {
                        id: product.id,
                        name: product.name,
                        price: product.new_price,
                        quantity: userCartItems[itemId],
                        total: product.new_price * userCartItems[itemId],
                    };
                })
                .filter(Boolean); // Remove null values

            if (cartData.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            // ✅ Save order to Firestore
            await addDoc(collection(db, "orders"), {
                userId: user.uid, // ✅ Save user ID
                items: cartData,
                timestamp: serverTimestamp(),
            });

            navigate("/place-order");
        } catch (error) {
            console.error("Error saving order:", error);
            alert("Something went wrong! Please try again.");
        }
    };

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {Object.keys(userCartItems).length > 0 ? (
                Object.keys(userCartItems).map((itemId) => {
                    const product = all_product.find((e) => e.id === Number(itemId));
                    if (!product) return null;

                    return (
                        <div key={product.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img className="carticon-product-icon" src={product.image} alt={product.name} />
                                <p>{product.name}</p>
                                <p>₹{product.new_price}</p>
                                <button className="cartitems-quantity">{userCartItems[itemId]}</button>
                                <p>₹{product.new_price * userCartItems[itemId]}</p>
                                <img
                                    className="cartitems-remove-icon"
                                    onClick={() => removeFromCart(product.id)}
                                    src={remove_icon}
                                    alt="Remove"
                                />
                            </div>
                            <hr />
                        </div>
                    );
                })
            ) : (
                <p style={{ textAlign: "center", padding: "20px" }}>No items in cart.</p>
            )}

<div className="cartitems-down">
                <div className="cartitems-totals">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>₹{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                {/* <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promo code' />
                        <button>Submit</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default CartItems;
