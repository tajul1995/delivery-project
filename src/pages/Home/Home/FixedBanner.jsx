import img2 from "../../../assets/be-a-merchant-bg.png"
import img from '../../../assets/location-merchant.png'
const FixedBanner = () => {
  return (
    <div className="w-full h-[350px] bg-[#03373D] my-3 bg-cover bg-center  " style={{ backgroundImage: `url(${img2})` }}>
        <div className="hero ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src={img}
      className="max-w-full rounded-lg shadow-2xl"
    />
    <div className='flex flex-col items-start justify-between  '>
      <h1 className="text-2xl text-[#CAEB66] font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
      <p class name className='my-7'>
        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
      </p>
      <div>
        <button className="btn bg-[#CAEB66] text-black rounded-2xl">Become a Merchant</button>
        <button className="btn bg-[#03373D] text-[#CAEB66] border-2 rounded-2xl ml-4 border-white">Earn with Profast Courier</button>
      </div>
    </div>
  </div>
</div>
      
    </div>
  )
}

export default FixedBanner
