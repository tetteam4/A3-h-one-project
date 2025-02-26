import Agent from "./pages/agent";
import Customer from "./pages/customers";
import Dashboard from "./pages/dashboard";
import Transaction from "./pages/transactions";
import Report from "./pages/reports";
import Setting from "./pages/setting";
const MainContent = ({ activeComponent }) => {
  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "transaction":
        return <Transaction />;
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

  return <div className=" p-4 min-h-screen">{renderContent()}</div>;
};

export default MainContent;
