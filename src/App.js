import Main from "components/Main";
import Account from "pages/Account/Account";
import ForgottenPassword from "pages/ForgottenPassword/ForgottenPassword";
import Home from "pages/Home/Home";
import UserLists from "pages/UserLists/UserLists";
import UserList from "pages/UserList/UserList";
import UserRatings from "pages/UserRatings/UserRatings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicVideo from "pages/MusicVideo/MusicVideo";
import Artist from "pages/Artist/Artist";
import PrivateRoute from "navigation/PrivateRoute";
import AuthProvider from "context/AuthProvider";
import CreateUserList from "pages/CreateUserList/CreateUserList";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route exact path="/account" element={<Account />} />
              </Route>
              <Route
                exact
                path="/forgotten-password"
                element={<ForgottenPassword />}
              />
              <Route exact path="/user-ratings" element={<UserRatings />} />
              <Route exact path="/user-lists" element={<UserLists />} />
              <Route exact path="/list-create" element={<CreateUserList />} />
              <Route exact path="/list/:slug" element={<UserList />} />
              <Route exact path="/music-video/:slug" element={<MusicVideo />} />
              <Route exact path="/artist/:slug" element={<Artist />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
