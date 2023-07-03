import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useTypedSelector, useUserActions } from "../../hooks";
import { useRouter } from "next/router";
import { UserInterface } from "../../interfaces";

const Header = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserInterface>();

  const getUserData = async () => {
    const user = localStorage.getItem("userDatas");
    const userDatas = user && await JSON.parse(user || "");
    userDatas && setUserData(userDatas);
  };
  useEffect(() => {
    getUserData();
  }, []);
  
  const { data } = useTypedSelector((state) => state.user);
  const { logout } = useUserActions();

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Funny Movies</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/videos" >Share videos</Nav.Link>
              {userData ? (
                <NavDropdown title={userData?.name} id={userData?.email}>
                  <NavDropdown.Item onClick={() => router.push('/profile')}>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
                
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
