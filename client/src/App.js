import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Preferences from "./pages/Preferences";
import Result from "./pages/Result";
import env from "react-dotenv"
import Signup from "./pages/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Homepage} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/Preferences" Component={Preferences} />
        <Route exact path="/result" Component={Result} />
        <Route exact path="/signup" Component={Signup} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
