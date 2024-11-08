"use client"
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import VendorSection from '../components/VendorSection';
import EventPlanningSection from '@/components/EventPlanningSection';
import ShopSection from '../components/ShopSection';
import Footer from '../components/Footer';
import Loading from '@/app/loading';

const Page = () => {

  
 // const router = useRouter();

 
    return (
        <div>
         <Loading/>  
          <Header />
          <HeroSection />
          <FeaturesSection />
          <VendorSection />
          <ShopSection />
          <EventPlanningSection/>
          
          <Footer />
          
        </div>
      );
}

export default Page;