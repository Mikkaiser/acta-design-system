Use `Field` for every text input in the system. It owns its label, helper and error line so the spacing stays consistent.

```jsx
<Field id="email" label="Email" placeholder="you@company.com" helper="Helper text sits here." />
<Field id="bad" label="Email" value="not-an-email" error="Enter a valid address." />
<Field id="note" label="Textarea" multiline rows={3} placeholder="What are you building?" />
```

`error` takes precedence over `helper`. The signal colour appears here and nowhere else in the system.
