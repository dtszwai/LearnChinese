export type LessonData = {
  image?: string;
  topic?: string;
  title: string;
  description: string;
  content?: string;
  prefix?: string;
  suffix?: string;
  initialValue?: string;
  placeholder?: string;
  regexMatch?: string[];
  suggestedAnswer?: string[];
  videoURL?: string;
  readOnly?: boolean;
  interactive?: boolean;
  applyRegex?: boolean;
};
