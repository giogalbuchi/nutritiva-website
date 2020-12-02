import React from "react";
import { Link } from "react-router-dom";

import ExamplesContainer from "../example-container";

export default function() {
  return (
    <div className='blog-page'>
      <h2>Blog</h2>

      <ExamplesContainer />

      <div>
        <Link to="/about-me">Read more about myself</Link>
      </div>
    </div>
  );
}