import Banner from "../Banner"
import WorkingSection from "../WorkingSection"
import CustomerReviews from "./CustomerReviews"
import FixedBanner from "./FixedBanner"
import MarqueeSection from "./MarqueeSection"
import ServicesSection from "./ServicesSection"



const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WorkingSection></WorkingSection>
      <ServicesSection></ServicesSection>
      <MarqueeSection></MarqueeSection>
      <FixedBanner></FixedBanner>
      <CustomerReviews></CustomerReviews>
    </div>
  )
}

export default Home
