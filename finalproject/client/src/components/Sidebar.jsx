import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaTh,
  FaBars,
  FaRegChartBar,
  FaThList,
  FaCheckCircle,
  FaAward,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    console.log("Logout");
    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  };

  const menuItem = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },

    {
      path: "/Dashboard/Dataentry",
      name: "Dataentry",
      icon: <FaRegChartBar />,
    },
    {
      path: "/Dashboard/Training",
      name: "Training/Certification",
      icon: <FaAward />,
    },
    {
      path: "/Dashboard/Validation",
      name: "Validation",
      icon: <FaCheckCircle />,
    },
    {
      path: "/Dashboard/View",
      name: "View",
      icon: <FaThList />,
    },
  ];
  return (
    <div className="">
      <div style={{ width: isOpen ? "255px" : "80px" }} className="sidebar">
        <div className="top_section">
          <div
            style={{ marginLeft: isOpen ? "194px" : "12px" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        
        <div className="logout ">
          <Link>
            <input
              type="submit"
              to="#"
              value="LOGOUT"
              onClick={logout}
            />
          </Link>
        </div>
      </div>
      {/* <main></main> */}
    </div>
  );
};

export default Sidebar;
