import React from 'react';
import {apiURL} from "../../constants";
import {Button, Card, CardBody, CardFooter, CardImg, CardTitle, Col} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const GalleriesList = props => {
    return (
        <Col xs="12" sm="6" md="4">
            <Card className="mb-3">
                {props.image
                    ? <RouterNavLink to={`/galleries/${props.id}`} className="card-img-wrap">
                        <CardImg src={`${apiURL}/uploads/${props.image}`} alt={props.title}/>
                    </RouterNavLink>
                    : null
                }

                <CardBody>
                    <CardTitle
                        tag={RouterNavLink}
                        to={`/galleries/${props.id}`}
                    >
                        {props.title}
                    </CardTitle>
                </CardBody>
                {props.user === this.props.user._id
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