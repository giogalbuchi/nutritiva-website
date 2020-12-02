import React, {Component } from 'react';
import axios from "axios";

import ExampleItem from './example-item';

export default class ExamplesContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "This is Nutritiva",
            data: []
        };

        this.handleFilter = this.handleFilter.bind(this);
        // this.getExampleItems = this.getExampleItems.bind(this);
    }

    handleFilter(filter) {
        this.setState({
          data: this.state.data.filter(item => {
            return item.category === filter;
          })
        });
      }

    getExampleItems() {
        axios.get("https://nutritiva.devcamp.space/portfolio/portfolio_items").then(response => {
            this.setState({
                data: response.data.portfolio_items
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    exampleItems() {
        return this.state.data.map(item => {
            return (
                <ExampleItem key={item.id} item={item} />
            );
        });
    }

    componentDidMount() {
        this.getExampleItems();
    }

    render() {

        return(
            <div>
                <div className="filter-btns">
                    <button className="btn" onClick={() => this.handleFilter("Recipe")}>Recipes</button>
                    <button className="btn" onClick={() => this.handleFilter("Fact")}>Facts</button>
                </div>

                <div className='example-items-wrapper'>
                    {this.exampleItems()}
                </div>
            </div>
        );
    }
}