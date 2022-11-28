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
                return item.cataegory === filter;
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
            console.log("item data", item);
            return <PortfolioItem key={item.id} title={item.name} url={"item.url"} slug={item.id}/>;
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
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick={() => this.handleFilter("eCommunist")}>eCommunist</button>
                <button onClick={() => this.handleFilter("Scheduling")}>Scheduling</button>
                <button onClick={() => this.handleFilter("Enterprise")}>Enterprise</button>

                {this.portfolioItems()}

                {/* <hr/>
                <button onClick={this.handlePageTitleUpdate}>Change the title</button> */}
            </div>
        );
    }
}