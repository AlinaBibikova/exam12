import React, {Component} from 'react';
import {connect} from "react-redux";
import {deletePhoto, fetchGalleries} from "../../store/actions/galleriesActions";
import {Row} from "reactstrap";
import Loader from "../../components/UI/Loader/Loader";
import GalleriesList from "../../components/GalleriesList/GalleriesList";

class Galleries extends Component {
    componentDidMount() {
        this.props.fetchGalleries();
    }

    render() {
        console.log(this.props.galleries);
        return (
            <Row>
                {this.props.loading && <Loader/>}

                {this.props.galleries.map(galleries => (
                    <GalleriesList
                        key={galleries._id}
                        id={galleries._id}
                        title={galleries.title}
                        image={galleries.image}
                        user={this.props.user}
                        onDelete={() => this.props.deletePhoto(galleries._id)}
                    />
                ))}
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    galleries: state.galleries.galleries,
    error: state.galleries.error,
    loading: state.galleries.loading
});

const mapDispatchToProps = dispatch => ({
    fetchGalleries: () => dispatch(fetchGalleries()),
    deletePhoto: photoId => dispatch(deletePhoto(photoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Galleries);