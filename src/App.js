import AppRoutes from "navigation/routes";
import Account from "pages/Account/Account";
import ForgottenPassword from "pages/ForgottenPassword/ForgottenPassword";
import Home from "pages/Home/Home";
import UserLists from "pages/UserLists/UserLists";
import UserList from "pages/UserList/UserList";
import UserRatings from "pages/UserRatings/UserRatings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicVideo from "pages/MusicVideo/MusicVideo";
import Artist from "pages/Artist/Artist";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AppRoutes />}>
            <Route path="/" element={<Home />} />
            <Route
              exact
              path="/forgotten-password"
              element={<ForgottenPassword />}
            />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/user-ratings" element={<UserRatings />} />
            <Route exact path="/user-lists" element={<UserLists />} />
            <Route exact path="/list/:slug" element={<UserList />} />
            <Route exact path="/music-video/:slug" element={<MusicVideo />} />
            <Route exact path="/artist/:slug" element={<Artist />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
