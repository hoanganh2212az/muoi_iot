import React, { useState, useEffect } from 'react';
import Menu from '../menu/menu';
import moment from 'moment';
import './dataLedFan.css';

function DataLedFan() {
    const [historyfanlight, setHistoryfanlight] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        let url = `http://localhost:8080/fanlights`;

        if (deviceName) url += `/search?deviceName=${deviceName}`;
        if (selectedDate) url += `${deviceName ? '&' : '?'}date=${selectedDate}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach((item, index) => {
                    item.id = index + 1;
                    item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss');
                });

                setHistoryfanlight(data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    }, [currentPage, deviceName, rowsPerPage, selectedDate]);

    // Xử lý xóa toàn bộ dữ liệu
    const handleDeleteData = () => {
        fetch(`http://localhost:8080/deleteAll`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setHistoryfanlight([]);
                    setCurrentPage(1);
                } else {
                    console.error('Lỗi khi xóa dữ liệu');
                }
            })
            .catch(error => console.error('Lỗi khi gửi yêu cầu xóa:', error));
    };

    const [listDataLedFan, setListDataLedFan] = useState([]); // Khai báo state chứa danh sách dữ liệu

    return (
        <div>
            <div className="menu-data">
            <div className="menuu"><Menu /></div>
            <div className='container-data'>
                <h1>Lịch sử bật/tắt thiết bị</h1>

                {/* Bộ lọc tìm kiếm */}
                <div className='time-filter'>
                    <select value={deviceName} onChange={(e) => setDeviceName(e.target.value)} className="rows-per-page-select">
                        <option value="">Chọn thiết bị</option>
                        <option value="đèn">Đèn</option>
                        <option value="quạt">Quạt</option>
                        <option value="điều hòa">Điều hòa</option>
                    </select>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className='rows-per-page-select' />

                    {/* Nút Xóa dữ liệu */}
                    <button className='btn-exit btn-exit-clear' onClick={handleDeleteData}>Xóa dữ liệu</button>
                </div>

                <table>
                    <thead>
                        <tr><th>ID</th><th>Tên thiết bị</th><th>Trạng thái</th><th>Thời gian</th></tr>
                    </thead>
                    <tbody>
                        {historyfanlight.map((data) => (
                            <tr key={data.id} className={data.status === "Bật" ? "green-row" : "red-row"}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.status}</td>
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
                    <button
                        className="btn-pagination btn-prev"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >◀
                    </button>
                    <span className="page-number active">{currentPage}</span>
                    <button
                        className="btn-pagination btn-next"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={listDataLedFan.length < rowsPerPage} // Thay thế listDataSensor
                    >▶
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default DataLedFan;
