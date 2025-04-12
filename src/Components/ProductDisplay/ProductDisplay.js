import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useContext(ShopContext);
    
    const [selectedImage, setSelectedImage] = useState(product.image || product.images[0]);

    // Check if the product is in the wishlist
    const isWishlisted = wishlist.some(item => item.id === product.id);

    // Function to handle Add to Cart
    const handleAddToCart = (productId) => {
        addToCart(productId);
        alert("Product added to cart!");
    };

    // Function to handle Wishlist actions
    const handleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
            alert("Product removed from wishlist!");
        } else {
            addToWishlist(product);
            alert("Product added to wishlist!");
        }
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {product.images.map((img, index) => (
                        <img 
                            key={index} 
                            src={img} 
                            alt="" 
                            onClick={() => setSelectedImage(img)} 
                            className={selectedImage === img ? 'active-thumbnail' : ''}
                        />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={selectedImage} alt="" />
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ₹{product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ₹{product.new_price}
                    </div>
                </div>    

                <div className="productdisplay-right-description">
                    {product.desc}
                </div>

                <div className="product-buttons">
                    <button onClick={() => handleAddToCart(product.id)}>ADD TO CART</button>
                    
                    <button 
                        className={`wishlist-button ${isWishlisted ? 'wishlisted' : ''}`} 
                        onClick={handleWishlist}
                    >
                        {isWishlisted ? '❤️ Wishlisted' : '♡ Add to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
