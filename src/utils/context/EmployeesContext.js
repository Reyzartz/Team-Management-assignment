import { createContext } from "react";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useLocalStorage("employees", []);

  const addEmployee = (formData) => {
    const employeeData = {
      ...formData,
      id: `EM${Math.floor(Math.random() * 10e8)}`,
    };
    setEmployees([...employees, employeeData]);
    console.log(employeeData);
  };

  const removeEmployee = (id) => {
    setEmployees((prevState) =>
      prevState.filter((employee) => employee.id !== id)
    );
  };

  const addToTeam = (updatedEmpData, teamName, teamId) => {
    setEmployees((prevState) =>
      prevState.map((employee) => {
        if (updatedEmpData.includes(employee.id)) {
          return { ...employee, teamName, teamId };
        } else {
          return employee;
        }
      })
    );
  };

  const removeFromTeam = (updatedEmpData) => {
    setEmployees((prevState) =>
      prevState.map((employee) => {
        if (updatedEmpData.includes(employee.id)) {
          delete employee.teamName;
          delete employee.teamId;
          return employee;
        } else {
          return employee;
        }
      })
    );
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevState) =>
      prevState.map((employee) => {
        if (updatedEmployee.id === employee.id) {
          return { ...employee, ...updatedEmployee };
        } else {
          return employee;
        }
      })
    );
  };

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        addEmployee,
        removeEmployee,
        addToTeam,
        updateEmployee,
        removeFromTeam,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};
