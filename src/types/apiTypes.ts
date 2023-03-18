export interface AllCoursesType {
    id: string;
    title: string;
    tags: string[];
    launchDate: string;
    status: string;
    description: string;
    duration: number;
    lessonsCount: number;
    containsLockedLessons: boolean;
    previewImageLink: string;
    rating: number;
    meta: MetaType;
}

export interface CourseListType {
    courses: AllCoursesType[];
}

export interface LessonType {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: "video";
    status: "locked" | "unlocked";
    link: string;
    previewImageLink: string;
    meta: null;
}

export interface CourseVideoPreviewType {
    link: string;
    duration: number;
    previewImageLink: string;
}

export interface MetaType {
    slug: string;
    skills?: string[];
    courseVideoPreview?: CourseVideoPreviewType;
    fullCourseProductId?: string;
    fullCourseProductFamily?: string;
}

export interface CourseByIdType {
    id: string;
    title: string;
    tags: string[];
    launchDate: string;
    status: string;
    description: string;
    duration: number;
    previewImageLink: string;
    rating: number;
    meta: MetaType;
    lessons: LessonType[];
    containsLockedLessons: boolean;
}

