import React, {Component, ReactDOM} from 'react';

import {Row, Col, Card} from 'react-materialize';
import {Route, Switch} from 'react-router-dom'
import Competences from './Competences';
import Grille from "./Grille";
import Activites from "./Activites";
import OldSchoolMenuLink from '../Components/OldSchoolMenuLink'
import Appearances from "../Enumeration/Appearance";

let lodash = require('lodash');


class E4 extends Component{
    constructor(props){
        super(props);

        this.state={
            _activites: [],
            selected:null,
            codeActivite:null,
            projets:[],
        }
    }
    componentWillMount(){
        this.fetchActivites();
        this.fetchProjet();
    }

    /***
     * Chargement des activités
     */
    fetchActivites(){
        fetch("https://abeauquel.ovh/api_pfolio/activites",{
            method:'GET',
            header:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'APIKey':'12345',
            },
        })
            .then((response)=>{
                if(!response.ok){
                    this.setState({
                        errorMessage:response.statusText,
                    });
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(json => {
                this.setState({
                    _activites: json,

                });
                console.log("Mes activités sont chargé dans E4");
            })
            .catch((error) => {
                console.log(error)
            });
    }

    /***
     * Chargement des projets
     */
    fetchProjet(){
        fetch("https://abeauquel.ovh/api_pfolio/projets",{
            method:'GET',
            header:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'APIKey':'12345',
            },
        })
            .then((response)=>{
                if(!response.ok){
                    this.setState({
                        errorMessage:response.statusText,
                    });
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(json => {
                console.log(json);

                this.setState({
                    projets: json,

                })


            })
            .catch((error) => {
                console.log(error)
            });
    }

    /* Est appelé lors d'un changement de valeur*/
    changeValue(attr, value){
        this.setState({
            [attr]:value
        })
    }


    render(){

        return(
            <div>

                <nav>
                    <div className={'nav-wrapper '+Appearances.backgroundColor}>
                        <ul className="rightt hide-on-med-and-down">
                            <OldSchoolMenuLink to="/E4/Activites"  label="Illustration des compétences" icon="web"/>
                            <OldSchoolMenuLink to="/E4/Grille" activeOnlyWhenExact={true} label="Tableau de synthèse" icon={"web"}/>
                        </ul>
                    </div>
                </nav>
                <Switch>

                    <Route exact path={'/E4/Grille'} render={() => (
                        <Grille
                            changeValue={this.changeValue.bind(this)}
                            _activites={this.state._activites}
                        />
                    )}/>
                    <Route render={()=>(
                        <Row>

                        <Card  className={'col s5'} style={{height: '55em', overflowY: 'auto'}}>
                            <Activites
                                changeValue={this.changeValue.bind(this)}
                                codeActivite={this.state.codeActivite}
                                _activites={this.state._activites}
                                projets={this.state.projets}
                            />

                        </Card>


                        <Col s={7} style={{height: '55em', overflowY: 'auto'}}>
                            <h3 className={'center-align'}>Liste de compétences</h3>
                            <hr/>

                            {this.state.codeActivite ?
                                <Competences
                                    changeValue={this.changeValue.bind(this)}
                                    _activites={this.state._activites}
                                    codeAct={this.state.codeActivite}
                                />
                            :<blockquote style={{marginLeft:'3%'}}>Sélectionnez une activité</blockquote>}

                        </Col>

                        </Row>
                    )}/>

                </Switch>
        </div>


        )}
}
export default E4;