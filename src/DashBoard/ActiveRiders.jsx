
import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../pages/Hooks/useAxiousSecure";


const ActiveRiders = () => {
//   const [riders, setRiders] = useState([]);
  const axiosSecure = useAxiousSecure();

  // fetch only approved riders
  const {data:riders=[],isPending,refetch}=useQuery({
    queryKey:'active-riders',
    queryFn:async()=>{
        const res= await axiosSecure.get('/riders/active')
        return res.data
    }
  })
if(isPending){
    return <p>.........loading</p>
}

  // deactivate rider
  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will deactivate the rider.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/riders/${id}/deactivate`);
        if (res.data) {
            refetch()
          Swal.fire("Done!", "Rider has been deactivated.", "success");
          
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="p-6  shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike No</th>
              <th>Action</th>
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
                <td>
                  <button
                    onClick={() => handleDeactivate(rider._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500">
                  No active riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
