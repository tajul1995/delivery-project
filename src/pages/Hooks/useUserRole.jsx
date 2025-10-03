import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiousSecure from "./useAxiousSecure";


export default function useUserRole() {
  const { user, loading } = useAuth();  // assuming your useAuth returns { user, loading }
  const axiosSecure = useAxiousSecure();

  const { data: roleData = {}, isLoading: roleLoading ,refetch} = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,   // ✅ only run when email is ready
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
console.log(roleData)
  return {
    role: roleData?.role || "user",   // default to 'user' if no role found
    roleLoading,
    roleData,
    refetch
  };
}
