Use `SectionHead` to open every section. It is the only place a 1px ink rule appears.

```jsx
<SectionHead label="Selected work" meta="Four of eleven" />
```

The label is sentence-cased in source but rendered uppercase by the component. Keep `meta` to a count, a range or a date; never a sentence.
