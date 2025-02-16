import { useState, useEffect, lazy, Suspense } from 'react';
import mqtt from 'mqtt';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './page.css';

// Lazy Load Components
const Charts = lazy(() => import('../Chart/Charts'));
const Temperature = lazy(() => import('../dht11/temperature'));
const Humidity = lazy(() => import('../dht11/humidity'));
const Light = lazy(() => import('../dht11/light'));
const Menu = lazy(() => import('../menu/menu'));

// Hình ảnh thiết bị
const deviceImages = {
    led: { on: "/light_on.gif", off: "/light_off.png" },
    fan: { on: "/fan_on.gif", off: "/fan_off.png" },
    air: { on: "/air_on.gif", off: "/air_off.png" },
};

const Page = () => {
    // Trạng thái cảm biến
    const [sensorData, setSensorData] = useState({
        temperature: 50,
        humidity: 90,
        light: 1000,
    });

    // Trạng thái thiết bị
    const [devices, setDevices] = useState({
        led: false,
        fan: false,
        air: false
    });

    useEffect(() => {
        setDevices({ led: false, fan: false, air: false });

        const client = mqtt.connect('ws://localhost:9001');

        client.on('connect', () => {
            console.log("MQTT Connected!");
            client.subscribe('sensor/data');
        });

        client.on('message', (topic, message) => {
            if (topic === 'sensor/data') {
                let data = JSON.parse(message.toString());
                setSensorData(prev => ({ ...prev, ...data }));
            }
        });

        return () => client.end();
    }, []);

    // Toggle trạng thái thiết bị
    const toggleDevice = (device) => {
        setDevices(prev => ({ ...prev, [device]: !prev[device] }));
    };

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div className="pagee">
                <div className="menuu">
                    <Menu />
                </div>

                <div className="page-chucnang">
                    <Temperature temperature={sensorData.temperature} />
                    <Humidity humidity={sensorData.humidity} />
                    <Light light={sensorData.light} />
                </div>

                <div className="page-btn">
                    <div className="page-bieudo">
                        <Charts thoitiet={[sensorData.temperature, sensorData.humidity, sensorData.light]} />
                    </div>

                    <div className="page-btn-chucnang">
                        {["led", "fan", "air"].map(device => (
                            <div key={device} className={`page-btn-${device}`}>
                                <div className="btn-icon">
                                    <p>Trạng thái {device === "led" ? "đèn" : device === "fan" ? "quạt" : "điều hòa"}</p>
                                    <img className="btn-icon-den" src={devices[device] ? deviceImages[device].on : deviceImages[device].off} alt={device} />
                                    <br />
                                    <button className={`light-btn ${devices[device] ? 'on' : 'off'}`} onClick={() => toggleDevice(device)}>
                                        <span className="light-icon"></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Page;
