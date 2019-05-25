import React, {Component} from 'react';
import {connect} from "react-redux";
import {deletePhoto, fetchGalleries, fetchPhoto} from "../../store/actions/galleriesActions";
import Loader from "../../components/UI/Loader/Loader";
import {apiURL} from "../../constants";
import {Card} from "reactstrap";

class Gallery extends Component {
    async componentDidMount()  {
        this.props.fetchGalleries();
        await this.props.fetchPhoto(this.props.match.params.id);
    }

    render() {
        const photo = this.props.photo;
        const userId = this.props.user && this.props.user._id && this.props.user.displayName;

        return (

            <div>
                {this.props.loading && <Loader/>}

                <Card>
                    {userId && photo ?
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
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    photo: state.galleries.photo,
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