import { createRoot } from "react-dom/client";
import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Form from "./components/Form/Form.jsx";
import Loader from "./components/Loader/Loader.jsx";
import "./global.css";

function App() {
  // Komponent funkcyjny
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header />
      {isLoading && <Loader />}
      <Form />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
