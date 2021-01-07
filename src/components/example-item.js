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
        const { title, subtitle, image_url } = this.props.blog;
        const blog_id = this.props.blog_id;
        return (
            <Link to={`/b/${blog_id}`}>
                <div className="example-item-wrapper" onMouseEnter={() => this.handleMouseEnter()} onMouseLeave={() => this.handleMouseLeave()}>
                    <div 
                        className={"example-img-background " + this.state.exampleItemClass }
                        style={{
                            backgroundImage: "url(" + image_url + ")"
                        }}
                    />
                    <div className='img-text-wrapper'>
                        
                            <div className='title'>{title}</div>
        
                        <div className="subtitle">{subtitle}</div>
                    </div>
                </div>
            </Link>
        );
    }
}