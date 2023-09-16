import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Preferences from "./pages/Preferences";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Homepage} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/Preferences" Component={Preferences} />
        <Route exact path="/result" Component={Result} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
