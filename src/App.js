import "./App.css";
import Navbar from "./Components/Navbar";
import AppBody from "./Components/AppBody";
import Form from "./Components/Form";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Navbar />
    //     <Routes>
    //       <Route path="/addshop" element={<Form />} />

    //       <Route path="/" element={<AppBody />} />
    //     </Routes>
    //   </div>
    // </Router>
    <div className="App">
      <AppBody/>
    </div>
  );
}

export default App;
