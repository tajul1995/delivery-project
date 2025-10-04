import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAuth from "../pages/Hooks/useAuth";
import useAxiousSecure from "../pages/Hooks/useAxiousSecure";
import PendingMoney from "./PendingMoney";

export default function CompletedDeliveries() {
  const { user } = useAuth();
  const axiousSecure = useAxiousSecure();
  const [moneyPending,setMoneyPendong]=useState(0)

  // ✅ Fetch completed deliveries
  const { data: completedParcels = [], refetch } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    queryFn: async () => {
      const res = await axiousSecure.get(`/completedDeliveries?email=${user.email}`);
      return res.data.parcels || [];
    },
    enabled: !!user?.email,
  });

  // 🧮 Calculate Rider Earnings
  const riderEarnings = useMemo(() => {
    return completedParcels.map((parcel) => {
      const senderDistrict = parcel.senderInfo?.district;
      const receiverDistrict = parcel.receiverInfo?.district;
      const totalCost = parcel.totalCost || 0;

      const isSameDistrict = senderDistrict && receiverDistrict && senderDistrict === receiverDistrict;
      const earning = isSameDistrict ? totalCost * 0.8 : totalCost * 0.3;

      return {
        ...parcel,
        riderEarning: Math.round(earning), // round to nearest taka
      };
    });
  }, [completedParcels]);


  const moneyEarning=(data)=>{
  setMoneyPendong(data)
}

//   🧮 Total Earning
    const totalEarning = useMemo(() => {
    return riderEarnings.reduce((sum, parcel) => sum + parcel.riderEarning, 0);
  }, [riderEarnings]);

  // 💸 Cashout Functionality (demo)
  const handleCashOut = async () => {
  if (riderEarnings.length === 0) {
    Swal.fire("No earnings to cash out!", "", "info");
    return;
  }

  Swal.fire({
    title: "Cash Out Confirmation",
    text: `You are about to cash out ৳${totalEarning-moneyPending}. Do you want to proceed?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Cash Out",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#16a34a",
  }).then(async (result) => {
    if (result.isConfirmed) {
      // ✅ Collect parcel IDs to cash out
      const parcelIds = riderEarnings.map((p) => p._id);

      const res = await axiousSecure.post("/cashoutData", {
        riderEmail: user.email,
        riderName: user.displayName,
        amount: totalEarning,
        parcelIds,
      });

      if (res.data.success) {
        Swal.fire("Success!", "Your cash out has been initiated.", "success");
        refetch(); // Refresh list
      }
    }
  });
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Completed Deliveries</h1>

    {/* Total Earnings & Cashout */}
      {riderEarnings.length > 0 && (
        <div className="mt-6 flex justify-between items-center  p-4  shadow-inner border-b-4 border-amber-200">
          <p className="text-lg font-semibold">
            Total Earnings: <span className="text-green-600">৳{totalEarning-moneyPending}</span>
          </p>
          <PendingMoney moneyEarning={moneyEarning}></PendingMoney>
          {/* <button onClick={handleCashOut} className="btn btn-success">
            Cash Out
          </button> */}
        </div>
      )}





      <div className="overflow-x-auto  rounded-lg shadow my-11">
        <table className="table">
          <thead className="">
            <tr>
              <th>Tracking ID</th>
              <th>Receiver Name</th>
              <th>Receiver District</th>
              <th>Total Cost</th>
              <th>Your Earning</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riderEarnings.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.trackingId}</td>
                <td>{parcel.receiverInfo?.name}</td>
                <td>{parcel.receiverInfo?.district}</td>
                <td>৳{parcel.totalCost}</td>
                
                
                <td className="font-semibold text-green-600">৳{parcel.riderEarning}</td>


                {
                  parcel.cashedOut?<button className="btn btn-warning">CasheIn</button>:
                  <button onClick={handleCashOut} className="btn btn-success">
            Cash Out
          </button>
                }
                
              </tr>
            ))}

            {riderEarnings.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No completed deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}