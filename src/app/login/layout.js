import { CookiesProvider } from 'next-client-cookies/server';

export const metadata = {
  title: "Scanning App - Rental Barata Jaya",
  description: "Scanning App - Rental Barata Jaya",
};

export default function Layout({ children }) {
  return (
    <>
      <CookiesProvider><main>{children}</main></CookiesProvider>
    </>
  )
}