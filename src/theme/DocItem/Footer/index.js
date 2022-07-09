import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import DocsRating from '@site/src/components/DocsRating';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <DocsRating />
    </>
  );
}
