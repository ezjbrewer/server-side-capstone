import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

return (
    <div>
    <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        Super Sandwich Makers
        </NavbarBrand>
        {loggedInUser ? (
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
            <Nav navbar>
                <NavItem>
                <NavLink tag={RRNavLink} to="/order/create">
                    New Order
                </NavLink>
                </NavItem>

                <NavItem>
                <NavLink tag={RRNavLink} to="/order/tracking">
                    Track Order
                </NavLink>
                </NavItem>
                {loggedInUser?.roles.includes("Admin") && (
                    <>
                        <NavItem>
                        <NavLink tag={RRNavLink} to="/ingredient">
                            Ingredient Manager
                        </NavLink>
                        </NavItem>
                    </>
                )}
                {loggedInUser?.roles.includes("Employee") && (
                        <>
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/activeOrders">
                                    Active Orders
                                </NavLink>
                            </NavItem>
                        </>
                    )}
                <NavItem>
                <NavLink tag={RRNavLink} to="/information">
                    Contact Us
                </NavLink>
                </NavItem>
            </Nav>
            </Collapse>
            <Button
            color="danger"
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                setLoggedInUser(null);
                setOpen(false);
                });
            }}
            >
            Logout
            </Button>
        </>
        ) : (
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                Login
            </NavLink>
            </NavItem>
        </Nav>
        )}
    </Navbar>
    </div>
);
}