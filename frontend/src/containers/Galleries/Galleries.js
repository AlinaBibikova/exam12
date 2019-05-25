import React, {Component} from 'react';
import {connect} from "react-redux";
import {deletePhoto, fetchGalleries} from "../../store/actions/galleriesActions";
import {Button, Modal, ModalFooter, ModalHeader, Row} from "reactstrap";
import Loader from "../../components/UI/Loader/Loader";
import GalleriesList from "../../components/GalleriesList/GalleriesList";
import {apiURL} from "../../constants";

class Galleries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            image: {}
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle(image) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            image
        }));
    }

    componentDidMount() {
        this.props.fetchGalleries();
    }

    render() {
        return (
            <Row>
                {this.props.loading && <Loader/>}

                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>{this.state.image.title}</ModalHeader>
                        <img src={`${apiURL}/uploads/${this.state.image.image}`} className="Gallery"/>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>

                {this.props.galleries.map(galleries => (
                    <GalleriesList
                        key={galleries._id}
                        id={galleries._id}
                        title={galleries.title}
                        image={galleries.image}
                        userD={galleries.user}
                        user={this.props.user}
                        toogle={() => this.toggle(galleries)}
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