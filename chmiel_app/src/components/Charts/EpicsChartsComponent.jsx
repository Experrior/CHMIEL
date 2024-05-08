import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Chart, Line } from "react-chartjs-2";
// import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import axios from "../../api/axios";
import { useCookies } from "react-cookie";

export const EpicsChartsComponent = ({inputData} ) => {


    // const dataObject = {
    //     "Develop User Authentication System": {
    //         "1": 0,
    //         "2": 1,
    //         "3": 4,
    //         "4": 1,
    //         "5": 0
    //     },
    //     "Design Database Schema": {
    //         "1": 1,
    //         "2": 0,
    //         "3": 3
    //     }
    // };

    // const datasets = Object.entries(inputData).map(([label, data]) => ({
    //     label,
    //     data: Object.values(data),
    //     borderColor: 'rgb(255, 99, 132)',
    //     backgroundColor: 'rgb(53, 162, 235)',
    //     yAxisID: 'y',
    //     yAxis: {
    //         ticks: {
    //             stepSize: 1,
    //             beginAtZero: true,
    //         },
    //     }
    // }));
    //
    // const labels = Object.keys(dataObject["Develop User Authentication System"]);

    const labelsSet = new Set();
    Object.values(inputData).forEach(data => {
        Object.keys(data).forEach(label => labelsSet.add(label));
    });
    const labels = Array.from(labelsSet);

// Define a static list of colors
    const colors = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(255, 0, 0)',
        'rgb(0, 255, 0)',
        'rgb(0, 0, 255)',
        'rgb(128, 128, 128)'
    ];

    const datasets = Object.entries(inputData).map(([label, data], index) => ({
        label,
        data: labels.map(label => data[label] || 0), // Fill missing values with 0
        borderColor: colors[index],
        backgroundColor: colors[index],
        yAxisID: 'y',
        yAxis: {
            ticks: {
                stepSize: 1,
                beginAtZero: true,
            },
        },
    }));

    const data = {
        labels,
        datasets
    };

    const options = {
        aspectRatio: 2,
        scales: {
            x: {
                max: 50
            },
            y: {
                max: 10
            }
        },
        legend: {
            display: true
        }
    };

    return (
        <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div style={{marginBottom: '30px'}}>
                <Row>
                    <h3>Epics activity chart</h3>
                    <div style={{width: '100%', height: '400px'}}>
                        <Chart type="line" data={data} options={options}/>
                    </div>
                </Row>
            </div>
        </Container>
    );
};
