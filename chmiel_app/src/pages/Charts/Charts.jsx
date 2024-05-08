import React, { useState, useEffect } from 'react';
import { Container, Nav, Col, Row } from 'react-bootstrap';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';

import default_profile_picture from "../../assets/default_profile_picture.jpg";
import axios from "../../api/axios";
import {Navigation} from "../../components/Navigation/Navigation";
import {EpicsChartsComponent} from "../../components/Charts/EpicsChartsComponent";
import {useCookies} from "react-cookie";

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
    const [epicsData, setData] = useState({});
    const [cookies] = useCookies(["token"]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/task/getEpicsData/1',
                    {
                        headers: { Authorization: "Bearer "+cookies.token }
                    }
                    );
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []); // Run only once on component mount


    return (
        <>
            <Navigation/>
            <EpicsChartsComponent inputData={epicsData}/>
        </>
    );
};

export default ChartsPage;
