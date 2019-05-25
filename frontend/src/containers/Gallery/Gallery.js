import React, {Component} from 'react';
import {connect} from "react-redux";
import {deletePhoto, fetchGalleries, fetchPhoto} from "../../store/actions/galleriesActions";
import Loader from "../../components/UI/Loader/Loader";
import {apiURL} from "../../constants";

class Gallery extends Component {
    async componentDidMount()  {
        this.props.fetchGalleries();
        await this.props.fetchPhoto(this.props.match.params.id);
    }

    render() {

        const photo = this.props.photo;
        const userDisplayName = this.props.galleries && this.props.galleries.user && this.props.galleries.user.displayName;
        const userId = this.props.user && this.props.user._id && this.props.user.displayName;

        return (

            <div>
                {this.props.loading && <Loader/>}

                {userId || userDisplayName ?
                    <h3 className="mb-3">{userId} gallery</h3>
                    : null}

                <p>
                    <strong>
                        {photo.title}
                    </strong>
                </p>
                {photo.image && (
                    <img src={`${apiURL}/uploads/${photo.image}`} className="item-img" alt={photo.title}/>
                )}

                {/*{userId === this.props.galleries.user._id*/}
                    {/*? <CardFooter className="d-flex justify-content-between">*/}
                        {/*<Button size="sm" color="danger" onClick={() => this.deletePhoto(this.props.match.params.id)}>Delete</Button>*/}
                    {/*</CardFooter>*/}
                    {/*: null*/}
                {/*}*/}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    photo: state.galleries.photo,
    galleries: state.galleries.galleries,
    user: state.users.user,
    error: state.galleries.error,
    loading: state.galleries.loading
});

const mapDispatchToProps = dispatch => ({
    fetchGalleries: () => dispatch(fetchGalleries()),
    fetchPhoto: photoId => dispatch(fetchPhoto(photoId)),
    deletePhoto: photoId => dispatch(deletePhoto(photoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);