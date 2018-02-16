import React, {Component} from 'react';
import {Container, Table}from 'react-materialize'

class Home extends Component{
    componentWillMount () {
        window.Materialize.toast('Welcome !!!', 4000)
    }

    render(){

        return(
            <Container>

                <h1>Tableau de test de l'accueil</h1>
                <Table>
                    <thead>
                    <tr>
                        <th data-field="id">Name</th>
                        <th data-field="name">Item Name</th>
                        <th data-field="price">Item Price</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>Alvin</td>
                        <td>Eclair</td>
                        <td>$0.87</td>
                    </tr>
                    <tr>
                        <td>Alan</td>
                        <td>Jellybean</td>
                        <td>$3.76</td>
                    </tr>
                    <tr>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                    </tr>
                    </tbody>
                </Table>
            </Container>

        )}
}
export default Home;