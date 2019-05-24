
import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";

import {registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";


class Register extends Component {
    state = {
        username: '',
        password: '',
        displayName: '',
        avatarImage: ''
    };


    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value});
    };

    submitFromHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.registerUser(formData)
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    getFieldHasError = fieldName => {
        return (
            this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].message
        );
    };

    render() {
        return (
            <Fragment>
                <h2>Register new user</h2>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        {this.props.error.global}
                    </Alert>
                )}
                <Form onSubmit={this.submitFromHandler}>
                    <FormGroup>
                        <FacebookLogin/>
                    </FormGroup>

                    <FormElement
                        propertyName="username"
                        title="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldHasError('username')}
                        placeholder="Enter new username"
                        autoComplete="new-username"
                    />

                    <FormElement
                        propertyName="displayName"
                        title="Full name"
                        type="text"
                        value={this.state.displayName}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldHasError('displayName')}
                        placeholder="Your full name"
                    />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldHasError('password')}
                        placeholder="Enter new password"
                        autoComplete="new-password"
                    />

                    <FormElement
                        propertyName="avatarImage"
                        title="Avatar image"
                        type="file"
                        onChange={this.fileChangeHandler}
                        error={this.getFieldHasError('avatarImage')}
                        placeholder="Avatar image"
                    />

                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="info">Register</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);