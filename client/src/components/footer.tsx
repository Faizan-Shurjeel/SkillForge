import { GraduationCap } from "lucide-react";
import { SiLinkedin, SiX, SiInstagram } from "react-icons/si";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-semibold">TechNexus Academy</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering the next generation of technology professionals with cutting-edge training and hands-on experience.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Courses</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-white transition-colors">AI & Machine Learning</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-white transition-colors">Python Development</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-white transition-colors">Data Science</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="hover:text-white transition-colors">Cybersecurity</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">AI Solutions</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Web Development</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Mobile Apps</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Consulting</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <SiX className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TechNexus Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
