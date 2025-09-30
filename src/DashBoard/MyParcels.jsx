import { useQuery } from "@tanstack/react-query"
import useAuth from "../pages/Hooks/useAuth"
import useAxiousSecure from "../pages/Hooks/useAxiousSecure"


const MyParcels = () => {
    const {user}=useAuth()
    const axiousSecure = useAxiousSecure()
    const {data:parcels=[]} = useQuery({
        queryKey:['parcels', user?.email],
        queryFn:async ()=>{
            const res = await axiousSecure.get(`/allparcels?email=${user.email}`)
            return res.data
        }
    })
    const alldata=parcels.parcels
  return (
     <div className=" w-full">
      <table className="table w-full">
        <thead>
          <tr className="bg-base-200">
            <th>Sender</th>
            <th>Parcel Type</th>
            <th>Title</th>
            <th>totalcost</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody 
            className="w-full"
          
        >
          {alldata.map((parcel) => (
            <tr key={parcel._id} className="hover">
              <td>{parcel.senderInfo.name}</td>
              <td>{parcel.parcelInfo.type}</td>
              <td>{parcel.parcelInfo.title}</td>
              <td>tk{parcel.totalCost}</td>
              <td>
                {parcel.paymentStatus === "paid" ? (
                  <span className="badge badge-success">Paid</span>
                ) : (
                  <span className="badge badge-error">Unpaid</span>
                )}
              </td>
              <td className="space-x-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => onView(parcel)}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => onDelete(parcel._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => onDelete(parcel.totalCost)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyParcels
