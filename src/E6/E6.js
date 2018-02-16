import React, {Component} from 'react';
import {Container, Toast}from 'react-materialize'
import {Collection, CollectionItem, Badge, Row, Col} from 'react-materialize';

class E6 extends Component{
    render(){
        return(
            
            <Container>
                <h1>Bien routé dans E4</h1>

                <p>GDFJKGIODJGIODFJGIODFJG</p>
                <Row>
                    <Col s={3}>
                        <Toast toast="E4">Click pour un tooltip E4 !!</Toast></Col>
                    <Col s={5} >
                        <p>E4</p>
                        <p>E4</p>
                        <p>E4</p>
                        <p>E4</p>
                        <p>E4</p>
                        <p>E4</p>
                        <p>E4</p>

                    </Col>
                </Row>
            </Container>

        )}
}
export default E6;