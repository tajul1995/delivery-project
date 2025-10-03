import {  useState } from "react";
import useAxiousSecure from "../pages/Hooks/useAxiousSecure";
import { useQuery } from '@tanstack/react-query'
import Swal from "sweetalert2";


const PendingRider = () => {
  // const [riders, setRiders] = useState([]);
  const axiousSecure = useAxiousSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch pending riders
const {data:riders=[],isPending,refetch}=useQuery({
  queryKey:'ridere-pending',
  queryFn:async()=>{
    const res = await axiousSecure.get('/riders/pending')
    return res.data
  }
})

if(isPending){
  return <span className="loading loading-ring loading-xl"></span>
}



  // useEffect(() => {
  //   const fetchPendingRiders = async () => {
  //     try {
  //       const res = await axiousSecure.get("/riders/pending");
  //       setRiders(res.data); // assuming { success: true, data: [...] }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchPendingRiders();
  // }, [axiousSecure]);
  const handleApprove = async (id,email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this rider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
    });

    if (confirm.isConfirmed) {
      await axiousSecure.patch(`/riders/${id}/approve`,{email});
      refetch()
      Swal.fire("Approved!", "Rider has been approved.", "success");
      
    }
  };

const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (confirm.isConfirmed) {
      await axiousSecure.patch(`/riders/${id}/cancel`);
      refetch()
      Swal.fire("Cancelled!", "Rider has been cancelled.", "success");
      
    }
  };


  return (
    <div className="p-6  shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike No</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.bikeNumber}</td>
                <td className="flex gap-3"><label
                    htmlFor="rider-modal"
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedRider(rider)}
                  >
                    Details
                  </label>
                  {/* Approve */}
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleApprove(rider._id,rider.email)}
                  >
                    Approve
                  </button>

                  {/* Cancel */}
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleCancel(rider._id)}
                  >
                    Cancel
                  </button>
                  
                  
                  
                  
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for rider details */}
      {selectedRider && (
        <>
          <input type="checkbox" id="rider-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box w-11/12 max-w-3xl">
              <h3 className="font-bold text-xl mb-2">Rider Details</h3>
              <ul className="space-y-1">
                <li><strong>Name:</strong> {selectedRider.name}</li>
                <li><strong>Email:</strong> {selectedRider.email}</li>
                <li><strong>Age:</strong> {selectedRider.age}</li>
                <li><strong>NID:</strong> {selectedRider.nid}</li>
                <li><strong>Contact:</strong> {selectedRider.contact}</li>
                <li><strong>Region:</strong> {selectedRider.region}</li>
                <li><strong>District:</strong> {selectedRider.district}</li>
                <li><strong>Bike Number:</strong> {selectedRider.bikeNumber}</li>
                <li><strong>Bike Registration:</strong> {selectedRider.bikeRegNumber}</li>
                <li><strong>Bike Registration:</strong> {selectedRider.status}</li>
              </ul>
              <div className="modal-action">
                <label htmlFor="rider-modal" className="btn">
                  Close
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PendingRider;