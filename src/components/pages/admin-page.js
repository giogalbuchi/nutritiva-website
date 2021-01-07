import React, { Component } from "react";
import { functions } from '../../firebase';

export default class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: '',
            blogItem: {},
            email: '',
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const adminEmail = this.state.email;
        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({ email: adminEmail }).then(result => {
            console.log(result)
            this.setState({
                message: result.data.message
            })
        })
    }


    

  render() {
    return (
        <div className="page-container">
            <div className="content-container">

                <div className="user-info">
                    <h1 className="title">You are logged in as {this.props.userEmail}</h1>
                </div>

                <div className="admin-title">
                    <h1 className="title">Add New Admin</h1>
                </div>

                <form id='form1' onSubmit={this.handleSubmit} className="blog-form-wrapper">
                    <div className="admin-maker">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="admin-button">
                        <button className="btn" type="submit">Save</button>
                    </div>

                </form>

                <div className="success-title">
                    <h2 className="title">{this.state.message}</h2>
                </div>
            </div>
        </div>
    );
  }
}