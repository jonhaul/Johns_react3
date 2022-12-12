import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import BlogFeaturedImage from '../blog/blog-feature-img';
import BlogForm from "../blog/blog-form";

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {},
            editMode: false
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleFeatImgDel = this.handleFeatImgDel.bind(this);
        this.handleUpdateFormSub = this.handleUpdateFormSub.bind(this);
    }

    handleUpdateFormSub(blog) {
        this.setState({
            blogItem: blog,
            editMode: false
        })
    }

    handleFeatImgDel() {
        this.setState({
            blogItem: {
                featured_image_url: ""
            }
        });
    }
        
    handleEditClick() {
        console.log("handle edit clicked");
        if (this.props.LoggedInStatus === "LOGGED_IN") {
            this.setState({ editMode: true });

        }
      }

    getBlogItem() {
        axios.get(`https://zoran.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
        ).then(response => {
            console.log("response", response);
            this.setState({
                blogItem: response.data.portfolio_blog
            });
        })
        .catch(error => {
            console.log("get blog item error", error);
        });
    }
    
    componentDidMount() {
        this.getBlogItem()
    }

    render() {
        const {
            title,
            content,
            featured_image_url,
            blog_status
        } = this.state.blogItem;

        const contentManager = () => {
            if (this.state.editMode && this.props.LoggedInStatus === "LOGGED_IN") {
                return ( <BlogForm handleFeatImgDel={this.handleFeatImgDel}
                handleUpdateFormSub={this.handleUpdateFormSub} 
                editMode={this.state.editMode}
                blog={this.state.blogItem}
                />
                );
            } else {
                return (
                    <div className='con-container'>

                        <h1 onClick= {this.handleEditClick}>{title}</h1>
                            <BlogFeaturedImage img={featured_image_url} />
                        <div className='content'>
                            {ReactHtmlParser(content)}
                        </div>
                    </div>
                );
            }
        };

        return (

            <div className='blog-con'>{contentManager()}</div>
        );
    };
}