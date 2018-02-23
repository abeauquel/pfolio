import React, {Component} from 'react';
import { Table, Row, Col, Icon, ProgressBar} from 'react-materialize';
import {
    Link
} from 'react-router-dom';
let lodash = require('lodash');

class Grille extends Component{

    constructor(props){
        super(props);

        this.state={
            activites: [],

        }
    }
    componentWillMount(){
        this.loadActivite(this.props._activites);

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps._activites !== this.props._activites){
            this.loadActivite(nextProps._activites);
            console.log("j'ai rechargé mes activités");
        }
    }

    loadActivite(array_activites){
        let activites = array_activites;

        this.setState({
            activites:activites,
            nbPage: Math.round(activites.length / this.state.nbAct,+1)
        })
    }
    /* Est appelé lors d'un changement de valeur*/
    changeValue(attr, value){
        this.setState({
            [attr]:value
        })
    }

    render(){

        return(
            <div key={'grille'}>

                <Row>
                    <h3>Grille de compétences</h3>
                  {/*  <Col s={10}>
                        <ProgressBar />
                        <small>Chargement de la grille competences</small>
                    </Col>*/}

                    {this.state.activites.length ?

                     null


                        : <Col s={12}>
                            <ProgressBar />
                            <small>Aucune activite</small>
                        </Col>
                    }
                    <div style={{overflowX:'auto'}}>
                        <Table responsive={false} bordered={true}
                               style={{border: 'solid black 2px', borderCollapse: 'collapse'}}>
                        <thead style={{width:'50px', }}>
                        <tr >
                            <th data-field="id" style={{backgroundColor:'grey' }}><div className={'center-align'}><p>Situation</p> <p>professionnelle </p> <p>(intitulé et liste des </p> <p>documents et </p>production associés)</div></th>
                            {this.state.activites.map((activite, index)=>{
                                return <th key={activite.code} data-field="name"
                                           style={{border: 'solid black 2px', borderCollapse: 'collapse'}}>
                                    <b>{activite.code}</b> {activite.libelle}</th>

                            })}

                        </tr>
                        </thead>

                        <tbody>
                        <tr style={{border:'solid black 2px', borderCollapse:'collapse'}}>
                            <td style={{border:'solid black 2px', borderCollapse:'collapse'}}>Réaliser</td >
                            {this.state.activites.map((activite, index)=>{
                                return <td key={index} style={{border: 'solid black 2px', borderCollapse: 'collapse'}}>
                                    {activite.nbCompetencesAcquises > 0 ?
                                        <Link to={'/E4/Activites/' + activite.code}><Icon center
                                                                                          large>check</Icon></Link> : null}
                                </td>


                            })}

                        </tr>

                        </tbody>
                    </Table>
                    </div>


                </Row>

            </div>

        )
    }
}
export default Grille
