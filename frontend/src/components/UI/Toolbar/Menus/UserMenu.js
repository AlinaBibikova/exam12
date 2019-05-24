import React from 'react';
import { Nav, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import AvatarThumbnail from "../../../AvatarThumbnail/AvatarThumbnail";

const UserMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem>
                <AvatarThumbnail user={user} avatarImage={user.avatarImage}/>
            </NavItem>
            <NavItem>
                <span className="nav-link">Hello, {user.displayName}</span>
            </NavItem>
            <NavItem>
                <NavLink tag={RouterNavLink} to="//new">Add new</NavLink>
            </NavItem>
            <NavItem>
                <span className="nav-link" onClick={logout}>Logout</span>
            </NavItem>
        </Nav>
    );
};

export default UserMenu;