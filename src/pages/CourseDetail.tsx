import { useParams, Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LessonItem } from "@/components/LessonItem";
import { ArrowLeft, BookOpen, Clock, Award, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find((c) => c.id === id);
  const {
    toggleLesson,
    markCourseComplete,
    getCourseProgress,
    isLessonCompleted,
    isCourseCompleted,
  } = useCourseProgress();

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course not found</h1>
          <Link to="/">
            <Button variant="link">Return to courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = getCourseProgress(course.id, course.lessons.length);
  const isCompleted = isCourseCompleted(course.id);
  const allLessonsCompleted = progress === 100;

  const handleCompleteCourse = () => {
    markCourseComplete(course.id);
    toast.success("Congratulations! Course completed!", {
      description: "You've finished all lessons in this course.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div
        className="h-80 bg-gradient-to-br from-primary to-primary-glow relative"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="flex flex-col justify-end h-full pb-8 text-white">
            <Link to="/">
              <Button variant="ghost" className="mb-4 text-white hover:bg-white/20 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-white/90 mb-4 max-w-3xl">{course.description}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{course.lessons.length} lessons</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {course.level}
              </Badge>
              <span>by {course.instructor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-[var(--shadow-card)] p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Progress</h2>
              {isCompleted && (
                <div className="flex items-center gap-2 text-accent">
                  <Award className="h-5 w-5" />
                  <span className="font-medium">Completed</span>
                </div>
              )}
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
                <span className="font-medium">
                  {course.lessons.filter((l) => isLessonCompleted(course.id, l.id)).length} /{" "}
                  {course.lessons.length} lessons
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
            {allLessonsCompleted && !isCompleted && (
              <Button onClick={handleCompleteCourse} className="w-full" size="lg">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Mark Course as Completed
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Lessons</h2>
            {course.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                isCompleted={isLessonCompleted(course.id, lesson.id)}
                onToggle={() => {
                  toggleLesson(course.id, lesson.id);
                  const newStatus = !isLessonCompleted(course.id, lesson.id);
                  toast.success(
                    newStatus ? "Lesson marked as completed!" : "Lesson marked as incomplete",
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
