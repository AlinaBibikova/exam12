import React from 'react';
import {Button, Card, CardBody, CardFooter, CardImg, CardText, CardTitle, Col} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

import {apiURL} from "../../constants";

const GalleriesList = props => {
    const userDisplayName = props.userD && props.userD.displayName;
    const userId = props.user && props.user._id;

    return (
        <Col xs="12" sm="6" md="4">
            <Card className="mb-3">
                {props.image
                    ? <RouterNavLink to={`/galleries/${props.id}`} className="card-img-wrap">
                        <CardImg src={`${apiURL}/uploads/${props.image}`} alt={props.title}/>
                    </RouterNavLink>
                    : null
                }

                {props.title && userDisplayName?
                    <CardBody>
                        <CardTitle
                            tag={RouterNavLink}
                            to={`/galleries/${props.id}`}
                        >
                            {props.title}
                        </CardTitle>
                        <CardText>
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