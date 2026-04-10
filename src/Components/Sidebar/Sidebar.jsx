import "./Sidebar.css";

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <div className="sidebar">
      <div
        className={`sidebar-item ${activeView === "notes" ? "sidebar-item-active" : ""}`}
        onClick={() => setActiveView("notes")}
      >
        <span className={`material-icons-outlined hover ${activeView === "notes" ? "active" : ""}`}>lightbulb</span>
        <span className="sidebar-text">Notes</span>
      </div>
      <div
        className={`sidebar-item ${activeView === "reminders" ? "sidebar-item-active" : ""}`}
        onClick={() => setActiveView("reminders")}
      >
        <span className={`material-icons-outlined hover ${activeView === "reminders" ? "active" : ""}`}>notifications</span>
        <span className="sidebar-text">Reminders</span>
      </div>
      <div className="sidebar-item">
        <span className="material-icons-outlined hover">edit</span>
        <span className="sidebar-text">Edit Labels</span>
      </div>
      <div className="sidebar-item">
        <span className="material-icons-outlined hover">archive</span>
        <span className="sidebar-text">Archive</span>
      </div>
      <div className="sidebar-item">
        <span className="material-icons-outlined hover">delete</span>
        <span className="sidebar-text">Trash</span>
      </div>
    </div>
  );
}

export default Sidebar;
