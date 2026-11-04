# Native apps spike

Spike code for #197. The decision it supports is in
`docs/decisions/0001-native-apps.md`.

Nothing here is built or shipped, and nothing here changes an app.

## inventory.py

Measures what a native port of each SquirrelGo app would have to replace: the
app's own JavaScript, the shared modules it carries, its data and audio, and the
JavaScript bridge methods its Android activity exposes.

```bash
python3 spikes/native-apps/inventory.py
```

It prints a Markdown table. Rerun it before the pilot starts, because the numbers
change as content moves to the shared source.
