import { Kanit } from "next/font/google";
import type { Metadata } from "next";
import "@/index.css";
import {
  Anchor,
  DarkModeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  ThemeContextProvider,
} from "@barrelrolla/react-components-library";
import { getUser } from "@/supabase/server";
import Link from "next/link";
import { logout } from "@/actions/user";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Simple task manager",
};

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en" className={kanit.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
const setTheme = () => {
  const savedDarkMode = localStorage.getItem("darkMode");
  const savedTheme = localStorage.getItem("theme");
  if (!savedDarkMode) localStorage.setItem("darkMode", "system");
  const { classList, dataset } = document.documentElement;
  if (savedTheme) dataset.theme = savedTheme;
  if (savedDarkMode === "system" || !savedDarkMode) {
    const isDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (isDark) classList.add("dark");
  } else if (savedDarkMode === "dark") {
    classList.add("dark");
  }
};
setTheme();`,
          }}
        ></script>
      </head>
      <body>
        <ThemeContextProvider>
          <Navbar collapseAt="sm">
            <NavbarBrand as={Link} href={"/"}>
              Task Manager
            </NavbarBrand>
            <NavbarCollapse className="mb-2 flex items-end sm:mb-0">
              <DarkModeToggle size="sm" variant="outline" color="main" />
              {!user && (
                <Anchor
                  as={Link}
                  color="main"
                  underlined={false}
                  href={"/login"}
                >
                  Login
                </Anchor>
              )}
              {user && (
                <>
                  <span>{user.email}</span>
                  <Anchor
                    color="main"
                    underlined={false}
                    as={"button"}
                    onClick={logout}
                    className="cursor-pointer"
                  >
                    Logout
                  </Anchor>
                </>
              )}
            </NavbarCollapse>
            <NavbarToggle />
          </Navbar>
          <main className="mx-auto mt-18 max-w-(--max-width) px-4">
            {children}
          </main>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
