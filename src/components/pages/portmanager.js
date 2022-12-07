import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/port-side-bar-list"
import PortfolioForm from '../portfolio/port-form';


export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        };

        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleEditFormSubmissionError = this.handleEditFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        });
    }

    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        });
    }

    handleDeleteClick(portfolioItem) {
        axios.delete(
            `https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, 
            { withCredentials: true }
        ).then(response => {
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            });

            return response.data;
        }).catch(error => {
            console.log("handleDeleteClick error", response);
        });
            
    }

    handleEditFormSubmission() {
        this.getPortFolioItems();
    }


    handleNewFormSubmission(portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });
    }

    handleEditFormSubmissionError(error) {
        console.log("handleNewFormSubmissionError", error);
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
                    handleNewFormSubmission={this.handleNewFormSubmission}
                    handleEditFormSubmission={this.handleEditFormSubmission}
                    handleNewFormSubmissionError={this.NewFormSubmissionError}
                    clearPortfolioToEdit={this.clearPortfolioToEdit}
                    portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList 
                    handleDeleteClick={this.handleDeleteClick}
                    handleEditClick={this.handleEditClick}
                    data={this.state.portfolioItems} />
                </div>

            </div>
             
        )
    };
}