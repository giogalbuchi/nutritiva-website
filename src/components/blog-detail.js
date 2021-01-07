import React, { Component } from "react";
import { db } from '../firebase';
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {},
            errorText: ''
        }

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    getBlogItem() {
        db.collection('blogs').doc(this.state.currentId).get().then(response => {
            this.setState({
                blogItem: response.data()
            })
        })
    }

    componentDidMount() {
        this.getBlogItem();
    }

    handleDeleteClick() {
        db.collection('blogs').doc(this.state.currentId).delete().then(() => {
            console.log('Document Succesfully deleted!');
            this.props.history.push("/");
        }).catch(error => {
            console.log('There was an error deleting', error)
            this.setState({
                errorText: error.message
            })
        })
    }

  render() {
      const {
          title,
          subtitle,
          image_url,
          category,
          content
      } = this.state.blogItem
    return (
      <div className="blog-container">
          <div className="content-container">
            <h1 className="title">{title}</h1>

            {this.props.isAdmin === 'yes' ? (<div className="actions"><a className="action-icon" onClick={this.handleDeleteClick}><FontAwesomeIcon icon="trash" /></a></div>) : null }

            <div>{this.state.errorText}</div>

            <h3 className="subtitle">{subtitle}</h3>

            <div className="category">{category}</div>

            <div className="featured-image-wrapper">
                <img src={image_url} />
            </div>

            <div className="content">
                {ReactHtmlParser(content)}
            </div>
          </div>
        

      </div>
    );
  }
}