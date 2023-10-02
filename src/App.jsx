import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { Button } from "react-bootstrap";
import { BrowserRouter, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AppRouter from "./routes/app.router";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Routes> */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
