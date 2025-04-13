import React, { useEffect, useState } from 'react';
import { db, auth } from '../Components/FirebaseAuth/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './CSS/OrderHistory.css';
import all_product from '../Components/Assets/all_product'; // ✅ Import local product data

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, 'Orders', user.uid, 'orders'));
          const userOrders = [];
          querySnapshot.forEach((doc) => {
            userOrders.push({ id: doc.id, ...doc.data() });
          });
          setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'Not Available';
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // ✅ Get image from all_product by item id
  const getProductImageById = (id) => {
    const matchedProduct = all_product.find((product) => product.id === id);
    return matchedProduct ? matchedProduct.image : 'https://via.placeholder.com/150';
  };

  return (
    <div className="order-history-container">
      <h2>Your Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="order-item" key={order.id}>
                <div className="order-left">
                  <p><strong>Order Number:</strong> #{order.id}</p>
                  <p><strong>Order Date:</strong> {order.timestamp.toDate().toLocaleDateString()}</p>
                  <p><strong>Delivery Date:</strong> {(new Date(order.timestamp.toDate().getTime() + 4 * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
                  <p><strong>Ship To:</strong> {order.address?.city}, {order.address?.state}, {order.address?.country}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                </div>
                <div className="order-right">
                  {order.items.map((item, index) => (
                    <div className="order-product" key={index}>
                      <img src={getProductImageById(item.id)} alt={item.name} />
                      <div className="product-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                        <p className='prize'>₹{item.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
