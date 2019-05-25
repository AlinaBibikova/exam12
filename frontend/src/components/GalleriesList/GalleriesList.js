import React from 'react';
import {Button, Card, CardBody, CardFooter, CardImg, CardText, CardTitle, Col} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

import {apiURL} from "../../constants";

const GalleriesList = props => {
    const userDisplayName = props.userD && props.userD.displayName;
    const userId = props.user && props.user._id;

    return (
        <Col xs="12" sm="6" md="4">
            <Card className="mb-3" onClick={props.toogle}>
                {props.image
                    ?
                        <CardImg src={`${apiURL}/uploads/${props.image}`} alt={props.title}/>

                    : null
                }

                {props.title && userDisplayName ?
                    <CardBody>
                        <CardTitle>
                            {props.title}
                        </CardTitle>
                        <CardText
                            tag={RouterNavLink}
                            to={`/galleries/${props.id}`}
                        >
                            By: {userDisplayName}
                        </CardText>
                </CardBody>
                    : null }
                {userId === props.userD._id
                    ? <CardFooter className="d-flex justify-content-between">
                        <Button size="sm" color="danger" onClick={props.onDelete}>Delete</Button>
                    </CardFooter>
                    : null
                }
            </Card>
        </Col>
    );
};

export default GalleriesList;