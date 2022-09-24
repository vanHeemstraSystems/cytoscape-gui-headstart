import React, { useContext } from "react";

import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";
import AppContext from "../context/AppContext";

import Cart from "../components/cart/";

function Checkout() {
  // get app context
  const appContext = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button
  const { isAuthenticated } = appContext;

  // load stripe to inject into elements components
  // Collect YOUR STRIPE PUBLIC (pk_) KEY from https://dashboard.stripe.com/test/dashboard 
  // const stripePromise = loadStripe("YOUR STRIPE PUBLIC (pk_) KEY");
  const stripePromise = loadStripe("pk_test_51K8dFIAoGYTOOZ9aAeWiSXy2o9FLEkysHiTbXxN3MJoFdB53gY8KNoDdZzvABZwAdaparZIIizuHjQMRupmwDjOO005zlIpTue");

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
  // }
}
export default Checkout;