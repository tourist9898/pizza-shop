import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelOrder } from '../redux/actions';

const MainDisplay = () => {
  const pizzaOrders = useSelector((state) => state.pizzaOrders);
  const dispatch = useDispatch();

  const calculateTotalTimeSpent = (startTime) => {
    const currentTime = new Date();
    const timeDifference = (currentTime - new Date(startTime)) / 1000; 
    const elapsedMinutes = Math.floor(timeDifference / 60); 
    return elapsedMinutes;
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const calculateTotalTimeForAllPizzas = () => {
    let totalTime = 0;
    pizzaOrders.forEach((order) => {
      totalTime += calculateTotalTimeSpent(order.startTime);
    });
    return totalTime;
  };

  const pizzasInProgress = pizzaOrders.filter((order) => order.stage !== 'Order Ready' && order.stage !== 'Order Picked');

  const totalDeliveredToday = pizzaOrders.filter((order) => order.stage === 'Order Picked').length;

  return (
    <div className="main-display">
      <h2>Main Display</h2>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Size</th>
            <th>Stage</th>
            <th>Total Time Spent (minutes)</th>
            <th>Action</th> {/* Add Action column */}
          </tr>
        </thead>
        <tbody>
          {pizzasInProgress.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.size}</td>
              <td>{order.stage}</td>
              <td>{calculateTotalTimeSpent(order.startTime)}</td>
              <td>
                <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Pizzas Delivered Today: {totalDeliveredToday}</p>
      <p>Total Time Spent for All Pizzas: {calculateTotalTimeForAllPizzas()} minutes</p>
    </div>
  );
};

export default MainDisplay;
