import "styles/ViewEmployees.css";
import { useContext, useState } from "react";
import { EmployeesContext } from "utils/context/EmployeesContext";
import AddEmployee from "components/AddEmployee";

const ViewEmployees = () => {
  const { employees } = useContext(EmployeesContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  return (
    <div className="view-employees">
      <AddEmployee
        show={selectedEmployee}
        closeFn={() => setSelectedEmployee(null)}
        employeeData={selectedEmployee}
        update
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Team</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} onClick={() => setSelectedEmployee(employee)}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.teamName}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployees;
