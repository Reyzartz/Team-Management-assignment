import { useContext } from "react";
import "styles/ViewHierarchy.css";
import { EmployeesContext } from "utils/context/EmployeesContext";
import { TeamsContext } from "utils/context/TeamContext";
import Node from "./Node";

const departments = [
  {
    name: "Human Resource",
    head: "Asmita Kannan",
  },
  {
    name: "Engineering",
    head: "Samir Murty",
  },
  {
    name: "Design",
    head: "Abhisek Gour",
  },
];
const ViewHierarchy = () => {
  const { teams } = useContext(TeamsContext);
  const { employees } = useContext(EmployeesContext);

  const getDepartments = () => {
    return departments.map((department, ind) => (
      <Node
        name={department.name}
        title={`${department.head} (Head)`}
        childFn={() => getTeams(department.name)}
        index={ind}
        key={department.name}
      />
    ));
  };
  const getTeams = (department) => {
    return teams
      .filter((team) => team.department === department)
      .map((team, ind) => (
        <Node
          name={team.name}
          title={`${team.leader.name} (Leader)`}
          childFn={() => getMembers(team.members)}
          index={ind}
          key={team.id}
        />
      ));
  };

  const getMembers = (memberIds) => {
    return employees
      .filter((employee) => memberIds.includes(employee.id))
      .map((member, ind) => (
        <Node
          name={member.position}
          title={member.name}
          index={ind}
          key={member.id}
        />
      ));
  };
  return (
    <div className="hierarchy-container">
      <div className="node">
        <h4>Brandon Faser</h4>
        <h5>CEO</h5>
        <div className="child">{getDepartments()}</div>
      </div>
    </div>
  );
};

export default ViewHierarchy;
