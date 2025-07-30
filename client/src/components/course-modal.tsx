import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Course } from "@shared/schema";
import { CheckCircle } from "lucide-react";

interface CourseModalProps {
  course: Course;
  onClose: () => void;
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    experience_level: "",
    learning_goals: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const enrollmentMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/enrollments", {
        ...data,
        course_id: course.id
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Enrollment successful!",
        description: "We'll contact you within 24 hours with course details.",
      });
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        experience_level: "",
        learning_goals: ""
      });
      setIsEnrolling(false);
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      onClose();
    },
    onError: () => {
      toast({
        title: "Enrollment failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.experience_level) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    enrollmentMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">{course.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Course Overview</h3>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium">Duration:</span>
                  <span className="text-gray-600">{course.duration}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium">Level:</span>
                  <span className="text-gray-600">{course.level}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium">Price:</span>
                  <span className="text-blue-500 font-semibold">PKR {course.price_pkr.toLocaleString()} / ${course.price_usd}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium">Certification:</span>
                  <span className="text-gray-600">{course.certification}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Topics Covered</h3>
              <div className="grid grid-cols-1 gap-2 mb-6">
                {course.topics.map((topic, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((tool, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Course Outline</h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="prose prose-sm max-w-none">
                {course.outline.split('\n').map((line, index) => (
                  <div key={index} className="mb-2">
                    {line.includes('Week') ? (
                      <p className="font-semibold text-gray-900">{line}</p>
                    ) : line.trim() ? (
                      <p className="text-gray-700 ml-4">{line}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!isEnrolling ? (
            <div className="text-center">
              <Button 
                onClick={() => setIsEnrolling(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl transition-colors"
              >
                Enroll in Course
              </Button>
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Enroll Now</h3>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
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
                  <Label htmlFor="experience_level">Prior Experience Level *</Label>
                  <Select value={formData.experience_level} onValueChange={(value) => setFormData(prev => ({ ...prev, experience_level: value }))}>
                    <SelectTrigger className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="learning_goals">Learning Goals</Label>
                  <Textarea
                    id="learning_goals"
                    name="learning_goals"
                    value={formData.learning_goals}
                    onChange={handleInputChange}
                    placeholder="Tell us about your learning goals"
                    rows={3}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={enrollmentMutation.isPending}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    {enrollmentMutation.isPending ? "Enrolling..." : "Enroll in Course"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsEnrolling(false)}
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
