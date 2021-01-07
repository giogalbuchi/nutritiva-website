import React, { Component } from "react";
import axios from 'axios';
import { db } from '../../firebase';

import BlogForm from "../blog/blog-form";

export default class BlogManager extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            blogList: []
        };

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

    handleFormSubmissionError(error) {
        console.log("handleFormSubmissionError", error);
    }


  render() {
    return (
      <div className="blog-manager-wrapper">
        <div className="left-column">
            <BlogForm
                handleFormSubmissionError={this.handleFormSubmissionError}
            />
        </div>
      </div>
    );
  }
}