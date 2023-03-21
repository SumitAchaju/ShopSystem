import { RouterProvider } from "react-router-dom"
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductSearch from "./components/ProductSearch";
import Sales from "./pages/Sales";
import Import from "./pages/Import";
import Loan from "./pages/Loan";
import Bill from "./pages/Bill";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<ProductSearch />} >
          <Route index element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
        </Route>
        <Route path="sales" element={<Sales />} />
        <Route path="import" element={<Import />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/loan" element={<Loan />} />
      </Route>
    )
  );
  return(
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
