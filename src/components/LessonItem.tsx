import { Lesson } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface LessonItemProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggle: () => void;
}

export const LessonItem = ({ lesson, isCompleted, onToggle }: LessonItemProps) => {
  return (
    <Card className="p-4 transition-all duration-300 hover:shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="flex-shrink-0 hover:scale-110 transition-transform"
          >
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-accent" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground" />
            )}
          </Button>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium transition-colors ${
                isCompleted ? "text-muted-foreground line-through" : ""
              }`}
            >
              {lesson.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Clock className="h-3 w-3" />
              <span>{lesson.duration}</span>
            </div>
          </div>
        </div>
        {isCompleted && (
          <span className="text-sm font-medium text-accent flex-shrink-0">Completed</span>
        )}
      </div>
    </Card>
  );
};
