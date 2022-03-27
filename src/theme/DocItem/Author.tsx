import React from 'react';
import Author from '@site/src/components/Tool/Author';

interface AuthorProps {
  name: string;
  dynasty?: string;
  source?: string;
}

export default (props: AuthorProps) => <Author {...props} />;
