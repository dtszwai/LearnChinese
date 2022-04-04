import React from 'react';
import MDXComponentsOriginal from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import * as Tool from '@site/src/components/Tool';
import Quiz from '@site/src/components/Quiz';
import Review from '@site/src/components/Quiz/Review';
import { Rating, Typography } from '@mui/material';

export default {
  ...MDXComponentsOriginal,
  Tabs,
  TabItem,
  Quiz,
  Review,
  Author: Tool.Author,
  Remark: Tool.Remark,
  Annotate: Tool.Annotate,
  Highlight: Tool.Highlight,
  Display: Tool.Display,
  Tips: Tool.Tips,
  Text: Tool.Text,
  Youtube: ({ children, id, start = 0 }) =>
    Tool.Video(children ?? id, start, 'Youtube'),
  Bilibili: ({ children, id }) => Tool.Video(children ?? id, 0, 'Bilibili'),
  Carousel: Tool.Carousel,
  AudioCard: Tool.AudioCard,
  Task: Tool.Task,
  Rate: ({ label, value }: { label: String; value: number }) => (
    <Typography component='legend'>
      {label}
      <Rating
        name='read-only'
        value={value}
        style={{ verticalAlign: 'text-bottom' }}
        readOnly
      />
    </Typography>
  ),
  Py: ({ children }) => (
    <>
      <span className='py-circle'>粵</span>
      &nbsp;{children}
    </>
  ),
};
