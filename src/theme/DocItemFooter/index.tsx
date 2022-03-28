import React from 'react';
import DocItemFooter from '@theme-original/DocItemFooter';
import DocsRating from '../../components/DocsRating';

export default function DocItemFooterWrapper(props) {
  return (
    <>
      <DocItemFooter {...props} />
      <DocsRating {...props} />
    </>
  );
}
