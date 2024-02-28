import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, moveToNextStage } from "../redux/actions";

const PizzaOrdersDisplay = () => {
  const pizzaOrders = useSelector((state) => state.pizzaOrders);
  const dispatch = useDispatch();

  const handleCancel = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const handleMoveToNextStage = (orderId) => {
    dispatch(moveToNextStage({ id: orderId }));
  };

  const [elapsedTimes, setElapsedTimes] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTimes((prevElapsedTimes) => {
        const updatedElapsedTimes = {};
        pizzaOrders.forEach((order) => {
          updatedElapsedTimes[order.id] = calculateTimeElapsed(
            order.startTime          
          );
        });
        return updatedElapsedTimes;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [pizzaOrders]);

  function calculateTimeElapsed(dateObject) {
    const currentTime = new Date();
    const timeDifference = currentTime - dateObject;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(secondsDifference / 60);
    const seconds = secondsDifference % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    return formattedTime;
  }

  const getCardColorClass = (remainingTime, size) => {
    debugger
    const timeArray = remainingTime?.split(':') || [0,0];
    const minutes = parseInt(timeArray[0]);
    const seconds = parseInt(timeArray[1]);

    if (size === "Small" && minutes >= 3) {
        return "card-red";
    } else if (size === "Medium" && minutes >= 4) {
        return seconds >= 0 ? "card-red" : "";
    } else if (size === "Large" && minutes >= 5) {
        return "card-red";
    }
    return "";
};

  const ordersByStage = {
    "Order Placed": [],
    "Order in Making": [],
    "Order Ready": [],
    "Order Picked": [],
  };

  pizzaOrders.forEach((order) => {
    ordersByStage[order.stage].push(order);
  });

  return (
    <div className="row pizza-orders-display">
      {Object.entries(ordersByStage).map(([stage, orders]) => (
        <div key={stage} className="col pizza-stage">
          <div>
            <h3>{stage}</h3>
            {orders.length>0 && orders.map((order) => (
              <div
                key={order.id}
                className={`card mb-3 pizza-card ${getCardColorClass(
                  elapsedTimes[order.id] , order.size
                )}`}
              >
                <div className="card-body">
                  <h5 className="card-title">Order Id: {order.id}</h5>
                  <p className="card-text">
                    Time Spent: {elapsedTimes[order.id] || 0} minutes
                  </p>
                  <div className="button-container">
                    {order.stage !== "Order Ready" && (
                      <button
                        className="btn cancel-btn"
                        onClick={() => handleCancel(order.id)}
                      >
                        Cancel
                      </button>
                    )}
                    {order.stage !== "Order Picked" && (
                      <button
                        className="btn next-btn"
                        onClick={() => handleMoveToNextStage(order.id)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PizzaOrdersDisplay;
