import { courses } from "@/data/courses";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { CourseCard } from "@/components/CourseCard";
import { GraduationCap } from "lucide-react";

const Index = () => {
  const { getCourseProgress, isCourseCompleted } = useCourseProgress();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">LearnHub</h1>
              <p className="text-sm text-muted-foreground">Master new skills, one course at a time</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Explore Courses</h2>
          <p className="text-muted-foreground">
            Choose from our collection of courses and start learning today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={getCourseProgress(course.id, course.lessons.length)}
              isCompleted={isCourseCompleted(course.id)}
            />
          ))}
        </div>
      </main>

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 LearnHub. Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
