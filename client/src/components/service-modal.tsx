import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight } from "lucide-react";

interface ServiceModalProps {
  service: any;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [isInquiring, setIsInquiring] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    project_description: "",
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.project_description
    ) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate successful inquiry
    toast({
      title: "Inquiry submitted successfully!",
      description: "We'll contact you within 24 hours with a detailed quote.",
    });
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      company: "",
      project_description: "",
    });
    setIsInquiring(false);
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formatPrice = () => {
    if (!service.price_pkr_min && !service.price_usd_min) {
      return "Custom Pricing";
    }

    if (service.price_pkr_max) {
      return `PKR ${service.price_pkr_min?.toLocaleString()} - ${service.price_pkr_max.toLocaleString()} / $${
        service.price_usd_min
      } - $${service.price_usd_max}`;
    }

    return `Starting at PKR ${service.price_pkr_min?.toLocaleString()} / $${
      service.price_usd_min
    }`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            {service.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Service Overview</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>

              <div className="mb-6">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium">Pricing:</span>
                  <span className="text-blue-500 font-semibold">
                    {formatPrice()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tools.map((tool: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 text-gray-700"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Services Included</h3>
              <div className="space-y-2">
                {service.services_included.map(
                  (serviceItem: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{serviceItem}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Deliverables</h3>
              <div className="space-y-2">
                {service.deliverables.map(
                  (deliverable: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <ArrowRight className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{deliverable}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {!isInquiring ? (
            <div className="text-center">
              <Button
                onClick={() => setIsInquiring(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl transition-colors"
              >
                Start Your Project
              </Button>
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Request Quote</h3>
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4"
              >
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company/Organization"
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="project_description">
                    Project Description & Requirements *
                  </Label>
                  <Textarea
                    id="project_description"
                    name="project_description"
                    value={formData.project_description}
                    onChange={handleInputChange}
                    placeholder="Describe your project requirements"
                    rows={4}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    Request Quote
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsInquiring(false)}
                    className="px-6 py-3 border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-colors"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* (Removed duplicate export default ServiceModal) */
