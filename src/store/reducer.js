import * as actionTypes from 'store/actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.7,
  meat: 1.0,
  bacon: 0.9
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.DELETE_INGREDIENT:
      console.log(
        'state.ingredients[action.ingredientName]',
        state.ingredients[action.ingredientName]
      );
      const currentNumber = state.ingredients[action.ingredientName];
      if (currentNumber <= 0) {
        return {
          ...state
        };
      }
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;
