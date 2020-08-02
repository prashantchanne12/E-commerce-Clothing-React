import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51H9XeDGNKKNAUyMNt0N1rquDjbKPO5ZWfzRxcqvcec07J7Fflh4xnndroib2mpdFCVTFQTCQ0mVsKy4Z4ATd6GEn00zngRJx6F";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then((stripRes) => {
        alert("Payment Successful!!");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "There was an issue with your payment. Please sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Ecom Clothing"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
