import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Form from "./components/Form/Form.jsx";
import Loader from "./components/Loader/Loader.jsx";
import "./global.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Header />
      {isLoading && <Loader />}
      <Form setIsLoading={setIsLoading} />
    </>
  );
}

export default App;
