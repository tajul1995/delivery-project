import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";


const PaymentForm = () => {
    const stripe = useStripe();
  const elements = useElements();
  const [error,seterror]=useState('')

     const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      seterror(error.message)
    } else {
        seterror('')
      console.log('[PaymentMethod]', paymentMethod);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-lg bg-white max-w-md mx-auto text-white">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}></CardElement>
        <button type="submit" disabled={!stripe}  className="btn btn-primary mt-4 w-full">pay for parcel</button>
        {
            error&&<p className="text-red-700 font-bold">{error}</p>
        }
      </form>
    </div>
  )
}

export default PaymentForm
