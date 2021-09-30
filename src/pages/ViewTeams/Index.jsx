import AddTeam from "components/AddTeam";
import "styles/ViewTeams.css";
import { useContext, useState } from "react";
import { TeamsContext } from "utils/context/TeamContext";
import { EmployeesContext } from "utils/context/EmployeesContext";

const ViewTeams = () => {
  const { teams } = useContext(TeamsContext);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { employees } = useContext(EmployeesContext);
  const setSelectedTeamHandler = (team) => {
    let modifiedTeamData = { ...team };
    modifiedTeamData.members = employees.filter((employee) =>
      team.members.includes(employee.id)
    );
    console.log(modifiedTeamData);
    setSelectedTeam(modifiedTeamData);
  };

  return (
    <div className="view-teams">
      <AddTeam
        show={selectedTeam}
        closeFn={() => setSelectedTeam(null)}
        teamData={selectedTeam}
        update
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Leader</th>
            <th>Total Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id} onClick={() => setSelectedTeamHandler(team)}>
              <td>{team.name}</td>
              <td>{team.department}</td>
              <td>{team.leader.name}</td>
              <td>{team.members.length + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTeams;
