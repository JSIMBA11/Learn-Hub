export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  lessons: Lesson[];
  thumbnail: string;
}

export interface CourseProgress {
  [courseId: string]: {
    completedLessons: string[];
    isCompleted: boolean;
  };
}
