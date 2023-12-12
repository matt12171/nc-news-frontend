import { Link } from "react-router-dom";
export const PanelButtons = () => {
  return (
    <div className="panelButtons">
      <Link to={"/"}>Home</Link>
      <Link to={""}>My Profile</Link>
    </div>
  );
};
