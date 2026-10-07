import React from 'react';
import { CodeSnap, Syn } from 'acta-design-system';
import { Ground } from './ground';

export const AllKinds = () => (
  <Ground>
    <CodeSnap tabs={['palette.ts']}>
      <Syn kind="comment">{'// one Syn per kind, in Dracula\n'}</Syn>
      <Syn kind="keyword">{'keyword'}</Syn>{'  '}
      <Syn kind="type">{'Type'}</Syn>{'  '}
      <Syn kind="fn">{'fn'}</Syn>{'  '}
      <Syn kind="param" italic>{'param'}</Syn>{'  '}
      <Syn kind="literal">{"'literal'"}</Syn>{'  '}
      <Syn kind="plain">{'plain'}</Syn>
    </CodeSnap>
  </Ground>
);

export const ItalicParams = () => (
  <Ground>
    <CodeSnap tabs={['handler.ts']}>
      <Syn kind="keyword">function</Syn>{' '}<Syn kind="fn">handle</Syn>{'('}
      <Syn kind="param" italic>req</Syn>{', '}<Syn kind="param" italic>res</Syn>{') {}'}
    </CodeSnap>
  </Ground>
);
