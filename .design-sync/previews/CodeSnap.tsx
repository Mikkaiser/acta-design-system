import React from 'react';
import { CodeSnap, Syn } from 'acta-design-system';
import { Ground } from './ground';

export const ServerAction = () => (
  <Ground>
    <CodeSnap tabs={['score.action.ts', 'schema.ts']} activeTab={0}>
      <Syn kind="comment">{'// revalidate after a score is filed\n'}</Syn>
      <Syn kind="keyword">export async function</Syn>{' '}
      <Syn kind="fn">fileScore</Syn>{'('}<Syn kind="param" italic>input</Syn>{': '}<Syn kind="type">ScoreInput</Syn>{') {\n'}
      {'  '}<Syn kind="keyword">const</Syn>{' parsed = '}<Syn kind="fn">scoreSchema</Syn>{'.'}<Syn kind="fn">parse</Syn>{'('}<Syn kind="param" italic>input</Syn>{');\n'}
      {'  '}<Syn kind="keyword">await</Syn>{' db.'}<Syn kind="fn">insert</Syn>{'(scores).'}<Syn kind="fn">values</Syn>{'(parsed);\n'}
      {'  '}<Syn kind="fn">revalidatePath</Syn>{'('}<Syn kind="literal">{"'/competitors'"}</Syn>{');\n'}
      {'}'}
    </CodeSnap>
  </Ground>
);

export const SingleTab = () => (
  <Ground>
    <CodeSnap tabs={['docker-compose.yml']}>
      <Syn kind="keyword">services</Syn>{':\n'}
      {'  '}<Syn kind="fn">rabbitmq</Syn>{':\n'}
      {'    image: '}<Syn kind="literal">rabbitmq:3-management</Syn>{'\n'}
      {'    ports: ['}<Syn kind="literal">5672:5672</Syn>{', '}<Syn kind="literal">15672:15672</Syn>{']'}
    </CodeSnap>
  </Ground>
);
