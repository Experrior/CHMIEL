import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Chart, Line, Bar } from "react-chartjs-2";
// import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import axios from "../../api/axios";
import { useCookies } from "react-cookie";


export const SprintChartsComponent = ({inputData}) => {
    // Sample data

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };



    const labels = inputData.categories1;

    const data = {
        labels: labels,
        datasets:
            [
            {
                label: "Completed tasks",
                backgroundColor: 'rgb(87,255,219)',
                data: inputData["Completed tasks"]
            },
            {
                label: "Unfinished tasks",
                backgroundColor: 'rgb(235,54,54)',
                data: inputData["Unfinished tasks"]
            }
        ]
    };
    return (
                <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
                    <div style={{marginBottom: '10px'}}>
                        <h3>Epics activity chart</h3>
                        <p style={{margin: '0', marginTop: '0px'}}>Chart showing how many tasks from sprints were
                            finished in given sprint.</p>
                        <p style={{margin: '0', marginTop: '0px'}}>Helps to keep track of workload in given project.</p>
                        <div style={{width: '750px', height: '400px', marginTop: '20px'}}>
                            <Bar data={data} options={options}/>
                        </div>
                    </div>
                </Container>

    );
};


// export const SprintChartsComponent = ({inputData} ) => {
//
//     const labelsSet = new Set();
//     Object.values(inputData).forEach(data => {
//         Object.keys(data).forEach(label => labelsSet.add(label));
//     });
//     const labels = Array.from(labelsSet);
//
// // Define a static list of colors
//     const colors = [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)',
//         'rgb(75, 192, 192)',
//         'rgb(153, 102, 255)',
//         'rgb(255, 159, 64)',
//         'rgb(255, 0, 0)',
//         'rgb(0, 255, 0)',
//         'rgb(0, 0, 255)',
//         'rgb(128, 128, 128)'
//     ];
//
//     const datasets = Object.entries(inputData).map(([label, data], index) => ({
//         label,
//         data: labels.map(label => data[label] || 0), // Fill missing values with 0
//         borderColor: colors[index],
//         backgroundColor: colors[index],
//         yAxisID: 'y',
//         yAxis: {
//             ticks: {
//                 stepSize: 1,
//                 beginAtZero: true,
//             },
//         },
//     }));
//
//     const data = {
//         labels,
//         datasets
//     };
//
//     const options = {
//         aspectRatio: 2,
//         scales: {
//             x: {
//                 max: 50
//             },
//             y: {
//                 max: 10
//             }
//         },
//         legend: {
//             display: true
//         }
//     };
//
//     return (
//         <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
//             <div style={{marginBottom: '30px'}}>
//                 <Row>
//                     <h3>Epics activity chart</h3>
//                     <div style={{width: '100%', height: '400px'}}>
//                         <Chart type="line" data={data} options={options}/>
//                     </div>
//                 </Row>
//             </div>
//         </Container>
//     );
// };
