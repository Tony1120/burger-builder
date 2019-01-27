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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
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
        }
      };
    default:
      return state;
  }
};

export default reducer;
