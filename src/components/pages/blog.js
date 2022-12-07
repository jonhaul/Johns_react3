import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/blog-item";

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this); 
        window.addEventListener("scroll", this.onScroll, false);
    }

    OnScroll() {
           if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
            return;
           }
           
            if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
          ) {
            console.log("get more posts");
          }
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });

        axios.get(`https://zoran.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, { withCredentials: true})
        .then(response => {
            console.log("getting", response.data);
            this.setState({
                blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false
            });
        })
        .catch(error => {
            console.log("getBlogItems error", error);
        });
    }

    componentWillMount() {
        this.getBlogItems();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.OnScroll, false);
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            return <BlogItem key={blogItem.id} blogItem={blogItem} />;
        });

        return (
            <div className="blog-con">
                <div className="con-container">{blogRecords}</div>
                {this.state.isLoading ? (

                    <div className="cont-loader">
                    <FontAwesomeIcon icon="fa-wand-magic-sparkles" spin />
                </div>
                    ) : null}
            </div>
          );
        
        
    }
        
}
            
export default Blog;