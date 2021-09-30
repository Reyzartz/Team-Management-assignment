import { createContext, useContext } from "react";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { EmployeesContext } from "./EmployeesContext";

export const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const { addToTeam, removeFromTeam } = useContext(EmployeesContext);
  const [teams, setTeams] = useLocalStorage("teams", []);

  const addTeam = (formData) => {
    const teamData = {
      ...formData,
      id: `TM${Math.floor(Math.random() * 10e8)}`,
      members: formData.members.map((member) => member.id),
    };
    addToTeam(
      [...teamData.members, teamData.leader.id],
      teamData.name,
      teamData.id
    );
    setTeams([...teams, teamData]);
  };

  const removeTeam = (id) => {
    setTeams((prevState) =>
      prevState.filter((team) => {
        if (team.id === id) {
          removeFromTeam([...team.members, team.leader.id]);
        }
        return team.id !== id;
      })
    );
  };

  const updateTeam = (formData, type) => {
    let updatedTeam = { ...formData };
    console.log("formData", updatedTeam);
    if (type !== "removeMember") {
      updatedTeam.members = formData.members.map((member) => member.id);
    }
    setTeams((prevState) =>
      prevState.map((team) => {
        if (team.id === updatedTeam.id) {
          if (type !== "removeMember") {
            removeFromTeam([...team.members, team.leader.id]);
            addToTeam(
              [...updatedTeam.members, updatedTeam.leader.id],
              updatedTeam.name,
              updatedTeam.id
            );
          }
          console.log("updatedTeam ", updatedTeam);
          return { ...updatedTeam };
        } else {
          return team;
        }
      })
    );
  };

  return (
    <TeamsContext.Provider value={{ teams, addTeam, removeTeam, updateTeam }}>
      {children}
    </TeamsContext.Provider>
  );
};
