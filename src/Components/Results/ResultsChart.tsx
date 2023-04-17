import { FC } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { ChartType } from "../../types";
import { Chart } from "chart.js";

//Para registrar el pluging
//Chart.register(ChartDataLabels);

interface ResultsChartProps {
    chartData: any,
    chartType: ChartType,
    title: string
}

const datalabels = {
    color: '#fff',
    font: {
        size: 16
    },
    formatter: (value: number, context: any) => {
        console.log(context);
        const total = context.dataset.data.reduce((a: number, b: number) => a+b, 0); //suma los elementos de un arreglo
        return Math.round((100 / total) * value) +"%";
    }
}

const pieOptions = {
    plugins: {
        datalabels
    }
}

const barOptions = {
    scales: {
        y: {
            ticks: {
                precision: 0
            }
        }
    },
    plugins: {
        datalabels: {...datalabels, font: {size: 13}},
        legend: {
            display: false
        }
    }
}

const ResultsChart:FC<ResultsChartProps> = ({ chartData, chartType, title }) => {
    console.log(chartData.data);
    return (
        <div className="mb-5">
            <div className="chart-container">
                <h6>{title}</h6>
                {                    
                    chartType === "PIE" ? <Pie data={chartData.data}></Pie>
                    : <Bar data={chartData.data}></Bar>
                }
            </div>
        </div>)
}

export default ResultsChart;