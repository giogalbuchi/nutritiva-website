import React, { Component } from "react";
import axios from 'axios';

import BlogSidebarList from "../blog/blog-sidebar-list";
import BlogForm from "../blog/blog-form";

export default class BlogManager extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: []
        };

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(portfolioItem) {
        axios
      .delete(
        `https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          blogItems: this.state.blogItems.filter(item => {
            return item.id !== portfolioItem.id;
          })
        });

        return response.data;
      })
      .catch(error => {
        console.log("handleDeleteClick error", error);
      });
    }

    handleSuccessfulFormSubmission(blogItem) {
        this.setState({
            blogItems: [blogItem].concat(this.state.blogItems)
        });
    }

    handleFormSubmissionError(error) {
        console.log("handleFormSubmissionError", error);
    }

    getBlogItems() {
        axios.get("https://nutritiva.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", { withCredentials: true}).then(response => {
            this.setState({
                blogItems: [...response.data.portfolio_items]
            });
        })
        .catch(error => {
            console.log("error in getBlogItems", error);
        });
    }

    componentDidMount() {
        this.getBlogItems();
    }

  render() {
    return (
      <div className="blog-manager-wrapper">
        <div className="left-column">
            <BlogForm
                handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                handleFormSubmissionError={this.handleFormSubmissionError}
            />
        </div>

        <div className="right-column">
            <BlogSidebarList handleDeleteClick={this.handleDeleteClick} data={this.state.blogItems} />
        </div>
      </div>
    );
  }
}