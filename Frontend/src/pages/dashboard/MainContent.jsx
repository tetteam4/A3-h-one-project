import Customer from "./pages/customers";
import Dashboard from "./pages/dashboard";
import S_Transaction from "./pages/S_transactions";
import Report from "./pages/reports";
import Setting from "./pages/setting";
import R_Transaction from "./pages/R_transactions";
import UserManagement from "./pages/userManagement";
import BranchManagement from "./pages/BranchManagement";
import { Wallet } from "./pages/Wallet";
const MainContent = ({ activeComponent }) => {
  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "S_transactions":
        return <S_Transaction />;
      case "R_transactions":
        return <R_Transaction />;
      case "customer":
        return <Customer />;
      case "user managements":
        return <UserManagement />;
      case "report":
        return <Report />;
      case "setting":
        return <Setting />;
      case "Wallet":
        return <Wallet />;
      case "Branch managements":
        return <BranchManagement />;
      default:
        return <Dashboard />;
    }
  };

  return <div className="min-h-screen">{renderContent()}</div>;
};

export default MainContent;
