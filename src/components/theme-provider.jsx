
import { createContext, useContext, useEffect, useState } from "react"

// const Theme = "dark" | "light" | "system"


const initialState = {
  theme: "dark",
  setTheme: () => null,
}

export const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({
  children,
  config,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(() => (localStorage.getItem(storageKey)) || defaultTheme)
  useEffect(() => {
    const root = window.document.documentElement
    // root.classList.remove("light", "system", "dark")
    root.classList.remove("light", "system", "dark")
    root.classList.add(theme);

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    if (theme == "light"){
      document.documentElement.style.setProperty('--accent', config.meta.lightThemeAccent || '#F2F1ED');
    }else{
      document.documentElement.style.setProperty('--accent', config.meta.darkThemeAccent || '#6EF2AE');
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}