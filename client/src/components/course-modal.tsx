import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CourseModalProps {
  course: any;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-lg rounded-2xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <CardContent className="p-0">
          <div className="flex flex-col items-center">
            <div
              className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-xl flex items-center justify-center mb-4`}
            >
              <span className="text-white text-2xl">{course.icon}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="mb-4">
              <span className="text-xl font-bold text-blue-500">
                PKR {course.price_pkr?.toLocaleString()}
              </span>
              <span className="text-gray-500 ml-2">/ ${course.price_usd}</span>
            </div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                Duration: {course.duration}
              </span>
            </div>
            <Button onClick={onClose} className="mt-2 w-full">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseModal;
