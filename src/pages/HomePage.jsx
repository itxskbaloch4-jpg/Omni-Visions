import HeroSection from '../components/home/HeroSection'
import AboutSection from '../components/home/AboutSection'
import ServicesSection from '../components/home/ServicesSection'
import StatsSection from '../components/home/StatsSection'
import HowItWorks from '../components/home/HowItWorks'
import TestimonialsSection from '../components/home/TestimonialsSection'
import PackagesSection from '../components/home/PackagesSection'
import PortfolioSection from '../components/home/PortfolioSection'
import ClientsMarquee from '../components/home/ClientsMarquee'
import TechStack from '../components/home/TechStack'
import BlogSection from '../components/home/BlogSection'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <HowItWorks />
      <TestimonialsSection />
      <PackagesSection />
      <PortfolioSection />
      <ClientsMarquee />
      <TechStack />
      <BlogSection />
      <CTASection />
    </>
  )
}
