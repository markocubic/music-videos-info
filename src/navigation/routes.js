import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ScreenRoutes} from  "defines/ScreenRoutes";
import Home from "pages/Home";
import SignIn from "pages/SignIn";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={ScreenRoutes.login.path} element={<SignIn />} />
      </Routes>
    </Router>
  );
}
