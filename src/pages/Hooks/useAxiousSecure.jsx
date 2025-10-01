import axios from "axios";
import useAuth from "./useAuth";

const axiousSecure = axios.create({
  baseURL:`http://localhost:5000`,
 
});
const useAxiousSecure = () => {
  const {user}=useAuth()
  axiousSecure.interceptors.request.use(config=>{
    config.headers.Authorization = `bearer ${user.accessToken}`
    return config
  },error=>{
    return Promise.reject(error)
  })
  return axiousSecure
}

export default useAxiousSecure
