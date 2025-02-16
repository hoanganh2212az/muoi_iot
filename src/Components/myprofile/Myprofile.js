import React from 'react';
import './myprofile.css';
import Menu from '../menu/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard, faUsers, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // ✅ Sửa lỗi import sai

// Dữ liệu hồ sơ
const profileData = [
    { icon: faUser, label: "Họ tên", value: "Lê Hoàng Anh" },
    { icon: faIdCard, label: "MSV", value: "B21DCPT044" },
    { icon: faUsers, label: "Lớp", value: "D21PTDPT" },
    { icon: faGithub, label: "Github", value: "https://github.com/hoanganh2212az/muoi_iot", isLink: true },
    { icon: faFilePdf, label: "PDF", value: "https://drive.google.com/file/d/1aaFpQO_DTU3EBnlALaS0DdJ3a6jeH0Mo/view?usp=sharing", isLink: true },
    { icon: faFilePdf, label: "APIDocs", value: "https://github.com/ThanhTigi/BTL_IOT/blob/main/APIDocs", isLink: true }
];

const Myprofile = () => {
    return (
        <div className="mybackground">
            <div className="menuu">
                <Menu />
            </div>

            {/* Avatar */}
            <img className="imgavt" src="/pfp_img.jpg" alt="Avatar" onError={(e) => e.target.src = "/default_avatar.png"} />

            {/* Thông tin cá nhân */}
            <div className="profile-info">
                {profileData.map((item, index) => (
                    <div key={index} className="mythongtin">
                        <FontAwesomeIcon icon={item.icon} className="icon" />
                        {item.label}: {" "}
                        {item.isLink ? (
                            <a href={item.value} target="_blank" rel="noopener noreferrer">Link</a>
                        ) : (
                            item.value
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Myprofile;
