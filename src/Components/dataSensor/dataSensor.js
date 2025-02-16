import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Menu from '../menu/menu';
import './dataSensor.css';

function DataSensor() {
    const [listDataSensor, setListDataSensor] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [temperatureInput, setTemperatureInput] = useState('');
    const [humidityInput, setHumidityInput] = useState('');
    const [lightInput, setLightInput] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/${searchClicked ? `search-sensor?temperature=${temperatureInput}&humidity=${humidityInput}&light=${lightInput}` : `sensors`}`)
            .then(response => response.json())
            .then(data => {
                data.forEach((item, index) => {
                    item.id = index + 1;
                    item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss');
                });

                setListDataSensor(data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, [currentPage, searchClicked, rowsPerPage]);

    return (
        <div className='menu-data'>
            <div className="menuu"><Menu /></div>
            <div className='container-data'>
                <h1>Dữ liệu cảm biến</h1>

                {/* 3 ô tìm kiếm */}
                <div className='search-khung'>
                    <input className='search-ip' type="text" placeholder="Nhiệt độ (°C)" value={temperatureInput} onChange={(e) => setTemperatureInput(e.target.value)} />
                    <input className='search-ip' type="text" placeholder="Độ ẩm (%)" value={humidityInput} onChange={(e) => setHumidityInput(e.target.value)} />
                    <input className='search-ip' type="text" placeholder="Ánh sáng (lux)" value={lightInput} onChange={(e) => setLightInput(e.target.value)} />
                    
                    {/* 3 nút: Tìm kiếm, Tất cả, Xóa */}
                    <button className='btn-exit btn-exit-search' onClick={() => setSearchClicked(true)}>Tìm kiếm</button>
                    <button className='btn-exit btn-exit-exit' onClick={() => { setSearchClicked(false); setTemperatureInput(''); setHumidityInput(''); setLightInput(''); }}>Tất cả</button>
                    <button className='btn-exit btn-exit-clear' onClick={() => setListDataSensor([])}>Xóa</button>
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

                <div className='rows-per-page'>
                    <label>Số hàng mỗi trang: </label>
                    <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="rows-per-page-select">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                {/* Phân trang */}
                <div className='pagination'>
                    <button className="btn-pagination btn-prev" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        ◀
                    </button>

                    <span className="page-number active">{currentPage}</span>

                    <button className="btn-pagination btn-next" onClick={() => setCurrentPage(prev => prev + 1)} disabled={listDataSensor.length < rowsPerPage}>
                        ▶
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DataSensor;
