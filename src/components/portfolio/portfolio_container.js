import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";
import axios from 'axios';


export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "welcome to paradise",
            isLoading: false,
            data: []    
        };

    //     this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.getPortfolioItems = this.getPortfolioItems.bind(this);
    }


    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        });
    }

    getPortfolioItems() {
        axios
          .get("https://zoran.devcamp.space/portfolio/portfolio_items")
          .then(response => {
            console.log("response data", response);
            this.setState({
                data: response.data.portfolio_items
            });
          })
          .catch(error => {
            console.log(error);
          });
    }

    portfolioItems() {

        return this.state.data.map(item => {
            return <PortfolioItem key={item.id}  item={item} />;
        });
    }

    // handlePageTitleUpdate() {
    //     this.setState({
    //         pageTitle: "Random title man"
    //     });
    // }
    componentDidMount() {
        this.getPortfolioItems();
    }


    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

      

        return(
            
            
            <div className="portfolio-items-wrapper">
                <button className="btn" onClick={() => this.handleFilter("eCommunist")}>eCommerce</button>
                <button className="btn" onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
                <button className="btn" onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>
                {this.portfolioItems()}
            </div>
                



        );
    }
}