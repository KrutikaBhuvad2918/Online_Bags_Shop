import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../Components/FirebaseAuth/firebase";
import { collection, doc, setDoc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../Components/FirebaseAuth/firebase"; // Firebase authentication
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // ✅ Track logged-in user
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await fetchCart(currentUser.uid);
            } else {
                setCartItems({});
            }
        });
        return () => unsubscribe();
    }, []);

    // ✅ Fetch cart from Firestore (Only for logged-in user)
    const fetchCart = async (userId) => {
        try {
            const cartRef = doc(db, "carts", userId);
            const cartSnap = await getDoc(cartRef);

            if (cartSnap.exists()) {
                const firestoreCart = cartSnap.data().items.reduce((acc, item) => {
                    acc[item.id] = item.quantity;
                    return acc;
                }, {});
                setCartItems(firestoreCart);
            } else {
                setCartItems({});
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const clearCart = () => {
        setCartItems({}); // Clears the cart
      };
    

    // ✅ Save cart to Firestore (Only for logged-in user)
    const saveCartToFirestore = async (newCart) => {
        if (!user) return;

        const cartRef = doc(db, "carts", user.uid);
        const cartData = Object.keys(newCart).map((itemId) => {
            const product = all_product.find((item) => item.id === Number(itemId));
            return product ? {
                id: product.id,
                name: product.name,
                price: product.new_price,
                quantity: newCart[itemId],
                total: product.new_price * newCart[itemId],
            } : null;
        }).filter(Boolean);

        try {
            await setDoc(cartRef, { items: cartData });
        } catch (error) {
            console.error("Error saving cart:", error);
        }
    };

    // ✅ Add item to cart
    const addToCart = (itemId) => {
        if (!user) {
            alert("Please log in to add items to your cart!");
            return;
        }

        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            saveCartToFirestore(newCart);
            return newCart;
        });
    };

    // ✅ Remove item from cart
    const removeFromCart = (itemId) => {
        if (!user) return;

        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            saveCartToFirestore(newCart);
            return newCart;
        });
    };

    // ✅ Get total cart items
    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);
    };

    // ✅ Get total cart amount
    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const product = all_product.find((item) => item.id === Number(itemId));
            return product ? total + (product.new_price * cartItems[itemId]) : total;
        }, 0);
    };

    // ✅ Add to wishlist
    const addToWishlist = (item) => {
        setWishlist((prev) => [...prev, item]);
    };

    // ✅ Remove from wishlist
    const removeFromWishlist = (itemId) => {
        setWishlist((prev) => prev.filter(item => item.id !== itemId));
    };

    // ✅ Place Order (Save to Firestore)
    const placeOrder = async (deliveryInfo, paymentMethod) => {
        if (!user) {
            alert("Please log in to place an order!");
            return;
        }

        try {
            const orderData = {
                userId: user.uid,
                items: Object.keys(cartItems).map((itemId) => {
                    const product = all_product.find((item) => item.id === Number(itemId));
                    return product ? {
                        id: product.id,
                        name: product.name,
                        price: product.new_price,
                        quantity: cartItems[itemId],
                        total: product.new_price * cartItems[itemId],
                    } : null;
                }).filter(Boolean),
                totalAmount: getTotalCartAmount() + 10, // Including shipping fee
                paymentMethod,
                deliveryInfo,
                timestamp: serverTimestamp(),
            };

            await addDoc(collection(db, "orders"), orderData);
            alert("Order placed successfully!");

            // ✅ Clear cart after order
            setCartItems({});
            saveCartToFirestore({});
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Try again.");
        }
    };

    // ✅ Fetch order history
    useEffect(() => {
        const fetchOrderHistory = async () => {
            if (!user) return;

            const ordersRef = collection(db, "orders");
            const ordersSnapshot = await getDoc(doc(ordersRef, user.uid));

            if (ordersSnapshot.exists()) {
                setOrderHistory(ordersSnapshot.data().orders || []);
            }
        };
        fetchOrderHistory();
    }, [user]);

    return (
        <ShopContext.Provider value={{
            user,
            getTotalCartItems,
            getTotalCartAmount,
            all_product,
            cartItems,
            addToCart,
            removeFromCart,
            searchQuery,
            setSearchQuery,
            navigate,
            addToWishlist,
            wishlist,
            removeFromWishlist,
            placeOrder,
            orderHistory,
            clearCart
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
