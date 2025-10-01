import { useQuery } from "@tanstack/react-query"
import useAxiousSecure from "../pages/Hooks/useAxiousSecure"
import useAuth from "../pages/Hooks/useAuth"


const PaymentsHistory = () => {
    const axiousSecure = useAxiousSecure()
    const {user}=useAuth()
    const {data:payments =[]}=useQuery({
        queryKey:['payments',user.email],
        queryFn:async()=>{
            const res = await axiousSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })
    console.log(payments)
  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-200 text-left">
            <th>#</th>
           
            <th>Amount</th>
            <th>Currency</th>
            <th>Stripe Payment ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments && payments.length > 0 ? (
            payments.map((payment, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
             
                <td>
                  {(payment.amount / 100).toFixed(2)}{" "}
                  <span className="font-semibold">USD</span>
                </td>
                <td className="uppercase">{payment.currency}</td>
                <td className="text-xs">{payment.stripePaymentId}</td>
                <td>
                  {payment.createdAt
                    ? new Date(payment.createdAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-500">
                No payment history found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PaymentsHistory
