import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PrivateRoute from "./components/common/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/common/OnlyAdmin";
import ScrollTop from "./components/common/ScrollTop";
import Signin from "./features/authentication/components/Signin";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/sign-in" element={<Signin />} />
          {/* <Route path="/sign-up" element={<Signup />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />

          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}></Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}
