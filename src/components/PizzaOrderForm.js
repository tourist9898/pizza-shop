import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPizzaOrder } from '../redux/actions';

const PizzaOrderForm = () => {
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [base, setBase] = useState('');
  const dispatch = useDispatch();
  const orders = useSelector(state => state.pizzaOrders);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orders.length >= 10) {
      alert('Not taking any order for now. Maximum orders reached.');
      return;
    }
    dispatch(addPizzaOrder({ type, size, base }));

    setType('');
    setSize('');
    setBase('');
  };

  return (
    <form onSubmit={handleSubmit} className="pizza-order-form">
      <h2>Place Pizza Order</h2>
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="size">Size:</label>
        <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">Select</option>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="base">Base:</label>
        <select id="base" value={base} onChange={(e) => setBase(e.target.value)}>
          <option value="">Select</option>
          <option value="Thin">Thin</option>
          <option value="Thick">Thick</option>
        </select>
      </div>
      <button type="submit" className="submit-button">Place Order</button>
    </form>
  );
};

export default PizzaOrderForm;
