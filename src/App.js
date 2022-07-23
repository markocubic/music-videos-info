import AppRoutes from "navigation/routes";
import Account from "pages/Account/Account";
import ForgottenPassword from "pages/ForgottenPassword/ForgottenPassword";
import Home from "pages/Home/Home";
import UserLists from "pages/UserLists/UserLists";
import UserRatings from "pages/UserRatings/UserRatings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AppRoutes />}>
            <Route path="/" element={<Home />} />
            <Route exact path="/forgotten-password" element={<ForgottenPassword />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/user-ratings" element={<UserRatings />} />
            <Route exact path="/user-lists" element={<UserLists />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
