


import useAuth from "../pages/Hooks/useAuth";
import useAxiousSecure from "../pages/Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";

const PendingMoney = ({moneyEarning}) => {
  const { user } = useAuth();
  const axiousSecure=useAxiousSecure()
//   const [pendingMoney, setPendingMoney] = useState(0);
//   const [totalParcels, setTotalParcels] = useState(0);
  const {data:pendingData={},isPending,refetch}=useQuery({
    queryKey:['pendingData',user.email],
    queryFn:async()=>{
        const res = await axiousSecure.get(`/rider/pending-money/${user.email}`)
        return res.data
    }
  })

  if(isPending){
    return <p>.............loading</p>
  }
  moneyEarning(pendingData?.pendingAmount)
  refetch()
console.log(pendingData)

//   useEffect(() => {
//     if (user?.email) {
//       fetchPendingMoney();
//     }
//   }, [user]);

//   const fetchPendingMoney = async () => {
//     try {
//       const res = await axiosSecure.get(`/rider/pending-money/${user.email}`);
//       setPendingMoney(res.data.pendingAmount);
//       setTotalParcels(res.data.totalParcels);
//     } catch (error) {
//       console.error("Error fetching pending money:", error);
//     }
//   };

  return (
    <div className=" shadow rounded-lg p-4 mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">💰 Pending Earnings</h3>
        <p className="text-gray-600">
          Total Parcels: <span className="font-bold">{pendingData.totalParcels}</span>
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold text-green-600">
            ৳ {pendingData?.pendingAmount
}
        </p>
      </div>
    </div>
  );
};

export default PendingMoney;
