import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
    const { id, description, thumb_image_url } = props.item;
    return (
        <div className="example-item-wrapper">
            <img src={thumb_image_url} />
            <div>{description}</div>
        </div>
    );
}