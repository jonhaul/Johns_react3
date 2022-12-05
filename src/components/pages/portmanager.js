import axios from 'axios';
import React, { Component } from 'react';

import PortfolioSidebarList from "../portfolio/port-side-bar-list"
import PortfolioForm from '../portfolio/port-form';

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: []
        };

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
        this.handleSuccessfulFormSubmissionError = this.handleSuccessfulFormSubmissionError.bind(this);
    }

    handleSuccessfulFormSubmission(portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });
    }

    handleSuccessfulFormSubmissionError(error) {
        console.log("handleSuccessfulFormSubmissionError", error);
    }

    getPortFolioItems() { 

        axios.get("https://zoran.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", { 
            withCredentials: true
            }).then(response => {
                this.setState({
                    portfolioItems: [...response.data.portfolio_items]
                });
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
                    <PortfolioForm 
                    handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                    handleSuccessfulFormSubmissionError={this.handleSuccessfulFormSubmissionError}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList data={this.state.portfolioItems} />
                </div>

            </div>
             
        )
    };
}