import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe('pk_test_51NIbGYLPAjVvzr8C2QO3mXgSlxgvJ00h9o1zxQLg9iE77p55aZi5CykVSMiwPq3iW1LtNEd4dBXiPsbCyvb2I8Y800hZI3WBUL');

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  )
}

export default Payment
