import CodeCustomer from "./component/codecustomer";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense>
        <CodeCustomer />
      </Suspense>
    </>
  )
}

export default App