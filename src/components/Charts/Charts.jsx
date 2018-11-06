import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './Charts.css';

class Charts extends Component {
    constructor(){
        super();

        this.state = {}
    }

    render(){
        const sizeStyle = {
            width: '600px',
            height: '300px'
        }
        // console.log(this.props.chartData)
        return (
            <div className='chart' style={sizeStyle}>
                <Line
                    data={this.props.chartData}
                    options={{
                        title:{
                            display: true,
                            text: this.props.title,
                            fontSize:25
                        },
                        legend:{
                            display: false,
                            position:'right'
                        },
                        scales:{
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 100
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default Charts;