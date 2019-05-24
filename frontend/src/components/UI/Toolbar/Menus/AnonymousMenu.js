import React, {Fragment} from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const AnonymousMenu = () => (
    <Fragment>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/register">Sign up</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/login">Login</NavLink>
        </NavItem>
    </Fragment>
);

export default AnonymousMenu;