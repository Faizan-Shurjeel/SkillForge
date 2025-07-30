import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@shared/schema";
import { ServiceModal } from "@/components";
import { useState } from "react";

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise Services</h2>
            <p className="text-xl text-gray-600">Custom solutions for your business technology needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-8">
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Enterprise Services</h2>
            <p className="text-xl text-red-600">Failed to load services. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const formatPrice = (service: Service) => {
    if (!service.price_pkr_min && !service.price_usd_min) {
      return "Custom Pricing";
    }
    
    if (service.price_pkr_max) {
      return `PKR ${service.price_pkr_min?.toLocaleString()} - ${service.price_pkr_max.toLocaleString()} / $${service.price_usd_min} - $${service.price_usd_max}`;
    }
    
    return `Starting at PKR ${service.price_pkr_min?.toLocaleString()} / $${service.price_usd_min}`;
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Enterprise Services</h2>
          <p className="text-xl text-gray-600">Custom solutions for your business technology needs</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service) => (
            <Card 
              key={service.id} 
              className="bg-white rounded-2xl apple-shadow hover:apple-shadow-hover transition-all cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <CardContent className="p-8">
                <img 
                  src={service.image_url} 
                  alt={service.title} 
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-blue-500 font-semibold">{formatPrice(service)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  );
}
