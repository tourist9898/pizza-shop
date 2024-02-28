export const ADD_PIZZA_ORDER = 'ADD_PIZZA_ORDER';
export const MOVE_TO_NEXT_STAGE = 'MOVE_TO_NEXT_STAGE';
export const CANCEL_ORDER = 'CANCEL_ORDER';

export const addPizzaOrder = (order) => ({
  type: ADD_PIZZA_ORDER,
  payload: order,
});

export const moveToNextStage = (order) => ({
  type: MOVE_TO_NEXT_STAGE,
  payload: order,
});

export const cancelOrder = (orderId) => ({
  type: CANCEL_ORDER,
  payload: orderId,
});
