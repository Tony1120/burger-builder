import React from 'react';
import Button from 'components/UI/Button/Button';

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span sytle={{ textTransform: 'capitalize' }}> {igKey} </span>:{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3> Your Order </h3>
      <p> A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>

      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        {' '}
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        {' '}
        Continue
      </Button>
    </>
  );
};

export default orderSummary;
