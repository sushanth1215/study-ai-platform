import { create } from 'zustand'
import { Lesson, Folder } from '@types/index'

interface LessonStore {
  lessons: Lesson[]
  folders: Folder[]
  currentLesson: Lesson | null
  setLessons: (lessons: Lesson[]) => void
  setFolders: (folders: Folder[]) => void
  setCurrentLesson: (lesson: Lesson | null) => void
  addLesson: (lesson: Lesson) => void
  removeLesson: (lessonId: string) => void
  updateLesson: (lesson: Lesson) => void
}

export const useLessonStore = create<LessonStore>((set) => ({
  lessons: [],
  folders: [],
  currentLesson: null,
  setLessons: (lessons) => set({ lessons }),
  setFolders: (folders) => set({ folders }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
  addLesson: (lesson) =>
    set((state) => ({
      lessons: [...state.lessons, lesson],
    })),
  removeLesson: (lessonId) =>
    set((state) => ({
      lessons: state.lessons.filter((l) => l.id !== lessonId),
    })),
  updateLesson: (lesson) =>
    set((state) => ({
      lessons: state.lessons.map((l) => (l.id === lesson.id ? lesson : l)),
    })),
}))
