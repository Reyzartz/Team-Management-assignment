import { useContext } from "react";
import "styles/QuickAccess.css";
import { EmployeesContext } from "utils/context/EmployeesContext";

const QuickAccess = () => {
  const { employees } = useContext(EmployeesContext);

  return (
    <div className="quick-access">
      <h2>Employees</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.teamName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuickAccess;
