import React from 'react';
import ChartRace from 'react-chart-race';


export default class Ranking extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
        
    }

    componentDidMount(){
        this.fetchData();
    }

    async fetchData(){
        //const url = 'http://localhost:5000/';
        const url = 'http://18.217.174.174:5000/';
        const respone = await fetch(url);
        const data = await respone.json();
        // data.forEach(element => {
        //     for(let key in element){
        //         console.log(key + " " +element[key][0]);
        //     }
        // });
        for(let i = 0; i < data.length; i++){
            setTimeout(()=> {
                for(let key in data[i]){
                    const ranking = [];
                    const colorsMapping = [];
                    for(let j = 0 ; j < data[i][key].length; j++){
                        let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16); //Generate color
                        let country = data[i][key][j].country;
                        let cases = data[i][key][j].cases;
                        let color = '';
                        if(this.state.colors === undefined || this.state.colors.length === 0){
                            color = randomColor;
                            colorsMapping.push({country:country,color:randomColor});
                        }
                        else{
                            this.state.colors.some(element => {
                                if(element.country === country){
                                    color = element.color
                                    colorsMapping.push({country:element.country,color:element.color})
                                    return true;
                                }
                                else{
                                    return false;
                                }
                            })
                        }
                        ranking.push({ id: j, title: country, value: cases, color: color })
                    }
                    this.setState({date:key, data:ranking,colors:colorsMapping});
                }
            }, 500 * i);
        }
    }

    render(){
        return(
            <div className="App">
                <div className="labelheader">
                    <h1>Covid Global Cases</h1>
                </div>
                <div>
                    <h2>Date:{this.state.date}</h2>
                </div>
                <div>
                    <ChartRace
                    data={this.state.data}
                    width={window.innerWidth}
                    padding={12}
                    itemHeight={58}
                    gap={12}
                    />
                </div>
            </div>
        );
    }
}
