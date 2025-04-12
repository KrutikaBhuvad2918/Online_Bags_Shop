import React, { useContext } from "react";
import "./CSS/WishList.css";
import { ShopContext } from "../Context/ShopContext";

const Wishlist = () => {
    const { wishlist, addToCart, removeFromWishlist } = useContext(ShopContext);

    return (
        <div className="wishlist-container">
            <h1>My Wishlist ❤️</h1>
            {wishlist.length === 0 ? (
                <p className="empty-message">Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((item) => (
                        <div key={item.id} className="wishlist-item">
                            <img src={item.image} alt={item.name} className="wishlist-image" />
                            <h3 className="item-name">{item.name}</h3>
                            <p className="wishlist-price">₹ {item.new_price}</p>
                            <div className="wishlist-buttons">
                                <button className="wishlist-add" onClick={() => addToCart(item.id)}>
                                    Add to Cart 🛒
                                </button>
                                <button className="wishlist-remove" onClick={() => removeFromWishlist(item.id)}>
                                    ❌ Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
