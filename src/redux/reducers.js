import { ADD_PIZZA_ORDER, MOVE_TO_NEXT_STAGE, CANCEL_ORDER } from './actions';

const initialState = {
  pizzaOrders: [],
  totalDeliveredToday: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIZZA_ORDER:
      return {
        ...state,
        pizzaOrders: [...state.pizzaOrders, { ...action.payload, stage: 'Order Placed', startTime: new Date() , id:Math.floor(Math.random()*10000) }],
      };
    case MOVE_TO_NEXT_STAGE:
      debugger
      return {
        ...state,
        pizzaOrders: state.pizzaOrders.map(order =>
          order.id === action.payload.id ? { ...order, stage: getNextStage(order.stage), timeSpent: calculateTimeSpent(order.startTime, order.size) } : order
        ),
      };
    case CANCEL_ORDER:
      return {
        ...state,
        pizzaOrders: state.pizzaOrders.filter(order => order.id !== action.payload),
      };
    default:
      return state;
  }
};

const getNextStage = (currentStage) => {
  debugger
  switch (currentStage) {
    case 'Order Placed':
      return 'Order in Making';
    case 'Order in Making':
      return 'Order Ready';
    case 'Order Ready':
      return 'Order Picked';
    default:
      return currentStage;
  }
};

const calculateTimeSpent = (startTime, size) => {
  let timeSpent = Math.floor((new Date() - new Date(startTime)) / 1000);
  if (size === 'Small') {
    timeSpent = Math.min(timeSpent, 180);
  } else if (size === 'Medium') {
    timeSpent = Math.min(timeSpent, 240);
  } else if (size === 'Large') {
    timeSpent = Math.min(timeSpent, 300);
  }
  return timeSpent;
};

export default reducer;
