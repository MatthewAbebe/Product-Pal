import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      chartData: []
    };
  }

  componentDidMount() {

    fetch('/api/purchases/amount')
      .then(res => res.json())
      .then(data => {

        const labels = [];
        const chartData = [];

        for (let i = 0; i < data.length; i++) {
          const dates = data[i].date;
          const formattedDates = format(new Date(dates), 'MM/dd/yyyy');
          const amounts = data[i].amount;
          labels.push(formattedDates);
          chartData.push(amounts);
        }
        this.setState({ labels: labels });
        this.setState({ chartData: chartData });
      });
  }

  render() {

    const data = {
      labels: this.state.labels.reverse(),
      datasets: [
        {
          label: 'Spending',
          data: this.state.chartData,
          fill: false,
          backgroundColor: 'rgba(30, 139, 195, 1)',
          borderColor: 'rgba(30, 139, 195, 1)'
        }
      ]
    };

    const options = {
      scales: {
        yAxes: {
          axis: 'y',
          ticks: {
            callback: function (value, index, values) {
              return '$' + value;
            },
            beginAtZero: true
          }
        }
      }
    };

    return (
      <>
        <div className="row">
          <div className="col-half">

            <div id="spending-by-time-chart-container">

              <div className='spending-by-time-header'>
                <h4 className='chart-title'>Spending by Time</h4>
              </div>

              <div>
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </>

    );
  }
}

export default Analysis;
