import { useState } from "react";
import Swal from "sweetalert2";
import useAxiousSecure from "../pages/Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";


const AdminManagement = () => {
//   const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const axiosSecure = useAxiousSecure();
  const {data:users =[],isPending,refetch}=useQuery({
    queryKey:'users',
    queryFn:async()=>{
        const res = await axiosSecure.get('/users')
        return res.data
    }
  })
  if(isPending){
    return <p>.............loading</p>
  }
console.log(user)
  // 🔹 Search user by email
  
  // 🔹 Make user admin
  const handleMakeAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}/make-admin`);
      if (res.data) {
        Swal.fire("Success!", "User is now an admin", "success");
        setUser({ ...users, role: "admin" });
        refetch()
      }
    } catch (err) {
        console.log(err)
      Swal.fire("Error!", "Failed to make admin", "error");
    }
  };

  // 🔹 Remove admin
  const handleRemoveAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}/remove-admin`);
      if (res.data) {
        Swal.fire("Success!", "Admin rights removed", "success");
        setUser({ ...users, role: 'user' });
        refetch()
      }
    } catch (err) {
        console.log(err)
      Swal.fire("Error!", "Failed to remove admin", "error");
    }
  };

  return (
    <div className="p-6  shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🔑 Admin Management</h2>

      {/* Search bar */}
      

      {/* Result Table */}
      {users && (
        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Current Role</th>
                <th>LAST-LOGIN</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

                {
                    users.map(user=><tr>
                
                <td>{user.email}</td>
                <td>{user.role || "user"}</td>
                <td>{user.last_login}</td>
                <td>
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm btn-success"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="btn btn-sm btn-error"
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>)
                }

              
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
