import React from 'react';
import { Container, Nav, Col, Row } from 'react-bootstrap';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';

import default_profile_picture from "../../assets/default_profile_picture.jpg";
import {Navigation} from "../../components/Navigation/Navigation";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const generateRandomData = () => {
    return labels.map(() => Math.floor(Math.random() * 1000));
};

const data = {
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: generateRandomData(),
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(75, 192, 192)',
            data: generateRandomData(),
            borderColor: 'white',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(53, 162, 235)',
            data: generateRandomData(),
        },
    ],
};

const ChartsPage = () => {
    return (
        <>
            <Navigation/>
            <Container fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ marginBottom: '30px' }}>
                    <Row>
                        <h3>Chart 1</h3>
                        <div style={{ width: '100%', height: '400px' }}>
                            <Chart type="line" data={data} />
                        </div>
                    </Row>
                </div>
            </Container>
            <Container fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                <div style={{ marginBottom: '30px' }}>
                    <Row>
                        <h3>Chart 2</h3>
                        <div style={{ width: '100%', height: '400px' }}>
                            <Chart type="line" data={data} />
                        </div>
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default ChartsPage;
