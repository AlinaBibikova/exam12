import React from 'react';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import {apiURL} from "../../constants";

const styles = {
    width: '35px',
    height: '35px',
    marginRight: '5px'
};

const AvatarThumbnail = props => {
    let image = imageNotAvailable;

    if (props.avatarImage) {
        image = apiURL + '/uploads/' + props.avatarImage;
    }
    if (props.user.facebookId){
        image = props.user.avatarImage;
    }

    return <img src={image} style={styles} className="img-avatar" alt="Avatar" />;
};

export default AvatarThumbnail;