import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {addPhoto} from "../../store/actions/galleriesActions";
import PhotoForm from "../../components/PhotoForm/PhotoForm";

class NewPhoto extends Component {
    render() {
        return (
            <Fragment>
                <h2 className="mb-4">Add new photo</h2>

                <PhotoForm
                    addPhoto={this.props.addPhoto}
                    error={this.props.error}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.galleries.error
});

const mapDispatchToProps = dispatch => ({
    addPhoto: photoData => dispatch(addPhoto(photoData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPhoto);