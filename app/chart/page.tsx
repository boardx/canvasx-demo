//@ts-nocheck
'use client';
import type { XCanvas } from '@boardxus/canvasx-core';
import { NextPage } from 'next';
import { useRef, useCallback } from 'react';
import { Canvas } from '../../components/Canvas';
// import { Utils } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { XChart } from '@boardxus/canvasx-core';
const barChartConfig: ChartConfiguration = {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
      x: {
        ticks: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
  },
};

const lineChartConfig: ChartConfiguration = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        ticks: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
      x: {
        ticks: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
  },
};

const pieChartConfig: ChartConfiguration = {
  type: 'pie',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Votes',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
  },
};

const doughnutChartConfig: ChartConfiguration = {
  type: 'doughnut',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Votes',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
  },
};

const radarChartConfig: ChartConfiguration = {
  type: 'radar',
  data: {
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running',
    ],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'My Second Dataset',
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
      },
    ],
  },
  options: {
    scales: {
      r: {
        angleLines: {
          color: '#000',
        },
        grid: {
          color: '#000',
        },
        pointLabels: {
          color: '#000',
          font: {
            size: 24,
          },
        },
        ticks: {
          color: '#000',
          backdropColor: '#fff',
          font: {
            size: 24,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
  },
};

const polarAreaChartConfig: ChartConfiguration = {
  type: 'polarArea',
  data: {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
  },
};

const bubbleChartConfig: ChartConfiguration = {
  type: 'bubble',
  data: {
    datasets: [
      {
        label: 'First Dataset',
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        ticks: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
      y: {
        ticks: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#000',
          font: {
            size: 24,
          },
        },
      },
    },
  },
};

const IndexPage: NextPage = () => {
  const ref = useRef<XCanvas>(null);
  // Store chart refs for update access
  const chartRefs = useRef<Record<string, XChart>>({});

  // Handler to update chart config after edit
  const onChartEdit = useCallback((chartKey: string, newConfig: ChartConfiguration) => {
    const canvas = ref.current;
    const chart = chartRefs.current[chartKey];
    if (canvas && chart) {
      chart.updateChart(newConfig);
      canvas.renderAll();
    }
  }, []);

  const onLoad = useCallback(
    (canvas: XCanvas) => {
      canvas.setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 60,
      });

      // Create charts and store refs
      const barChart = new XChart({ chartConfig: barChartConfig, width: 400, height: 400 });
      const lineChart = new XChart({ chartConfig: lineChartConfig, width: 400, height: 400 });
      const pieChart = new XChart({ chartConfig: pieChartConfig, width: 400, height: 400 });
      const doughnutChart = new XChart({ chartConfig: doughnutChartConfig, width: 400, height: 400 });
      const radarChart = new XChart({ chartConfig: radarChartConfig, width: 400, height: 400 });
      const polarAreaChart = new XChart({ chartConfig: polarAreaChartConfig, width: 400, height: 400 });
      const bubbleChart = new XChart({ chartConfig: bubbleChartConfig, width: 400, height: 400 });

      chartRefs.current = {
        bar: barChart,
        line: lineChart,
        pie: pieChart,
        doughnut: doughnutChart,
        radar: radarChart,
        polar: polarAreaChart,
        bubble: bubbleChart,
      };

      canvas.add(barChart);
      canvas.add(lineChart);
      canvas.add(pieChart);
      canvas.add(doughnutChart);
      canvas.add(radarChart);
      canvas.add(polarAreaChart);
      canvas.add(bubbleChart);

      // Positioning charts for better visualization
      barChart.set({ left: 50, top: 50 });
      lineChart.set({ left: 500, top: 50 });
      pieChart.set({ left: 50, top: 500 });
      doughnutChart.set({ left: 500, top: 500 });
      radarChart.set({ left: 50, top: 950 });
      polarAreaChart.set({ left: 500, top: 950 });
      bubbleChart.set({ left: 950, top: 50 });

      canvas.renderAll();
    },
    [ref],
  );

  return (
    <div className="position-relative" style={{ minHeight: '80vh' }}>
      <div style={{ width: '100%', height: '80vh', margin: '0 auto', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fafbfc' }}>
        <Canvas ref={ref} onLoad={onLoad} />
      </div>
      {/* Example usage: onChartEdit('bar', newBarConfig) after edit/save */}
      {/* Description Section */}
      <div style={{ marginTop: 48, marginBottom: 16, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Chart Demo Description</h2>
        <p>
          This page demonstrates adding and displaying charts in CanvasX. You can use chart widgets to visualize data, create dashboards, or enhance your diagrams with dynamic visualizations.
        </p>
      </div>

      {/* Documentation Section */}
      <div style={{ marginBottom: 48, padding: 16, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2>Chart Widget Documentation</h2>
        <h3>Overview</h3>
        <p>
          CanvasX supports embedding charts as objects on the canvas. Charts can be used to visualize data, track metrics, or present information in a graphical format.
        </p>
        <h3>Key Properties</h3>
        <ul>
          <li><b>type</b>: string — The type of chart (e.g., 'bar', 'line', 'pie').</li>
          <li><b>data</b>: object — The data to be visualized.</li>
          <li><b>width</b>, <b>height</b>: number — The dimensions of the chart.</li>
          <li><b>top</b>, <b>left</b>: number — The position of the chart on the canvas.</li>
        </ul>
        <h3>Usage Example</h3>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {`const chart = new XChart({
  type: 'bar',
  data: { labels: [...], datasets: [...] },
  top: 100,
  left: 100,
  width: 400,
  height: 300,
});
canvas.add(chart);`}
        </pre>
        <h3>Tips & Best Practices</h3>
        <ul>
          <li>Choose the appropriate chart type for your data.</li>
          <li>Combine charts with notes and shapes for dashboards.</li>
          <li>Resize and position charts for clarity and emphasis.</li>
        </ul>
      </div>
    </div>
  );
};

export default IndexPage;
