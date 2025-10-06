import { Course } from "@/types/course";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Course;
  progress: number;
  isCompleted: boolean;
}

export const CourseCard = ({ course, progress, isCompleted }: CourseCardProps) => {
  return (
    <Link to={`/course/${course.id}`} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1">
        <div className="aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>
            {isCompleted && (
              <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
            )}
          </div>
          <CardDescription className="line-clamp-2">{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessons.length} lessons</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{course.level}</Badge>
            <span className="text-sm text-muted-foreground">by {course.instructor}</span>
          </div>
          {progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
