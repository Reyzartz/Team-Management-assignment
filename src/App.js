import "styles/global.css";
import { EmployeesProvider } from "utils/context/EmployeesContext";
import { TeamsProvider } from "utils/context/TeamContext";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <EmployeesProvider>
        <TeamsProvider>
          <Layout />
        </TeamsProvider>
      </EmployeesProvider>
    </div>
  );
}

export default App;
