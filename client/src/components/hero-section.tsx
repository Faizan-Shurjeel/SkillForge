import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Master <span className="gradient-text">Technology</span><br/>
              Shape Your Future
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional technology training with industry experts. From AI and machine learning to full-stack development and cybersecurity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('courses')}
                className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-all apple-shadow-hover h-auto"
              >
                Explore Courses
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all h-auto"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern technology workspace with multiple screens and clean setup" 
              className="rounded-2xl apple-shadow w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
