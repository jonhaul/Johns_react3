import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false
        };

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this); 
        window.addEventListener("scroll", this.onScroll, false);
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfullNewBlogSubmission = this.handleSuccessfullNewBlogSubmission.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(blog) {
        axios.delete(`https://zoran.devcamp.space/portfolio/portfolio_blogs/${blog.id}`, { withCredentials: true })
        .then(response => {
            this.setState({
                blogItems: this.state.blogItems.filter(blogItem => {
                    return blog.id !== blogItem.id;
                })
            });
            return response.data;
        })
        .catch(error => {
        console.log("delete blog error", error);
        });
    }
            

    handleSuccessfullNewBlogSubmission(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        });    
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        })
    }

    handleNewBlogClick() {
        this.setState({
            blogModalIsOpen: true
        });
    }

    onScroll() {
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
            if (this.props.loggedInStatus === "LOGGED_IN") {
                return (
                    <div key={blogItem.id} className="adn-blog-wrap">
                        <BlogItem  blogItem={blogItem} />
                        <a onClick={() => this.handleDeleteClick(blogItem)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>    
                    </div>
                );
            } else {

                return <BlogItem key={blogItem.id} blogItem={blogItem} />;
            }
        });

        return (
            <div className="blog-con">
                <BlogModal 
                handleSuccessfullNewBlogSubmission={this.handleSuccessfullNewBlogSubmission}
                handleModalClose={this.handleModalClose}
                modalIsOpen={this.state.blogModalIsOpen} />
            {this.props.loggedInStatus === "LOGGED_IN" ? (

                <div className="new-blog-link">
                    <a onClick={this.handleNewBlogClick}>
                        <FontAwesomeIcon icon="fa-hippo" bounce />   
                    </a> 
                </div>

            ) : null}
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