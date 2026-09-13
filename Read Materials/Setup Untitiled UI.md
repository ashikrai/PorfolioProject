# Integrating Untitled UI with an Existing Vite + React Project

## Overview

If you already have an **existing Vite + React project**, you do **not** need to create a new Untitled UI project.

The current Untitled UI CLI allows you to add Untitled UI components directly into an existing Vite project.

The current Untitled UI React stack uses:

- React 19.2
- Tailwind CSS 4.3
- React Aria
- Untitled UI CLI
- `@untitledui/icons`

The CLI currently defaults to **component library v8**.

---

# 1. Understand How Untitled UI Works

Untitled UI is slightly different from libraries such as Material UI.

With Material UI, you typically import a component directly from an npm package:

```tsx
import { Button } from "@mui/material";
```

The component implementation remains inside the installed package.

With Untitled UI, the CLI adds the **component's source code into your project**.

For example, after adding a Button, you may have something like:

```text
src/
├── components/
│   └── base/
│       └── buttons/
│           └── button.tsx
│
├── hooks/
├── utils/
├── styles/
└── App.tsx
```

Then you import your own component:

```tsx
import { Button } from "@/components/base/buttons/button";
```

You effectively **own the component source code**, so you can modify it.

---

# 2. Check Your Existing Vite Project

Go to your project:

```bash
cd my-vite-project
```

Check your `package.json`:

```bash
cat package.json
```

You should have something similar to:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Then start your application:

```bash
npm run dev
```

Make sure your existing application works **before installing Untitled UI**.

---

# 3. Check Your Tailwind Version

This is particularly important.

The current Untitled UI React documentation uses **Tailwind CSS v4.3**.

Check your installed version:

```bash
npm list tailwindcss
```

If you see something like:

```text
tailwindcss@4.x.x
```

you are good.

If you are using Tailwind v3, it is recommended to upgrade rather than trying to mix the older Tailwind setup with the current Untitled UI setup.

---

# 4. Install the Required Packages

For an existing Vite project, install the required packages:

```bash
npm install @untitledui/icons react-aria-components tailwindcss @tailwindcss/vite tailwindcss-react-aria-components tailwind-merge tailwindcss-animate
```

These packages provide the main dependencies required by the current Untitled UI Vite integration.

---

# 5. Configure `vite.config.ts`

Open:

```text
vite.config.ts
```

You need the Tailwind Vite plugin and the `@` alias.

