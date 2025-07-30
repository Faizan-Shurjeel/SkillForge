import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Sheikh",
    role: "Data Scientist at Tech Corp",
    avatar: "AS",
    rating: 5,
    content: "The AI course completely transformed my career. The hands-on approach and real-world projects gave me the confidence to transition into machine learning.",
    bgColor: "bg-blue-500"
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Software Engineer",
    avatar: "SK",
    rating: 5,
    content: "Excellent instruction quality and comprehensive curriculum. The Python course covered everything I needed to become a full-stack developer.",
    bgColor: "bg-purple-500"
  },
  {
    id: 3,
    name: "Muhammad Ali",
    role: "Security Analyst",
    avatar: "MA",
    rating: 5,
    content: "The cybersecurity course was comprehensive and practical. I'm now working as a security analyst thanks to the skills I learned here.",
    bgColor: "bg-green-500"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-xl text-gray-600">Success stories from our community of learners</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-50 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className={`w-12 h-12 ${testimonial.bgColor} text-white font-semibold`}>
                    <AvatarFallback className={`${testimonial.bgColor} text-white`}>
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
