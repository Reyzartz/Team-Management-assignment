import Modal from "./common/Modal";
import "styles/AddTeam.css";
import { useContext, useEffect, useState } from "react";
import { EmployeesContext } from "utils/context/EmployeesContext";
import { TeamsContext } from "utils/context/TeamContext";

const intialTeamValues = {
  name: "",
  department: "",
  leader: {},
  members: [],
};
const AddTeam = ({ show, closeFn, teamData, update }) => {
  const [team, setTeam] = useState(intialTeamValues);
  const { employees } = useContext(EmployeesContext);
  const [availableMembers, setAvailableMembers] = useState([]);
  const { addTeam, updateTeam, removeTeam } = useContext(TeamsContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (update) {
      updateTeam(team);
    } else {
      addTeam(team);
    }
    setTeam(intialTeamValues);
    closeFn();
  };

  const setTeamHandler = ({ target: { value, name: key } }) => {
    const updatedTeam = { ...team };

    switch (key) {
      case "name":
        updatedTeam[key] = value;
        break;
      case "leader":
        const leader = employees.find((employee) => employee.id === value);
        updatedTeam[key] = leader;
        setAvailableMembersHandler(leader, "remove", true);
        break;
      case "department":
        updatedTeam[key] = value;
        updatedTeam.members = [];
        updatedTeam.leader = {};
        setAvailableMembersHandler({}, "init");
        break;
      case "members":
        if (team.department) {
          const member = employees.find((employee) => employee.id === value);
          updatedTeam[key] = [...team.members, member];
          setAvailableMembersHandler(member, "remove");
        } else {
          alert("Please Select Department First");
        }

        break;
      default:
        break;
    }
    setTeam(updatedTeam);
    console.log(value, key);
  };

  const removeMember = (member) => {
    let tempMembers = [...team.members];
    tempMembers = tempMembers.filter(
      (tempMember) => tempMember.id !== member.id
    );

    setTeam((prevTeam) => ({ ...prevTeam, members: tempMembers }));
    setAvailableMembersHandler(member, "add");
  };

  const setAvailableMembersHandler = (member, type, leader) => {
    switch (type) {
      case "add":
        setAvailableMembers((prevMembers) => [...prevMembers, member]);
        break;
      case "remove":
        setAvailableMembers((prevMembers) => {
          const updatedMembers = prevMembers.filter(
            (prevMember) => prevMember.id !== member.id
          );
          if (leader && team.leader.id) {
            updatedMembers.push(team.leader);
          }
          return updatedMembers;
        });
        break;
      case "init":
        setAvailableMembers(
          employees.filter(
            (employee) =>
              employee.department === team.department && !employee.teamId
          )
        );

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setAvailableMembersHandler({}, "init");
  }, [employees, team.department]);

  useEffect(() => {
    teamData && setTeam(teamData);
  }, [teamData]);

  return (
    <Modal open={show} onClose={closeFn}>
      <div className="card addTeam">
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Team Name"
            autoComplete="off"
            required
            tabIndex="1"
            onChange={setTeamHandler}
            value={team.name}
          />
          <select
            name="department"
            onChange={setTeamHandler}
            value={team.department}
            disabled={update}
          >
            <option defaultValue>Select Department</option>
            <option value={"Human Resource"}>Human Resource</option>
            <option value={"Engineering"}>Engineering</option>
            <option value={"Design"}>Design</option>
          </select>
          <select
            name="leader"
            onChange={setTeamHandler}
            value={team.leader.id}
          >
            <option defaultValue>Select Team Leader</option>
            {team.leader.id && (
              <option value={team.leader.id}>
                {team.leader.name} - ({team.leader.position})
              </option>
            )}
            {availableMembers.map((employee) => (
              <option value={employee.id}>
                {employee.name} - ({employee.position})
              </option>
            ))}
          </select>
          <select name="members" value="" onChange={setTeamHandler}>
            <option defaultValue>Select Team Members</option>
            {availableMembers.map((employee) => (
              <option value={employee.id} key={employee.id}>
                {employee.name} - ({employee.position})
              </option>
            ))}
          </select>
          <div className="selected-members-container">
            {team.members.map((member) => (
              <div className="selected-member">
                {member.name}{" "}
                <div className="close-btn" onClick={() => removeMember(member)}>
                  ⤫
                </div>
              </div>
            ))}
          </div>
          <div className="btn-group">
            <button type="submit">{update ? "Update" : "Add"} Team</button>
            {update && (
              <button onClick={() => removeTeam(team.id)}>Remove Team</button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTeam;
