export type Lesson = {
  key: string;
  slug: string;
  title: string;
  description: string;
  published?: boolean;
};

export type PublishedLesson = Lesson & { total: number };

export type LessonData = {
  id?: string;
  interaction?: 'choice' | 'passage' | 'sequence';
  options?: { value: string; label: string }[];
  correctOrder?: string[];
  explanation?: string;
  recommendations?: { title: string; description: string; href: string }[];
  image?: string;
  topic?: string;
  title: string;
  description?: string;
  content?: string;
  prefix?: string;
  suffix?: string;
  initialValue?: string;
  placeholder?: string;
  regexMatch?: string[];
  suggestedAnswer?: string[];
  videoURL?: string;
  noHint?: boolean;
  interactive?: boolean;
  applyRegex?: boolean;
};
