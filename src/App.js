import ProductAddForm from "./Components/ProductAddForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <ProductAddForm />
      <ToastContainer />
    </div>
  );
}

export default App;
