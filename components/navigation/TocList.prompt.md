Use `TocList` on any article with three or more headings. Below three, omit it.

```jsx
<TocList
  activeId="a-boundary"
  items={[
    { id: 'a-contract', label: 'The schema is the contract' },
    { id: 'a-boundary', label: 'Where the boundary lands' },
    { id: 'a-buys', label: 'What it buys you' }
  ]}
/>
```

Give each target heading `scroll-margin-top: 24px`. Smooth scroll comes from `scroll-behavior` on `:root`, so plain anchor hrefs are enough.
