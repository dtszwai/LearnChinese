import React from 'react';
import DocItemFooter from '@theme-original/DocItemFooter';
import DocsRating from '@site/src/components/DocsRating';

export default (props) => (
  <>
    <DocItemFooter {...props} />
    <DocsRating {...props} />
  </>
);
