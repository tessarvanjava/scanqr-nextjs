import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata = {
  title: "Invoice - Rental Barata Jaya",
  description: "invoice - Rental Barata Jaya",
};

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}