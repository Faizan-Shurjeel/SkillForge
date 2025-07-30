import {
  Navigation,
  HeroSection,
  CoursesSection,
  ServicesSection,
  TestimonialsSection,
  ContactSection,
  Footer,
  WhatsAppFloat,
} from "@/components";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function Home() {
  useEffect(() => {
    document.title = "TechNexus Academy - Professional Technology Training";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Master technology with professional training courses in AI, Python, Data Science, Web Development, Mobile Apps, Robotics, and Cybersecurity. Expert-led programs with hands-on projects."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Master technology with professional training courses in AI, Python, Data Science, Web Development, Mobile Apps, Robotics, and Cybersecurity. Expert-led programs with hands-on projects.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeroSection />
        <CoursesSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <WhatsAppFloat />
      </div>
    </QueryClientProvider>
  );
}
