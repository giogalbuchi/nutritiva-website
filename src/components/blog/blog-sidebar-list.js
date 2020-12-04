import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogSidebarList = props => {
    const blogList = props.data.map(portfolioItem => {
        return(
            <div key={portfolioItem.id} className="blog-item-thumb">
                <div className="blog-thumb-img">
                    <img src={portfolioItem.thumb_image_url} />
                </div>
                <div className="text-content">
                    <div className="title">{portfolioItem.name}</div>
                    <a className="delete-icon" onClick={() => props.handleDeleteClick(portfolioItem)}><FontAwesomeIcon icon="trash" /></a>
                </div>   
            </div>
        );
    });

    return <div className="blog-sidebar-list-wrapper">{blogList}</div>;
};

export default BlogSidebarList;