import React, {Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ExampleItem from './example-item';
import { db } from '../firebase';

export default class ExamplesContainer extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            loading: true
        };

        this.handleFilter = this.handleFilter.bind(this);
        // this.getExampleItems = this.getExampleItems.bind(this);
    }

    handleFilter(filter) {
        if (filter === "CLEAR_FILTERS") {
            this.getExampleItems();
        } else {
            this.setState({
                data: this.state.data.filter(item => {
                  return item.data().category === filter;
                })
              });
        }
        
      }

    getExampleItems() {
        db.collection('blogs').onSnapshot(snapshot => {
            this.setState({
                data: snapshot.docs
            });
        })
    }

    exampleItems() {
        return this.state.data.map(item => {
            const blog_id = item.id;
            const blog = item.data();
            return (
                <ExampleItem key={item.id} blog_id={blog_id} blog={blog} />
            );
        });
    }


    componentDidMount() {
        this.getExampleItems();
        this.setState({
            loading: false
        })
    }

    render() {

        return(
            <div className='blog-general-container'>
                <div className="filter-btns">
                    <button className="btn" onClick={() => this.handleFilter("Recipe")}>Recipes <FontAwesomeIcon icon="cookie" /></button>
                    <button className="btn" onClick={() => this.handleFilter("Fact")}>Facts <FontAwesomeIcon icon="info-circle" /></button>
                    <button className="btn" onClick={() => this.handleFilter("CLEAR_FILTERS")}>All </button>
                </div>

                <div className='example-items-wrapper'>
                    {this.exampleItems()}
                </div>

                {this.state.loading ? (
                <div className="spin-icon">
                    <FontAwesomeIcon icon="spinner" spin/>
                </div>) : null }

            </div>
        );
    }
}