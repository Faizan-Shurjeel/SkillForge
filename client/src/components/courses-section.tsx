import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseModal } from "@/components";
import { useState } from "react";
import { coursesData } from "@/lib/courses-data";

export default function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const courses = coursesData;

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Professional Courses</h2>
          <p className="text-xl text-gray-600">
            Comprehensive training programs designed by industry experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <Card
              key={course.id}
              className="course-card bg-white rounded-2xl apple-shadow p-8 cursor-pointer hover:apple-shadow-hover transition-all"
              onClick={() => setSelectedCourse(course)}
            >
              <CardContent className="p-0">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-xl flex items-center justify-center mb-6`}
                >
                  <span className="text-white text-2xl">{course.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-500">
                      PKR {course.price_pkr.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-2">
                      / ${course.price_usd}
                    </span>
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
