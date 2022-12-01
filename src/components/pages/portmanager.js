import axios from 'axios';
import React, { Component } from 'react';

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: []
        }
    }

    getPortFolioItems() { 

        axios.get("https://zoran.devcamp.space/portfolio/portfolio_items", { 
            withCredentials: true
            }).then(response => {
                this.setState({
                    portfolioItems: [...response.data.portfolio_items]
                })
            }).catch(error => {
                console.log("error in getPortfolioItems in portman", error);
            });
    }
    
    
        componentDidMount() {
            this.getPortFolioItems();
        }
           

    render() {
        return (
            <div className='portman-wrapper'>

                <div className="left-column">
                    <h2>Portfolio sidebar.... LEFT</h2>
                </div>
                <div className="right-column">
                    <h2>Portfolio sidebar.... THE RIGHT RIGGHT</h2>
                </div>

            </div>
             
        )
    };
}