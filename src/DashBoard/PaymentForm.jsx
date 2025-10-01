import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiousSecure from "../pages/Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../pages/Hooks/useAuth";


const PaymentForm = () => {
    const stripe = useStripe();
  const elements = useElements();
  const [error,seterror]=useState('')
   const [loading, setLoading] = useState(false);
  const axiousSecure = useAxiousSecure()
  const {user}=useAuth()
  const {id}=useParams()

  const navigate = useNavigate()
  console.log(id)
const {data:singleParcel=[],isPending}= useQuery({
            queryKey:['single-parcel',id],
            queryFn:async()=>{
                const res = await axiousSecure.get(`/allparcels/${id}`)
                return res.data
            }
    })
    if(isPending){
        return <p>loading................</p>
    }
        console.log(singleParcel)
        const amountInCents = parseInt(singleParcel.totalCost)*100
        console.log(amountInCents)



     const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
  setLoading(true);
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
  setLoading(true);
    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      console.log('[error]', error);
      seterror(error.message)
    } else {
        seterror('')
      console.log('[PaymentMethod]', paymentMethod);
      const res = await axiousSecure.post('/create-payment-intent',{
    amountInCents,id
})
console.log(res.data)
const clientSecret =res.data.clientSecret;
const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log(result)
    if (result.error) {
      seterror(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
        await axiousSecure.post("/payments/success", {
    userEmail: user.email,
    amount:singleParcel.totalCost, // amount in cents
    currency: "usd",
    stripePaymentId: result.paymentIntent.client_secret
,
  });
      seterror("✅ Payment successful!");
      navigate('/dashboard/myparcels')

    }

    setLoading(false);

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
        <button type="submit" disabled={!stripe}  className="btn btn-primary mt-4 w-full">pay for parcel<span>{loading ? "Processing..." : singleParcel.totalCost}</span></button>
        {
            error&&<p className="text-red-700 font-bold">{error}</p>
        }
      </form>
    </div>
  )
}

export default PaymentForm
