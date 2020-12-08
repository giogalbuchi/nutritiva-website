import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ExampleItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exampleItemClass: ""
        };
    }

    handleMouseEnter() {
        this.setState({ exampleItemClass: "image-blur"});
    }

    handleMouseLeave() {
        this.setState({ exampleItemClass: ""});
    }

    render() {
        const { id, name, description, thumb_image_url } = this.props.item;
        return (
            <Link to={`/b/${id}`}>
                <div className="example-item-wrapper" onMouseEnter={() => this.handleMouseEnter()} onMouseLeave={() => this.handleMouseLeave()}>
                    <div 
                        className={"example-img-background " + this.state.exampleItemClass }
                        style={{
                            backgroundImage: "url(" + thumb_image_url + ")"
                        }}
                    />
                    <div className='img-text-wrapper'>
                        
                            <div className='title'>{name}</div>
        
                        <div className="subtitle">Here goes the Subtitle!</div>
                    </div>
                </div>
            </Link>
        );
    }
}