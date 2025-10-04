import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../pages/Hooks/useAuth";
 import useAxiousSecure from "../pages/Hooks/useAxiousSecure";


const PendingDeleveries = () => {
  const { user } = useAuth();
   const axiousSecure = useAxiousSecure();

  console.log(user.email)
  
  // ✅ Fetch pending parcels assigned to rider
  const { data: pendingParcels = [], refetch } = useQuery({
    queryKey: ["pendingParcels", user?.email],
    queryFn: async () => {
      const res = await axiousSecure.get(`/pending-deliveries?email=${user.email}`);
      return res.data.parcels || [];
    },
    enabled: !!user?.email,
  });
  console.log(pendingParcels)
  // ✅ Handle Accept Delivery
  const handleAccept = async (parcel) => {
    Swal.fire({
      title: `Accept Parcel ${parcel.trackingId}?`,
      text: "Do you want to accept and start delivering this parcel?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // update status to in_transit
        const res = await axiousSecure.patch(`/allparcels/${parcel._id}`, {
          Delivery_Status: "in_transit",
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Parcel Accepted",
            text: "The parcel is now in transit.",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Delivered ✅",
            cancelButtonText: "Close",
          }).then(async (delRes) => {
            if (delRes.isConfirmed) {
              // update status to delivery_completed
              const deliveryUpdate = await axiousSecure.patch(`/allparcels/${parcel._id}`, {
                Delivery_Status: "delivery_completed",
              });

              if (deliveryUpdate.data.modifiedCount > 0) {
                Swal.fire({
                  title: "Delivered Successfully",
                  text: "Parcel delivery has been completed.",
                  icon: "success",
                });
                refetch();
              }
            }
          });

          refetch();
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📦 Pending Deliveries</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className=" text-left">
              <th>Tracking ID</th>
              <th>Receiver Name</th>
              <th>Receiver District</th>
              <th>Total Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingParcels.length > 0 ? (
              pendingParcels.map((parcel) => (
                <tr key={parcel._id} className="hover">
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.receiverInfo?.name}</td>
                  <td>{parcel.receiverInfo?.district}</td>
                  <td>${parcel.totalCost}</td>
                  <td>
                    <button
                      onClick={() => handleAccept(parcel)}
                      className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No pending parcels found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PendingDeleveries
