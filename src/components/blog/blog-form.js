import React, { Component} from 'react';
import axios from 'axios';
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../forms/rich-text-editor";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            category: "Recipe",
            position: "",
            url:"",
            thumb_image:"",
            banner_image:"",
            logo:"",
            editMode: false,
            apiUrl: "https://nutritiva.devcamp.space/portfolio/portfolio_items",
            apiAction: "post"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

        this.thumbRef = React.createRef();
    }

    handleRichTextEditorChange(description) {
        this.setState({ description });
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

    componentDidUpdate() {
        if (Object.keys(this.props.blogToEdit).length > 0) {
            const {
                id,
                name,
                description,
                category,
                position,
                url,
                thumb_image_url
            } = this.props.blogToEdit;

            this.props.clearBlogToEdit();

            this.setState({
                id: id,
                name: name || "",
                description: description || "",
                category: category || "Recipe",
                position: position || "",
                url: url || "",
                editMode: true,
                apiUrl: `https://nutritiva.devcamp.space/portfolio/portfolio_items/${id}`,
                apiAction: "patch",
                thumb_image_url: thumb_image_url || ""
            });
        }
    }

    handleThumbDrop() {
        return {
            addedfile: file => this.setState({ thumb_image: file })
        };
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        };
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        };
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);

        if(this.state.thumb_image) {
            formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }

        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleSubmit(event) {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
            })
            .then(response => {
                if (this.state.editMode) {
                    this.props.handleEditFormSubmission();
                } else {
                    this.props.handleNewFormSubmission(response.data.portfolio_item);
                }

                this.setState({
                    name:"",
                    description:"",
                    category: "Recipe",
                    position: "",
                    url: "",
                    thumb_image: "",
                    editMode: false,
                    apiUrl: "https://nutritiva.devcamp.space/portfolio/portfolio_items",
                    apiAction: "post"
                });

                [this.thumbRef].forEach(ref => {
                    ref.current.dropzone.removeAllFiles();
                });
            })
            .catch(error => {
                console.log("portfolio form handleSubmit error", error);
            });

        event.preventDefault();
    }


    render() {
        return (
                <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                    <div className="two-column">
                        <input
                            type="text"
                            name="name"
                            placeholder="Blog Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />

                        <input
                            type="text"
                            name="url"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="two-column">
                    <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={this.state.position}
                        onChange={this.handleChange}
                    />

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
                    {/* <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    /> */}
                        <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange} />
                    </div>

                    <div className="image-uploader one-column">
                        {this.state.thumb_image_url && this.state.editMode ? (
                            <div className="blog-manager-image-wrapper">
                                <img src={this.state.thumb_image_url} />

                                <div className="image-removal-link">
                                    <a onClick={() => this.deleteImage("thumb_image")}>
                                        Remove file
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <DropzoneComponent
                                ref={this.thumbRef}
                                config={this.componentConfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleThumbDrop()}
                            >
                                <div className="dz-message">Blog Image</div>
                            </DropzoneComponent>
                        )}
                        
                    </div>

                    <div className="one-column">
                        <button className="btn" type="submit">Save</button>
                    </div>
                </form>
        );
    }
}