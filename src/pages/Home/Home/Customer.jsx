import photo from "../../../assets/customer-top.png"

const Customer = () => {
  return (
    <div className="flex items-center flex-col gap-3">
      <img src={photo} alt="" srcset="" />
      <h2 className="text-[#CAEB66] text-2xl font-bold italic">What our customers are sayings</h2>
      <p className="w-2/3">Enhance posture, mobility, and well-being effortlessly with Posture Pro.<span>Achieve proper alignment, reduce pain, and strengthen your body with ease!</span> </p>
    </div>
  )
}

export default Customer
