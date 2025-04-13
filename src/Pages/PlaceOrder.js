import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/PlaceOrder.css';
import stripeLogo from '../Components/Assets/Stripe-Logo.png';
import razorpayLogo from '../Components/Assets/Razerpay-Logo.jpg';
import { ShopContext } from '../Context/ShopContext';
import { db, auth } from '../Components/FirebaseAuth/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import OrderSuccessModal from '../Pages/OrderSuccessModal';

const PlaceOrder = () => {
    const { getTotalCartAmount, cartItems, all_product, clearCart } = useContext(ShopContext);
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState('cod');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });

    const handleInputChange = (e) => {
        setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
    };

    const handleOrder = async () => {
        if (Object.values(deliveryInfo).some(value => value.trim() === '')) {
            alert('Please fill in all delivery details.');
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            alert('You must be logged in to place an order.');
            return;
        }

        try {
            const orderItems = Object.keys(cartItems).map((itemId) => {
                const product = all_product.find((item) => item.id === Number(itemId));
                if (!product) return null;

                return {
                    id: product.id,
                    name: product.name,
                    price: product.new_price,
                    quantity: cartItems[itemId],
                    total: product.new_price * cartItems[itemId],
                };
            }).filter(Boolean);

            const orderData = {
                firstName: deliveryInfo.firstName,
                lastName: deliveryInfo.lastName,
                email: deliveryInfo.email,
                phone: deliveryInfo.phone,
                address: {
                    street: deliveryInfo.street,
                    city: deliveryInfo.city,
                    state: deliveryInfo.state,
                    zipcode: deliveryInfo.zipcode,
                    country: deliveryInfo.country
                },
                items: orderItems,
                totalAmount: getTotalCartAmount() + 10,
                paymentMethod: selectedPayment,
                timestamp: serverTimestamp(),
            };

            const userOrdersRef = collection(db, 'Orders', user.uid, 'orders');
            await addDoc(userOrdersRef, orderData);

            clearCart();
            setDeliveryInfo({
                firstName: '',
                lastName: '',
                email: '',
                street: '',
                city: '',
                state: '',
                zipcode: '',
                country: '',
                phone: '',
            });

            setShowSuccessModal(true); // ✅ Show modal
           
            console.log("✅ Success modal triggered!");
    
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className='place-order-container'>
            {/* Delivery Info Form */}
            <div className='order-form-container'>
                <h2>DELIVERY <span>INFORMATION</span></h2>
                <form>
                    <div className='input-row'>
                        <input type='text' name='firstName' placeholder='First name' required onChange={handleInputChange} />
                        <input type='text' name='lastName' placeholder='Last name' required onChange={handleInputChange} />
                    </div>
                    <input className="email-input" type='email' name='email' placeholder='Email address' required onChange={handleInputChange} />
                    <input className="email-input" type='text' name='street' placeholder='Street' required onChange={handleInputChange} />
                    <div className='input-row'>
                        <input type='text' name='city' placeholder='City' required onChange={handleInputChange} />
                        <input type='text' name='state' placeholder='State' required onChange={handleInputChange} />
                    </div>
                    <div className='input-row'>
                        <input type='text' name='zipcode' placeholder='Zipcode' required onChange={handleInputChange} />
                        <input type='text' name='country' placeholder='Country' required onChange={handleInputChange} />
                    </div>
                    <input className="email-input" type='text' name='phone' placeholder='Phone' required onChange={handleInputChange} />
                </form>
            </div>

            {/* Cart Summary */}
            <div className='order-summary-container'>
                <h2>CART <span>TOTALS</span></h2>
                <div className='order-summary1'>
                    <h2>Order Summary</h2>
                    {all_product.map((item) => {
                        if (cartItems[item.id] > 0) {
                            return (
                                <div className='order-item' key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name} x {cartItems[item.id]}</p>
                                    <p>₹{item.new_price * cartItems[item.id]}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <h3>Total  : ₹{getTotalCartAmount()}</h3>
                </div>

                <div className='order-summary'>
                    <p>Subtotal <span>₹ {getTotalCartAmount()}</span></p>
                    <p>Shipping Fee <span>₹ 10.00</span></p>
                    <hr />
                    <h3>Total <span>₹ {getTotalCartAmount() + 10}</span></h3>
                </div>

                <h3>PAYMENT METHOD</h3>
                <div className='payment-options'>
                    <label className={`payment-option ${selectedPayment === 'stripe' ? 'selected' : ''}`} onClick={() => setSelectedPayment('stripe')}>
                        <input type='radio' name='payment' value='stripe' checked={selectedPayment === 'stripe'} readOnly />
                        <img src={stripeLogo} alt='Stripe' />
                    </label>
                    <label className={`payment-option ${selectedPayment === 'razorpay' ? 'selected' : ''}`} onClick={() => setSelectedPayment('razorpay')}>
                        <input type='radio' name='payment' value='razorpay' checked={selectedPayment === 'razorpay'} readOnly />
                        <img src={razorpayLogo} alt='Razorpay' />
                    </label>
                    <label className={`payment-option cod-option ${selectedPayment === 'cod' ? 'selected' : ''}`} onClick={() => setSelectedPayment('cod')}>
                        <input type='radio' name='payment' value='cod' checked={selectedPayment === 'cod'} readOnly /> Cash on Delivery
                    </label>
                </div>
                <button className='place-order-btn' onClick={handleOrder}>PLACE ORDER</button>
            </div>

            {/* ✅ Modal */}
            {showSuccessModal && (
                <OrderSuccessModal onClose={() => {
                    setShowSuccessModal(false);
                    navigate('/');
                }} />
            )}
        </div>
    );
};

export default PlaceOrder;
