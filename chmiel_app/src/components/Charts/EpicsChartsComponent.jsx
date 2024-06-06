import React from 'react';
import {Chart} from "react-chartjs-2";


export const EpicsChartsComponent = ({inputData}) => {

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: "100%"
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: "100%"
            }}>
                <h3>Epics activity chart</h3>
                <p style={{margin: '0', marginTop: '0px', textAlign: "center"}}>Chart showing how many tasks from epics were
                    finished in given sprint.</p>
                <p style={{margin: '0', marginTop: '0px', textAlign: "center"}}>Helps to keep track if epics are progressing
                    according to plans.</p>
            </div>
            <div style={{
                width: '100%',
                // height: '100%',
                marginTop: '20px',
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Chart type="line" data={data} options={options}/>
            </div>


            {/*<div style={{marginBottom: '10px'}}>*/}
            {/*    <h3>Epics activity chart</h3>*/}
            {/*    <p style={{ margin: '0', marginTop: '0px'}}>Chart showing how many tasks from epics were*/}
            {/*        finished in given sprint.</p>*/}
            {/*    <p style={{ margin: '0', marginTop: '0px'}}>Helps to keep track if epics are progressing*/}
            {/*        according to plans.</p>*/}
            {/*    <div style={{width: '720px', height: '400px', marginTop: '20px'}}>*/}
            {/*        <Chart type="line" data={data} options={options}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};
