import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import background from "./images/background.jpeg"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/auth" element={<Auth />}/>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
