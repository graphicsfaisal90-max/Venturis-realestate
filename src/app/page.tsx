import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import InvestmentSection from "@/components/home/InvestmentSection";
import Testimonials from "@/components/home/Testimonials";
import GallerySection from "@/components/home/GallerySection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative">
        <Hero />
        <SearchBar />
      </section>

      <section>
        <FeaturedProperties />
      </section>

      <section>
        <AboutSection />
      </section>

      <section>
        <StatsSection />
      </section>

      <section>
        <ServicesSection />
      </section>

      <section>
        <InvestmentSection />
      </section>

      <section>
        <Testimonials />
      </section>

      <section>
        <GallerySection />
      </section>

      <section>
        <BlogSection />
      </section>

      <section>
        <ContactSection />
      </section>
    </div>
  );
}
