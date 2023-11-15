import * as React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import * as styles from '../styles/header.module.css'

const Navbar = () => {
  return (
    <Container>
        <Row>
            <Col>Home</Col>
            <Col>Blog</Col>
            <Col>Portfolio and Resume</Col>
        </Row>
    </Container>
  )
}

export default Navbar