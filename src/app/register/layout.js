import { CookiesProvider } from 'next-client-cookies/server';

export const metadata = {
  title: "Register - Rental Barata Jaya",
  description: "Register - Rental Barata Jaya",
};

export default function Layout({ children }) {
  return (
    <>
      <CookiesProvider><main>{children}</main></CookiesProvider>
    </>
  )
}