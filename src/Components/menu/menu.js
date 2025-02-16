import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./menu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faDatabase, faHistory, faUser } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="menu-container">
      <button onClick={toggleMenu} className="iconmenu">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <button className="iconexit" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="menu-header">
          <ul>
            <Link to="/" className="linkmenu">
              <button className='ulLink'>
                <FontAwesomeIcon icon={faHome} /> Home
              </button>
            </Link>
            <Link to="/DataSensor" className="linkmenu">
              <button className='ulLink'>
                <FontAwesomeIcon icon={faDatabase} /> Dữ liệu cảm biến
              </button>
            </Link>
            <Link to="/DataLedFan" className="linkmenu">
              <button className='ulLink'>
                <FontAwesomeIcon icon={faHistory} /> Lịch sử bật tắt
              </button>
            </Link>
            <Link to="/Myprofile" className="linkmenu">
              <button className='ulLink'>
                <FontAwesomeIcon icon={faUser} /> My Profile
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
