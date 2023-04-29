import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import mainNavbarStyles from './MainNavbar.module.css'
import { Container, Nav, Navbar } from 'react-bootstrap';

const MainNavbar = () => {
    return (                
        <>

                    <Navbar bg="lt" expand="lg" style={{padding:'0'}}>
                        <Container>
                    <nav className={mainNavbarStyles['main-nav']}>
                        <div className={mainNavbarStyles['brand-logo']}>
                            <Navbar.Brand href="#home">
                                <img src="src\assets\general\Authlogo.png" alt="" />
                            </Navbar.Brand>
                        </div>
                        <div className={mainNavbarStyles['nav-container']}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className={mainNavbarStyles['nav-paths']}>
                                    <Nav.Link href="#home">Home</Nav.Link>
                                    <Nav.Link href="#link">About</Nav.Link>
                                    <Nav.Link href="#link2">Features </Nav.Link>
                                    <div href="#link3">
                                        <button className={mainNavbarStyles['get-started-btn']}>
                                            Get Started
                                        </button>
                                        <section className={mainNavbarStyles['register-options']}>
                                        <ul>
                                            <li>
                                                <NavLink>As an Altschooler</NavLink>
                                            </li>
                                            <li>
                                                <NavLink>
                                                    As an Instructor/Mentor
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink>As a Regular Student</NavLink>
                                            </li>
                                        </ul>
                                    </section>
                                    </div>
    
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    </nav>
                    </Container>
                </Navbar>
         </>
        );
}

export default MainNavbar