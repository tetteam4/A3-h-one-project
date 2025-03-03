import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PrivateRoute from "./components/common/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/common/OnlyAdmin";
import ScrollTop from "./components/common/ScrollTop";
import UserProfilePage from "./pages/UserProfilePage";
// import Signup from './features/authentication/components/Signup'
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/sign-in" element={<Signin />} /> */}
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/userprofile" element={<UserProfilePage />} />
          {/* <Route element={<PrivateRoute />}> */}
            <Route path="/dashboard" element={<DashboardPage />} />
          {/* </Route> */}
          <Route element={<OnlyAdminPrivateRoute />}></Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>

  );
}
