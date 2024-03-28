import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";

import MainRoutes from "./Router/MainRoutes";
import Footer from "./pages/Footer";

function App() {
  return (
    <>
      <Navbar />
      <MainRoutes />
     <Footer/>
    </>
  );
}

export default App;
