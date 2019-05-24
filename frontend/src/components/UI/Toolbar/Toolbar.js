import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from "reactstrap";

import UserMenu from "./Menus/UserMenu";
import AnonymousMenu from "./Menus/AnonymousMenu";

const Toolbar = ({user, logout}) => {
    return (
        <Navbar color="info" dark expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">My </NavbarBrand>
            <Nav className="ml-auto" navbar>
                {user ? <UserMenu user={user} logout={logout}/> : <AnonymousMenu/>}
            </Nav>
        </Navbar>
    );
};

export default Toolbar;