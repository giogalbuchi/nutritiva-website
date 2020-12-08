import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {}
        }
    }

    getBlogItem() {
        axios.get(`https://nutritiva.devcamp.space/portfolio/portfolio_items/${this.state.currentId}`)
        .then(response => {
            this.setState({
                blogItem: response.data.portfolio_item
            });
        })
        .catch(error => {
            console.log("getBlogItem error", error);
        });
    }

    componentDidMount() {
        this.getBlogItem();
    }

  render() {
      const {
          name,
          description,
          thumb_image_url,
          category
      } = this.state.blogItem
    return (
      <div className="blog-container">
          <div className="content-container">
            <h1 className="title">{name}</h1>

            <div className="category">{category}</div>

            <div className="featured-image-wrapper">
                <img src={thumb_image_url} />
            </div>

            <div className="content">
                {ReactHtmlParser(description)}
            </div>
          </div>
        

      </div>
    );
  }
}