import React from 'react';
import MDXComponentsOriginal from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import * as Tool from '@site/src/components/Tool';
import Admonition from '@theme/Admonition';
import Quiz from '@site/src/components/Quiz';
import { Rating, Typography } from '@mui/material';

export default {
  ...MDXComponentsOriginal,
  Tabs,
  TabItem,
  Author: Tool.Author,
  Remark: Tool.Remark,
  Annotate: Tool.Annotate,
  Highlight: Tool.Highlight,
  Youtube: ({ children, id, start = 0 }) =>
    Tool.Video(children ?? id, start, 'Youtube'),
  Bilibili: ({ children, id }) => Tool.Video(children ?? id, 0, 'Bilibili'),
  Admonition,
  Quiz,
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
