import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class PhotoForm extends Component {
        state = {
            title: '',
            image: '',
        };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
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

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            if (this.state[key]) {
                formData.append(key, this.state[key]);
            }
        });

        this.props.addPhoto(formData);
    };

        render() {
            return (
                <Form onSubmit={this.submitFormHandler}>

                    <FormGroup row>
                        <Label sm={2} for="title">Title:</Label>
                        <Col sm={10}>
                            <Input
                                type="text" required
                                name="title" id="title"
                                placeholder="Enter title"
                                value={this.state.title}
                                onChange={this.inputChangeHandler}
                                error={this.getFieldHasError('title')}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={2} for="image">Image:</Label>
                        <Col sm={10}>
                            <Input
                                type="file"
                                name="image" id="image"
                                onChange={this.fileChangeHandler}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={{offset:2, size: 10}}>
                            <Button type="submit" color="primary">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        }
    }

export default PhotoForm;