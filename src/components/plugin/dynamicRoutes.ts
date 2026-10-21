import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { LoadContext, Plugin } from '@docusaurus/types';
import type { Lesson, LessonData, PublishedLesson } from '../Learn/types';

export default function dynamicRoutes({ siteDir }: LoadContext): Plugin<PublishedLesson[]> {
  const directory = path.join(siteDir, 'src/data/Learn');
  return {
    name: 'plugin-dynamic-routes',
    getPathsToWatch: () => [path.join(directory, '*.json')],
    async loadContent() {
      const lessons: Record<string, Lesson> = JSON.parse(await readFile(path.join(directory, 'index.json'), 'utf8'));
      return Promise.all(
        Object.values(lessons)
          .filter((lesson) => lesson.published !== false)
          .map(async (lesson) => {
            const data: LessonData[] = JSON.parse(await readFile(path.join(directory, lesson.slug + '.json'), 'utf8'));
            return { ...lesson, total: data.length };
          }),
      );
    },
    async contentLoaded({ content, actions }) {
      const published = content ?? [];
      actions.setGlobalData({ lessons: published });
      for (const lesson of published) {
        const metadata = await actions.createData(lesson.slug + '.json', JSON.stringify(lesson));
        actions.addRoute({
          path: '/learn/' + lesson.slug,
          exact: true,
          component: '@site/src/components/Learn',
          modules: { lesson: metadata, data: path.join(directory, lesson.slug + '.json') },
        });
      }
    },
  };
}
