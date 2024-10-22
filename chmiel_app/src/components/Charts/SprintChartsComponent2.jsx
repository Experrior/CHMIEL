import { Container, Nav, Col, Row } from 'react-bootstrap';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import DropdownButton from 'react-bootstrap/DropdownButton';
import default_profile_picture from "../../assets/default_profile_picture.jpg";
import Dropdown from 'react-bootstrap/Dropdown';
import {useCookies} from "react-cookie";
import React, { useState, useEffect } from 'react';
import axios from "../../api/axios";
import ReactApexChart from "react-apexcharts";

export class SprintChartsComponent2 extends React.Component {
    constructor(props) {
        super(props);

        const inputData = props.inputData || { series: [], categories: [] };
        const series = inputData.series || [];
        const categories = inputData.categories || [];

        this.state = {

            series: series,
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        borderRadius: 10,
                        borderRadiusApplication: 'end', // 'around', 'end'
                        borderRadiusWhenStacked: 'last', // 'all', 'last'
                        dataLabels: {
                            total: {
                                enabled: true,
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900
                                }
                            }
                        }
                    },
                },
                xaxis: {
                    type: 'string',
                        categories: categories,
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                }
            },


        };
    }



    render() {
        return (
            <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
                <div style={{marginBottom: '10px'}}>
                    <h3>Epics activity chart</h3>
                    <p style={{ margin: '0', marginTop: '0px'}}>Chart showing how many tasks from epics were
                        finished in given sprint.</p>
                    <p style={{ margin: '0', marginTop: '0px'}}>Helps to keep track if epics are progressing
                                according to plans.</p>
                    <div id="chart" style={{width: '750px', height: '400px', marginTop: '20px'}}>
                        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" />
                    </div>
                </div>

            </Container>
        );
    }
}
