import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course } from "@shared/schema";
import { CourseModal } from "@/components";
import { useState } from "react";

export default function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { data: courses, isLoading, error } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  if (isLoading) {
    return (
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Professional Courses</h2>
            <p className="text-xl text-gray-600">Comprehensive training programs designed by industry experts</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
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
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Professional Courses</h2>
            <p className="text-xl text-red-600">Failed to load courses. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Professional Courses</h2>
          <p className="text-xl text-gray-600">Comprehensive training programs designed by industry experts</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <Card 
              key={course.id} 
              className="course-card bg-white rounded-2xl apple-shadow p-8 cursor-pointer hover:apple-shadow-hover transition-all"
              onClick={() => setSelectedCourse(course)}
            >
              <CardContent className="p-0">
                <div className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  <span className="text-white text-2xl">{course.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-500">PKR {course.price_pkr.toLocaleString()}</span>
                    <span className="text-gray-500 ml-2">/ ${course.price_usd}</span>
                  </div>
                  <Badge variant="secondary" className="text-sm text-gray-500">
                    {course.duration}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <CourseModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </section>
  );
}
