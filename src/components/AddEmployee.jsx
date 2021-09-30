import Modal from "./common/Modal";
import "styles/AddEmployee.css";
import { useContext, useEffect, useState } from "react";
import { EmployeesContext } from "utils/context/EmployeesContext";
import { TeamsContext } from "utils/context/TeamContext";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  department: "",
  position: "",
};

const AddEmployee = ({ show, closeFn, employeeData, update }) => {
  const { addEmployee, updateEmployee, removeEmployee } =
    useContext(EmployeesContext);
  const [employee, setEmployee] = useState(initialState);
  const { teams, updateTeam, removeTeam } = useContext(TeamsContext);

  const setEmployeeHandler = ({ target: { value, name: key } }) => {
    const updatedEmployee = { ...employee };
    updatedEmployee[key] = value;
    setEmployee(updatedEmployee);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (update) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }
    setEmployee(initialState);
    closeFn();
  };

  const removeEmployeeHandler = () => {
    debugger;
    if (employee.teamId) {
      const updatedTeam = {
        ...teams.find((team) => team.id === employee.teamId),
      };
      if (employee.id === updatedTeam.leader.id) {
        removeTeam(updatedTeam.id);
      } else {
        updatedTeam.members = [
          ...updatedTeam.members.filter((member) => member !== employee.id),
        ];
        updateTeam(updatedTeam, "removeMember");
      }
    }
    removeEmployee(employee.id);
  };
  useEffect(() => {
    employeeData && setEmployee(employeeData);
  }, [employeeData]);

  return (
    <Modal open={show} onClose={closeFn}>
      <div className="card addEmployee">
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            autoComplete="off"
            required
            tabIndex="1"
            onChange={setEmployeeHandler}
            value={employee.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            required
            tabIndex="2"
            onChange={setEmployeeHandler}
            value={employee.email}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            autoComplete="off"
            required
            tabIndex="3"
            onChange={setEmployeeHandler}
            value={employee.mobile}
          />
          <select
            name="department"
            onChange={setEmployeeHandler}
            value={employee.department}
            disabled={update}
          >
            <option defaultValue>Select Department</option>
            <option value={"Human Resource"}>Human Resource</option>
            <option value={"Engineering"}>Engineering</option>
            <option value={"Design"}>Design</option>
          </select>
          <input
            type="text"
            name="position"
            placeholder="Position"
            autoComplete="off"
            required
            tabIndex="6"
            onChange={setEmployeeHandler}
            value={employee.position}
          />
          <div className="btn-group">
            <button type="submit">{update ? "Update" : "Add"} Employee</button>
            {update && (
              <button onClick={removeEmployeeHandler}>Remove Employee</button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddEmployee;
