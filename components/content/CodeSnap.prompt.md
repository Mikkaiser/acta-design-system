Use `CodeSnap` for every code block. There is no plain `<pre>` in this system.

```jsx
<CodeSnap tabs={['score.action.ts', 'schema.ts']} activeTab={0}>
  <Syn kind="comment">{'// revalidate after a score is filed\n'}</Syn>
  <Syn kind="keyword">export async function</Syn>{' '}
  <Syn kind="fn">fileScore</Syn>{'('}<Syn kind="param" italic>input</Syn>{') {'}
</CodeSnap>
```

A newline must sit INSIDE a `Syn` run, never alone between two sibling elements, or the template drops it and merges the lines. Traffic lights are decoration and carry no interaction. The card scrolls sideways and never wraps.
