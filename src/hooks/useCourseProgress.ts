import { useState, useEffect } from "react";
import { CourseProgress } from "@/types/course";

const STORAGE_KEY = "elearning_progress";

export const useCourseProgress = () => {
  const [progress, setProgress] = useState<CourseProgress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleLesson = (courseId: string, lessonId: string) => {
    setProgress((prev) => {
      const courseProgress = prev[courseId] || { completedLessons: [], isCompleted: false };
      const completedLessons = courseProgress.completedLessons.includes(lessonId)
        ? courseProgress.completedLessons.filter((id) => id !== lessonId)
        : [...courseProgress.completedLessons, lessonId];

      return {
        ...prev,
        [courseId]: {
          ...courseProgress,
          completedLessons,
        },
      };
    });
  };

  const markCourseComplete = (courseId: string) => {
    setProgress((prev) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        isCompleted: true,
      },
    }));
  };

  const getCourseProgress = (courseId: string, totalLessons: number) => {
    const courseProgress = progress[courseId];
    if (!courseProgress) return 0;
    return (courseProgress.completedLessons.length / totalLessons) * 100;
  };

  const isLessonCompleted = (courseId: string, lessonId: string) => {
    return progress[courseId]?.completedLessons.includes(lessonId) || false;
  };

  const isCourseCompleted = (courseId: string) => {
    return progress[courseId]?.isCompleted || false;
  };

  return {
    toggleLesson,
    markCourseComplete,
    getCourseProgress,
    isLessonCompleted,
    isCourseCompleted,
  };
};
