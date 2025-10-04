import {  useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { FaMotorcycle } from "react-icons/fa";
import useAxiousSecure from "../pages/Hooks/useAxiousSecure";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiousSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allRiders,setRiders]=useState([])

  // ✅ Fetch parcels
  const { data: parcelsData, isLoading ,refetch} = useQuery({
    queryKey: ["assignRiderParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allparcels");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading parcels...</div>;
  }

  const parcels = parcelsData?.parcels || [];

  // ✅ Filter parcels: Payment_Status = paid AND Delivery_Status = notCollected
    const filteredParcels = parcels.filter(
    (parcel) =>
      parcel.Payment_Status === "paid" &&
      parcel.Delivery_Status === "notCollected"
  );

  // 🏍️ Mock Rider Data — replace this with your riders collection API later
    axiosSecure.get('/riders')
    .then(res=>{
        setRiders(res.data)
    })

  // ✅ Get riders matching the selected parcel's receiver district
  const matchedRiders = selectedParcel
    ? allRiders.filter(
        (rider) => rider.district === selectedParcel.receiverInfo?.district
      )
    : [];

  const handleAssignClick = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  const handleRiderSelect = async (rider) => {
    const parcelId = selectedParcel._id;

    // Confirm before assigning
    const confirm = await Swal.fire({
      title: `Assign ${rider.name}?`,
      text: "This will update the parcel status to In Transit.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, assign",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    // PATCH API call
    const res = await axiosSecure.patch(`/allparcels/${parcelId}`, {
      Delivery_Status: "rider_assign",
      assignedRider: rider._id,
      assignRiderName:rider.name,
      assignRiderEmail:rider.email
    });

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Rider Assigned",
        text: `Parcel is now in transit with ${rider.name}`,
        timer: 1800,
        showConfirmButton: false,
      });

      handleCloseModal();
      refetch();
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong while assigning rider.",
      });
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaMotorcycle className="text-primary" />
        Assign Rider
      </h2>

      {filteredParcels.length === 0 ? (
        <p className="text-center text-gray-500">
          No parcels available for assigning riders.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>Title</th>
                <th>Sender Name</th>
                <th>Total Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredParcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.parcelInfo?.title}</td>
                  <td>{parcel.senderInfo?.name}</td>
                  <td>৳{parcel.totalCost}</td>
                  <td>
                    <button
                      onClick={() => handleAssignClick(parcel)}
                      className="btn btn-sm bg-primary text-white hover:bg-primary/90 flex items-center gap-1"
                    >
                      <FaMotorcycle /> Assign Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Modal */}
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">
              Riders in District:{" "}
              <span className="text-primary">
                {selectedParcel?.receiverInfo?.district}
              </span>
            </h3>

            {matchedRiders.length === 0 ? (
              <p className="text-center text-gray-500">No riders available for this district.</p>
            ) : (
              <div className="space-y-3">
                {matchedRiders.map((rider) => (
                  <div
                    key={rider._id}
                    className="flex justify-between items-center p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-semibold">{rider.name}</p>
                      <p className="text-sm text-gray-600">
                        📍 {rider.district} | 📞 {rider.contact}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRiderSelect(rider)}
                      className="btn btn-sm btn-primary"
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-action">
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignRider;
