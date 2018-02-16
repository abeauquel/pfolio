import React, {Component} from 'react';
import { Collection, Autocomplete, Table, Row, Col, Icon, CardTitle, MenuItem, ProgressBar} from 'react-materialize';

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
                    <Table hoverable={true} centred={false} responsive={false} bordered={true}>
                        <thead>
                        <tr >
                            <th data-field="id" style={{backgroundColor:'grey' }}><div className={'center-align'}><p>Situation</p> <p>professionnelle </p> <p>(intitulé et liste des </p> <p>documents et </p>production associés)</div></th>
                            {this.state.activites.map((activite, index)=>{
                                return <th data-field="name"  style={{writingMode: 'sideways-lr'}}><div className={'left-align'}><b >{activite.code}</b> {activite.libelle}</div></th>

                            })}

                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td >PROJET 1</td>
                            {this.state.activites.map((activite, index)=>{
                                return <td><a href="#"><Icon>check</Icon></a></td>


                            })}

                        </tr>
                        <tr>
                            <td>PROJET 2</td>
                            {this.state.activites.map((activite, index)=>{
                                return <td><a href="#"><Icon>check</Icon></a></td>


                            })}
                        </tr>
                        <tr>
                            <td>PROJET 3</td>
                            {this.state.activites.map((activite, index)=>{
                                return <td><a href="#"><Icon>check</Icon></a></td>


                            })}
                        </tr>
                        </tbody>
                    </Table>


                </Row>

            </div>

        )
    }
}
export default Grille
