import { useQuery } from "@tanstack/react-query"
import useAuth from "../pages/Hooks/useAuth"
import useAxiousSecure from "../pages/Hooks/useAxiousSecure"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


const MyParcels = () => {
    const {user}=useAuth()
    console.log(user.email)
    const navigate = useNavigate()
    const  axiousSecure= useAxiousSecure()
    const {data:parcels=[],isLoading,refetch} = useQuery({
        queryKey:['parcels', !!user?.email],
        queryFn:async ()=>{
            const res = await axiousSecure.get(`/allparcels?email=${user.email}`)
            return res.data
        }
    })
    if (isLoading) {
  return<span className="loading loading-ring loading-xl"></span>
}

    console.log(parcels)
    const alldata=parcels?.parcels
    console.log(alldata)
const onView=(parcel)=>{
  
  Swal.fire({
      title: "Parcel Details",
      html: `<pre style="text-align:left">${JSON.stringify(parcel, null, 2)}</pre>`,
      confirmButtonText: "Close",
    });
}
const onDelete=(id)=>{
  
  Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to recover this parcel after deleting!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiousSecure.delete(`/allparcels/${id}`)
        .then(res=>{
          if(res.data.deletedCount){
            refetch()
            Swal.fire("Deleted!", "The parcel has been deleted.", "success");
          }
        })
        
      }
    });
}
const onPay=(id)=>{
  console.log(id)
  navigate(`/dashboard/payment/${id}`)
}

  return (
     <div >
      <table className="table ">
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
                  onClick={() => onPay(parcel._id)}
                >
                  Pay
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