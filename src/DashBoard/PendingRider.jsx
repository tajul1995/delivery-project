import { useEffect, useState } from "react";
import useAxiousSecure from "../pages/Hooks/useAxiousSecure";


const PendingRiders = () => {
  const [riders, setRiders] = useState([]);
  const axiousSecure = useAxiousSecure();

  // Fetch pending riders
  useEffect(() => {
    const fetchPendingRiders = async () => {
      try {
        const res = await axiousSecure.get("/riders/pending");
        setRiders(res.data); // assuming { success: true, data: [...] }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPendingRiders();
  }, [axiousSecure]);

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRiders;
