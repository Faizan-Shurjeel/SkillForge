import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100' : 'bg-white/80 backdrop-blur-xl'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-semibold text-gray-900">TechNexus Academy</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('courses')} 
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Contact
            </button>
          </div>
          
          <Button 
            onClick={() => scrollToSection('courses')}
            className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            Get Started
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('courses')} 
                className="text-gray-600 hover:text-blue-500 transition-colors text-left"
              >
                Courses
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-gray-600 hover:text-blue-500 transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-gray-600 hover:text-blue-500 transition-colors text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-600 hover:text-blue-500 transition-colors text-left"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('courses')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors w-fit"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
