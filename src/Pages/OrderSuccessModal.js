import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/OrderSuccessModal.css';

const OrderSuccessModal = ({ onClose }) => {
  const navigate = useNavigate();

  const getFormattedDeliveryRange = () => {
    const options = { weekday: 'short', day: '2-digit', month: 'short' };

    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate());

    const end = new Date(today);
    end.setDate(end.getDate() + 4);

    const startStr = start.toLocaleDateString('en-US', options);
    const endStr = end.toLocaleDateString('en-US', options);

    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="order-modal-backdrop">
      <div className="order-modal">
        <div className="check-icon">&#10003;</div>
        <h2>Order Confirmed !</h2>
        <p>Your order has been placed successfully. <span className="link-text" onClick={() => navigate('/order-history')}>Order History</span></p>
        <p>Get delivery by <strong>{getFormattedDeliveryRange()}</strong></p>
        <button className="continue-btn" onClick={onClose}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
