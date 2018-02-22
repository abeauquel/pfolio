import React, {Component} from 'react';
import {Container}from 'react-materialize'

class Home extends Component{
    componentWillMount () {

    }

    render(){

        return(
            <Container>

                <h3>Portfolio créé par alexandre beauquel</h3>
                <br/>
                <p>Ce projet permet de répondre à plusieurs epreuves du BTS SIO</p>
                <p>Epreuve E4 :  Décrire des situations rencontrées et liens avec les
                    activités du référentiel (BTS SIO). Chaque situation correspond à une réalisation plus ou moins
                    indépendante, correspondant à un nombre limité d’activités du référentiel. Le terme de
                    situation est ici à rapprocher de sa définition lors de l’épreuve E4.</p>

                <p>Epreuve E6 : Evaluation sur la gestion du patrimoine
                    informatique et sur la veille technologique. Ce projet est donc en mesure de pouvoir fournir des
                    éléments concrets sur ces points. Montrer les outils et méthodes utilisés et rencontrer personnellement ou en entreprise.</p>
            </Container>

        )}
}
export default Home;