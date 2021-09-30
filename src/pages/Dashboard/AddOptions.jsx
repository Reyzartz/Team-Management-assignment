import AddEmployee from "components/AddEmployee";
import { useState } from "react";
import TeamIcon from "assets/icons/TeamIcon.svg";
import EmployeeIcon from "assets/icons/EmployeeIcon.svg";
import AddTeam from "components/AddTeam";

const AddOptions = () => {
  const [showModal, setShowModal] = useState({ type: null, status: false });
  const setShowModalHandler = (type) => {
    setShowModal((prevState) => ({ type, status: !prevState.status }));
  };

  return (
    <>
      <AddEmployee
        show={showModal.type === "employee" && showModal.status}
        closeFn={setShowModalHandler}
      />
      <AddTeam
        show={showModal.type === "team" && showModal.status}
        closeFn={setShowModalHandler}
      />
      <div className="addOptions">
        <button
          className="option-btn"
          onClick={() => setShowModalHandler("employee")}
        >
          <img src={EmployeeIcon} alt="EmployeeIcon" className="option-img" />
          <span className="option-label" optiontype="employee">
            <b>+</b> Add Employee
          </span>
        </button>
        <button
          className="option-btn"
          onClick={() => setShowModalHandler("team")}
        >
          <img src={TeamIcon} alt="TeamIcon" className="option-img" />
          <span className="option-label" optiontype="team">
            <b>+</b> Add Team
          </span>
        </button>
      </div>
    </>
  );
};

export default AddOptions;
