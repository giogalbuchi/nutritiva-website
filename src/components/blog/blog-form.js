import React, { Component} from 'react';
import axios from 'axios';
import { db } from '../../firebase';
import { st } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RichTextEditor from "../forms/rich-text-editor";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            subtitle: "",
            category: "Recipe",
            content: "",
            image_url:"",
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

        this.thumbRef = React.createRef();
    }

    handleRichTextEditorChange(content) {
        this.setState({ content });
    }

    deleteImage(imageType) {
        axios
            .delete(
                `https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
                { withCredentials: true }
            )
            .then(response => {
                this.setState({
                    [`${imageType}_url`]: ""
                });
            })
            .catch(error => {
                console.log("deleteImage error", error);
            });
    }

    onFileChange = (e) => {
        this.setState({
            loading: true
        })
        const file = e.target.files[0]
        const fileRef = st.child(file.name)
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then(response => {
                this.setState({
                    image_url: response,
                    loading: false
                })
                console.log(response)
            })
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        db.collection('blogs').add({
            title: this.state.title,
            subtitle: this.state.subtitle,
            category: this.state.category,
            content: this.state.content,
            image_url: this.state.image_url,
        }).then (() => {
            document.getElementById("image_uploader").value = null
            this.setState({
                title:"",
                subtitle:"",
                category: "Recipe",
                content: "",
                image_url: "",
            });
        })
    }


    render() {
        return (
                <form id='form1' onSubmit={this.handleSubmit} className="blog-form-wrapper">
                    <div className="two-column">
                        <input
                            type="text"
                            name="title"
                            placeholder="Blog Title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />

                        <input
                            type="text"
                            name="subtitle"
                            placeholder="Blog Subtitle"
                            value={this.state.subtitle}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="one-column">
                    <select
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                        className="select-element"
                    >
                        <option value="Recipe">Recipe</option>
                        <option value="Fact">Fact</option>
                    </select>

                    </div>

                    <div className="one-column">
                        <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange} />
                    </div>

                    <div className="image-uploader two-column">
                        <input id="image_uploader" type="file" onChange={this.onFileChange}/>

                        {this.state.loading ? (
                        <div className="spin-icon">
                            <FontAwesomeIcon icon="spinner" spin/>
                        </div>) : null }
                    </div>

                    <div className="one-column">
                        <button disabled={this.state.loading} className="btn" type="submit">Save</button>
                    </div>
                </form>
        );
    }
}