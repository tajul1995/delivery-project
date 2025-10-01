import axios from "axios"

const axiousPublice = axios.create({
    baseURL:`http://localhost:5000`,
})
const useAxiousPublice = () => {
  return axiousPublice
}

export default useAxiousPublice
