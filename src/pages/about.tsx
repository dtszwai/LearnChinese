import React from 'react';
import Layout from '@theme/Layout';

export default () => (
  <Layout title={`About`}>
    <main className='container' style={{ marginTop: '3rem' }}>
      <h1 style={{ fontFamily: 'inherit' }}>About</h1>
      <p>
        This site was created in December 2021 by Tam Tsz Wai in response to the
        students' desire to learn more about the subject, and regularly updated
        since then.
      </p>
      <p>
        The site is built with{' '}
        <a href='https://docusaurus.io/' target='_blank'>
          Docusaurus
        </a>
        . All of the code for the website is open source and available on{' '}
        <a href='https://github.com/rccttwd/rccttwd.github.io' target='_blank'>
          GitHub
        </a>
        . Everyone is welcome to contribute.
      </p>
      <p>Please get in touch if you have any comments or suggestions.</p>
      <p>
        I can be reached at:{' '}
        <a href='mailto:dtszwai@gmail.com' target='_blank'>
          dtszwai@gmail.com
        </a>{' '}
        /{' '}
        <a href='https://github.com/rccttwd' target='_blank'>
          GitHub
        </a>
        .
      </p>
      <p>
        You may also fill in the form:{' '}
        <a href='https://forms.gle/xpLMZ6VPBXpyneaK7' target='_blank'>
          https://forms.gle/xpLMZ6VPBXpyneaK7
        </a>
      </p>
      <p>Thanks for your visit.</p>
    </main>
  </Layout>
);
