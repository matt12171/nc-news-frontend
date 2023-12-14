import { Link } from "react-router-dom";
export const PanelButtons = () => {
  return (
    <div className="panelButtons">
      <Link to={"/"} className="link panel">Home</Link>
      <Link to={""} className="link panel">My Profile</Link>
    </div>
  );
};
