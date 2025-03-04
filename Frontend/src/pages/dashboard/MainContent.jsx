import Agent from "./pages/agent";
import Customer from "./pages/customers";
import Dashboard from "./pages/dashboard";
import S_Transaction from "./pages/S_transactions";
import Report from "./pages/reports";
import Setting from "./pages/setting";
import R_Transaction from "./pages/R_transactions";
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
      case "agent":
        return <Agent />;
      case "report":
        return <Report />;
      case "setting":
        return <Setting />;
      default:
        return <Dashboard />;
    }
  };

  return <div className="min-h-screen">{renderContent()}</div>;
};

export default MainContent;
