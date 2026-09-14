Use `Button` for any action or navigation target that needs a hit area; use a plain `<a>` for links inside running prose.

```jsx
<Button variant="primary" href="mailto:mikaelrsimoes19@gmail.com">Get in touch</Button>
<Button variant="secondary">Read the case</Button>
<Button variant="ghost">All posts</Button>
```

Variants: `primary` (ink fill, one per view), `secondary` (hairline outline), `ghost` (underline only, for tertiary actions). Pass `disabled` for the sunken state. Hover changes fill or border only, over 120ms; never add a transform.
