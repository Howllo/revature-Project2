import "./App.css";
import HomePage from "./page/HomePage.jsx";
import { AuthProvider } from "./util/auth/AuthProvider.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SigninPage } from "./page/SigninPage.jsx";
import { SignupPage } from "./page/SignupPage.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SignUpProvider } from "./component/SignUpComponent/Context/UseSignup.jsx";
import { SighInProvider } from "./component/SigninComponent/Context/SignInProvider.jsx";
import FeedPage from "./page/FeedPage.jsx";
import NotificationsPage from "./page/NotificationsPage.jsx";
import { NavProvider } from "./component/Navbar/NavContext/NavContext.jsx";
import ProfilePage from "./page/ProfilePage.jsx";
import SettingPage from "./page/SettingPage.jsx";
import { PostProvider } from "./component/Post/Context/PostProvider.jsx";
import { SearchProvider } from "./component/Search/Context/GetSelectedData.jsx";
import { Home } from "@mui/icons-material";
import FollowerPage from "./page/FollowersPage.jsx";
import FollowingPage from "./page/FollowingPage.jsx";
import PostPage from "./page/PostPage.jsx";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <Router>
          <NavProvider>
            <SignUpProvider>
              <SighInProvider>
                <PostProvider>
                  <SearchProvider>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <HomePage>
                            <FeedPage />
                          </HomePage>
                        }
                      />
                      <Route
                        path="/profile/:username/followers"
                        element={
                          <HomePage>
                            <FollowerPage />
                          </HomePage>
                        }
                      />
                      <Route
                        path="/profile/:username/following"
                        element={
                          <HomePage>
                            <FollowingPage />
                          </HomePage>
                        }
                      />
                      <Route path="/signin" element={<SigninPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route
                        path="/notification"
                        element={
                          <HomePage>
                            <NotificationsPage />
                          </HomePage>
                        }
                      />
                      <Route
                        path="/setting"
                        element={
                          <HomePage>
                            <SettingPage />
                          </HomePage>
                        }
                      />
                      <Route
                        path="/profile/:username"
                        element={
                          <HomePage>
                            <ProfilePage />
                          </HomePage>
                        }
                      />

                      <Route
                        path="/profile/:username/post/:postId"
                        element={
                          <HomePage>
                            <PostPage />
                          </HomePage>
                        }
                      />
                    </Routes>
                  </SearchProvider>
                </PostProvider>
              </SighInProvider>
            </SignUpProvider>
          </NavProvider>
        </Router>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
