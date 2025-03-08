import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PrivateRoute from "./components/common/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/common/OnlyAdmin";
import ScrollTop from "./components/common/ScrollTop";
import Signin from "./features/authentication/components/Signin";
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          {/* public routes all users */}
          <Route path="/sign-in" element={<Signin />} />
          <Route path="*" element={<NotFound />} />

          {/* private route for users*/}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
       

          {/* only admin */}
          <Route element={<OnlyAdminPrivateRoute />}>
          
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}
