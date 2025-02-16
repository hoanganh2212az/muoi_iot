import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Menu from '../menu/menu';
import './dataSensor.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList, faTrash } from '@fortawesome/free-solid-svg-icons';

function DataSensor() {
    const [listDataSensor, setListDataSensor] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const [temperatureInput, setTemperatureInput] = useState('');
    const [humidityInput, setHumidityInput] = useState('');
    const [lightInput, setLightInput] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        function fetchData() {
            fetch(`http://localhost:8080/${searchClicked ? `search-sensor?temperature=${temperatureInput}&humidity=${humidityInput}&light=${lightInput}` : `sensors`}`)
                .then((response) => response.json())
                .then((data) => {
                    data.forEach((item, index) => {
                        item.id = index + 1;
                        item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss');
                    });

                    setTotalPages(Math.ceil(data.length / rowsPerPage));
                    setListDataSensor(data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
                })
                .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
        }

        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, [currentPage, rowsPerPage, searchClicked]);

    return (
        <div className='menu-data'>
            <div className="menuu">
                <Menu />
            </div>
            <div className='container-data'>
                <h1>Dữ liệu cảm biến</h1>
                <div className='search-khung'>
                    <input className='search-ip' type="text" placeholder="Nhiệt độ (°C)" value={temperatureInput} onChange={(e) => setTemperatureInput(e.target.value)} />
                    <input className='search-ip' type="text" placeholder="Độ ẩm (%)" value={humidityInput} onChange={(e) => setHumidityInput(e.target.value)} />
                    <input className='search-ip' type="text" placeholder="Ánh sáng (lux)" value={lightInput} onChange={(e) => setLightInput(e.target.value)} />
                    <button className='btn-exit btn-exit-search' onClick={() => setSearchClicked(true)}>
                        <FontAwesomeIcon icon={faSearch} /> Tìm kiếm
                    </button>
                    <button className='btn-exit btn-exit-exit' onClick={() => setSearchClicked(false)}>
                        <FontAwesomeIcon icon={faList} /> Tất cả
                    </button>
                    <button className='btn-exit btn-exit-clear'>
                        <FontAwesomeIcon icon={faTrash} /> Xóa
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nhiệt độ (°C)</th>
                            <th>Độ ẩm (%)</th>
                            <th>Ánh sáng (lux)</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listDataSensor.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.temperature}</td>
                                <td>{data.humidity}</td>
                                <td>{data.light}</td>
                                <td>{data.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataSensor;