For example:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
```

The important parts are:

```ts
import tailwindcss from "@tailwindcss/vite";
```

and:

```ts
tailwindcss(),
```

and:

```ts
resolve: {
  alias: {
    "@": resolve(__dirname, "./src"),
  },
},
```

---

## Why the `@` Alias?

The alias allows you to write:

```tsx
import { Button } from "@/components/base/buttons/button";
```

instead of using long relative paths such as:

```tsx
import { Button } from "../../../components/base/buttons/button";
```

This makes imports much cleaner.

---

# 6. Configure the TypeScript Alias

If your project uses TypeScript, configure the `@` alias in your TypeScript configuration as well.

You want the TypeScript resolver to understand:

```text
@/*
```

as:

```text
src/*
```

For example:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

The important section is:

```json
"paths": {
  "@/*": ["src/*"]
}
```

Untitled UI's `components.json` configuration should use the same aliases.

---

## Important Note for Newer TypeScript Versions

If your project is using a newer TypeScript version and you are seeing the warning:

> `baseUrl` is deprecated

do **not** blindly copy an older `baseUrl` configuration.

The Vite resolver and TypeScript resolver need to agree, but the exact configuration can depend on your TypeScript version.

If your existing project already has a TypeScript alias configuration, preserve it and integrate the Untitled UI configuration rather than replacing the entire file.

---

# 7. Configure the CSS Theme

Untitled UI uses theme tokens that need to be available to your application.

Create:

```text
src/styles/theme.css
```

For example:

```css
@theme {
  --font-body: var(--font-inter, "Inter"), -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --font-display: var(--font-inter, "Inter"), -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --font-mono: ui-monospace, "Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  --text-xs: calc(var(--spacing) * 3);
  --text-xs--line-height: calc(var(--spacing) * 4.5);

  --text-sm: calc(var(--spacing) * 3.5);
  --text-sm--line-height: calc(var(--spacing) * 5);

  --text-md: calc(var(--spacing) * 4);
  --text-md--line-height: calc(var(--spacing) * 6);

  --text-lg: calc(var(--spacing) * 4.5);
  --text-lg--line-height: calc(var(--spacing) * 7);

  --text-xl: calc(var(--spacing) * 5);
  --text-xl--line-height: calc(var(--spacing) * 7.5);
}
```

The actual Untitled UI `theme.css` contains a larger set of theme tokens. The above is a shortened example showing the structure.

For a production integration, use the theme generated/recommended by the current Untitled UI CLI rather than manually copying an incomplete theme.

---

# 8. Configure `globals.css` or `index.css`

Your existing project probably already has something similar to:

```text
src/
└── index.css
```

or:

```text
src/
└── styles/
    └── globals.css
```

The important thing is that your global stylesheet imports Tailwind and the Untitled UI theme.

For example:

```css
@import "tailwindcss";
@import "./theme.css";
```

If your files are organized like this:

```text
src/
├── index.css
└── styles/
    └── theme.css
```

then use:

```css
@import "tailwindcss";
@import "./styles/theme.css";
```

Adjust the path according to your project structure.

---

# 9. Make Sure the CSS Is Imported

Open:

```text
src/main.tsx
```

You should have something similar to:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

The exact structure may differ depending on your existing application.

The important part is that the global CSS file containing Tailwind and the Untitled UI theme is imported.

For example:

```tsx
import "./styles/globals.css";
```

or:

```tsx
import "./index.css";
```

depending on your project.

---

# 10. Initialize Untitled UI

The current Untitled UI CLI provides an `init` command.

Before doing this, **commit your existing project to Git**.

For example:

```bash
git add .
git commit -m "Before Untitled UI integration"
```

This gives you an easy rollback point if the initializer changes something you don't want.

Then, from your project root, run:

```bash
npx untitledui@latest init
```

If your CLI version expects the framework explicitly, use:

```bash
npx untitledui@latest init --vite
```

The initializer can configure the project for Untitled UI and create/update the required configuration.

---

# 11. `components.json`

Untitled UI uses a configuration file called:

```text
components.json
```

This tells the CLI where your:

- Components
- Utilities
- Hooks
- Styles

are located.

A typical Vite configuration looks conceptually like:

```json
{
  "aliases": {
    "components": "@/components/",
    "utils": "@/utils/",
    "hooks": "@/hooks/",
    "styles": "@/styles/"
  },
  "framework": "vite"
}
```

The exact generated file should be preferred over manually creating one because the current CLI can configure it for you.

---

# 12. Add Your First Untitled UI Component

This is where Untitled UI becomes useful.

Suppose you want the Button component.

Run:

```bash
npx untitledui@latest add button
```

The CLI will add the Button's source code to your project.

You can also add multiple components at once:

```bash
npx untitledui@latest add button avatar input
```

---

# 13. Where Does the Button Go?

After running:

```bash
npx untitledui@latest add button
```

you will have something similar to:

```text
src/
├── components/
│   └── base/
│       └── buttons/
│           └── button.tsx
│
├── hooks/
├── utils/
├── styles/
├── App.tsx
└── main.tsx
```

The exact location depends on the aliases/path configuration generated by your project.

---

# 14. Use the Button

Open:

```text
src/App.tsx
```

Then import the component:

```tsx
import { Button } from "@/components/base/buttons/button";
```

Use it:

```tsx
function App() {
  return (
    <div className="p-8">
      <Button>
        Click me
      </Button>
    </div>
  );
}

export default App;
```

Start your application:

```bash
npm run dev
```

You should now see the Untitled UI Button in your existing Vite React application.

---

# 15. Using Untitled UI Icons

Untitled UI also provides an icon package.

The package is:

```text
@untitledui/icons
```

For example:

```tsx
import { Plus } from "@untitledui/icons";
```

You can use the icon with components that support leading/trailing icons.

For example:

```tsx
<Button
  iconLeading={Plus}
>
  Add user
</Button>
```

The current Vite setup explicitly installs:

```text
@untitledui/icons
```

---

# 16. Adding More Components

You do not need to install the entire Untitled UI library.

For example, you can add a Button:

```bash
npx untitledui@latest add button
```

Then add an Input:

```bash
npx untitledui@latest add input
```

Then a Modal:

```bash
npx untitledui@latest add modal
```

Then a Table:

```bash
npx untitledui@latest add table
```

Then a Dropdown:

```bash
npx untitledui@latest add dropdown
```

You can also add multiple components in a single command:

```bash
npx untitledui@latest add button input modal table dropdown
```

Or run:

```bash
npx untitledui@latest add
```

to use the interactive component selection.

---

# 17. Recommended Project Structure

Since you already have an existing Vite React application, a good structure is:

```text
my-react-app/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── base/
│   │   │   ├── buttons/
│   │   │   │   └── button.tsx
│   │   │   ├── input/
│   │   │   ├── avatars/
│   │   │   └── ...
│   │   │
│   │   └── application/
│   │
│   ├── pages/
│   │
│   ├── hooks/
│   │
│   ├── utils/
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── components.json
├── vite.config.ts
├── tsconfig.json
├── package.json
└── ...
```

---

# 18. Keep Untitled UI Components Separate From Your Application Components

A useful organization is:

```text
components/
│
├── base/                 ← Untitled UI components
│   ├── buttons/
│   ├── inputs/
│   ├── avatars/
│   └── ...
│
└── app/                  ← Your application-specific components
    ├── UserProfile.tsx
    ├── Dashboard.tsx
    └── NetworkStatus.tsx
```

This gives you a clear separation.

For example:

```text
components/base/
```

contains reusable Untitled UI components.

While:

```text
components/app/
```

contains components specific to your application.

---

# 19. Do Not Install Every Component

You generally **do not need to install every Untitled UI component**.

If your application needs:

```text
Button
Input
Modal
Table
Dropdown
```

you can simply run:

```bash
npx untitledui@latest add button input modal table dropdown
```

This adds only the components you actually need.

This is one of the advantages of Untitled UI's source-code-based approach.

---

# 20. What About Untitled UI PRO Components?

If you have Untitled UI PRO, authenticate the CLI:

```bash
npx untitledui@latest login
```

After authentication, you can add PRO components using the CLI.

For example:

```bash
npx untitledui@latest add <pro-component>
```

PRO components require authentication.

---

# 21. Important Difference Between `init` and `add`

This distinction is important.

## `init`

For example:

```bash
npx untitledui@latest init --vite
```

means:

> Configure a project for Untitled UI.

It is primarily used to initialize/configure the project.

---

## `add`

For example:

```bash
npx untitledui@latest add button
```

means:

> Add the Untitled UI Button component to my project.

After that, you can import and use the component.

---

# 22. Overall Workflow

The overall process looks like this:

```text
Existing Vite + React Project
              │
              ▼
    Install Untitled UI dependencies
              │
              ▼
       Configure Vite
              │
              ▼
      Configure Tailwind
              │
              ▼
       Configure CSS/theme
              │
              ▼
      Configure components.json
              │
              ▼
 npx untitledui@latest add button
              │
              ▼
   Button source added to YOUR project
              │
              ▼
import { Button } ...
              │
              ▼
          <Button />
```

---

# 23. Recommended Installation Sequence

For an existing Vite React project, the practical sequence is:

## Step 1 — Commit your existing project

```bash
git add .
git commit -m "Before Untitled UI integration"
```

---

## Step 2 — Check Tailwind

```bash
npm list tailwindcss
```

Make sure you are using the Tailwind version expected by the current Untitled UI documentation.

---

## Step 3 — Install dependencies

```bash
npm install @untitledui/icons react-aria-components tailwindcss @tailwindcss/vite tailwindcss-react-aria-components tailwind-merge tailwindcss-animate
```

---

## Step 4 — Configure Vite

Add:

```ts
import tailwindcss from "@tailwindcss/vite";
```

and:

```ts
tailwindcss()
```

to the Vite plugins.

Also configure the `@` alias if it is not already configured.

---

## Step 5 — Configure CSS

Make sure your global CSS imports:

```css
@import "tailwindcss";
```

and your Untitled UI theme.

---

## Step 6 — Initialize Untitled UI

Run:

```bash
npx untitledui@latest init
```

or, when appropriate:

```bash
npx untitledui@latest init --vite
```

---

## Step 7 — Verify `components.json`

Make sure the aliases point to your actual project directories.

---

## Step 8 — Add one component

Start with something simple:

```bash
npx untitledui@latest add button
```

---

## Step 9 — Import the component

For example:

```tsx
import { Button } from "@/components/base/buttons/button";
```

---

## Step 10 — Use the component

```tsx
<Button>
  Click me
</Button>
```

---

## Step 11 — Run the application

```bash
npm run dev
```

---

## Step 12 — Add additional components as required

For example:

```bash
npx untitledui@latest add input modal table dropdown
```

---

# 24. Important Recommendation for an Existing Project

Because your project is **already an existing Vite project**, do not blindly replace your existing:

```text
vite.config.ts
tsconfig.json
index.css
main.tsx
```

with generic examples.

You may already have:

- Vite plugins
- Path aliases
- Tailwind configuration
- CSS imports
- Environment variables
- React Router
- Other libraries
- Existing components
- Custom styling

Instead, **merge the Untitled UI configuration into your existing setup**.

The safest process is:

```text
Existing project
      │
      ▼
Commit to Git
      │
      ▼
Install Untitled UI dependencies
      │
      ▼
Merge Vite configuration
      │
      ▼
Merge Tailwind/CSS configuration
      │
      ▼
Initialize Untitled UI
      │
      ▼
Add ONE component
      │
      ▼
Verify it works
      │
      ▼
Add remaining components
```

---

# 25. Official Documentation

The current official documentation can be used as the reference while performing the integration:

- [Untitled UI — Vite Integration](https://www.untitledui.com/react/integrations/vite)
- [Untitled UI — CLI Documentation](https://www.untitledui.com/react/docs/cli)
- [Untitled UI — Installation](https://www.untitledui.com/react/docs/installation)
- [Untitled UI — Components JSON](https://www.untitledui.com/react/integrations/components-json)
- [Untitled UI — React Introduction](https://www.untitledui.com/react/docs/introduction)

---

# Final Recommended Setup

For your existing Vite + React project, the essential commands are:

```bash
# 1. Go to your project
cd my-vite-project

# 2. Commit current state
git add .
git commit -m "Before Untitled UI integration"

# 3. Install dependencies
npm install @untitledui/icons react-aria-components tailwindcss @tailwindcss/vite tailwindcss-react-aria-components tailwind-merge tailwindcss-animate

# 4. Initialize Untitled UI
npx untitledui@latest init

# 5. Add your first component
npx untitledui@latest add button

# 6. Start the application
npm run dev
```

Then use the component in React:

```tsx
import { Button } from "@/components/base/buttons/button";

function App() {
  return (
    <div className="p-8">
      <Button>
        Click me
      </Button>
    </div>
  );
}

export default App;
```

The key concept is:

> **Untitled UI is not simply a package of components that stays inside `node_modules`. The CLI brings the component source into your project, allowing you to customize and maintain those components yourself.**

For an existing Vite application, therefore, the goal is to **integrate Untitled UI into your current Vite/Tailwind setup**, rather than rebuilding your application around Untitled UI.

---

## Important Note

Because this document was created from the previous integration guide, verify the exact commands and configuration against the current official Untitled UI documentation before applying them to a production project.
