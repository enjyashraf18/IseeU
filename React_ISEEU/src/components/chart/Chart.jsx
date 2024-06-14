import React from 'react';
import "./chart.css";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = (props) => {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'data',
                data: props.data,
                backgroundColor: [
                    '#F5F5F5',
                    '#18625b',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    '#F5F5F5',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                        color: '#f5f5f5' // Change label color here

                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // Optionally, customize or remove the label content here
                        let label = '';
                        if (context.parsed !== null) {
                            label += context.parsed;
                        }
                        return label;
                    },
                },
            },
        },
    };

    return (
        <div style={{ height: '25vh' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default Chart;
