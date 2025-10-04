import useAuth from "../pages/Hooks/useAuth"
import useUserRole from "../pages/Hooks/useUserRole"


const RiderRoute = ({children}) => {
    const {user,loading}=useAuth()
    const {role,roleLoading}=useUserRole()
    if(loading || roleLoading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(!user || role !=='rider'){
        return <Navigate to='/forbidden' state={{from:location.pathname}}></Navigate>
    }
  return children
}

export default RiderRoute
