Use `EntryRow` for every item in a list of work or writing. Wrap a set in a container with `borderTop: 1px solid var(--rule)`.

```jsx
<EntryRow date="2025" kicker="ADVETI" title="Student Management Platform"
  summary="Training tracking and reporting for Emirates Skills competitors. Next.js and MariaDB." />
<EntryRow date="03·26" duration="8 min" title="Clean architecture in a government codebase"
  summary="What survives contact with a ten-year-old Oracle schema." />
```

Omit `duration` for work, include it for posts. Keep the summary to one sentence.
