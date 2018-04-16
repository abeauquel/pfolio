import React, {Component, ReactDOM} from 'react';

import {Row, Col, Card, Navbar, NavItem, SideNav} from 'react-materialize';
import {Route, Switch} from 'react-router-dom'
import Competences from './Competences';
import Grille from "./Grille";
import Activites from "./Activites";
import ActivitesObligatoires from "./ActivitesObligatoire"
import OldSchoolMenuLink from '../Components/OldSchoolMenuLink'
import Appearances from "../Enumeration/Appearance";

let lodash = require('lodash');


class E4 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      _activites: [],
      selected: null,
      codeActivite: props.match.params.codeActivite || null,
      projets: [],

      acquiseOnly: false,
      projetSelected: null,
    }
  }

  componentWillMount() {
    this.fetchActivites();
    this.fetchProjet();

  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      codeActivite: nextProps.match.params.codeActivite,
    })
  }

  /***
   * Chargement des activités
   */
  fetchActivites() {
    fetch(process.env.REACT_APP_API_HOST + "activites", {
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'APIKey': '12345',
      },
    })
    .then((response) => {
      if (!response.ok) {
        this.setState({
          errorMessage: response.statusText,
        });
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      this.setState({
        _activites: json,

      });

    })
    .catch((error) => {
      console.log(error)
    });
  }

  /***
   * Chargement des projets
   */
  fetchProjet() {
    fetch(process.env.REACT_APP_API_HOST + "projets", {
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'APIKey': '12345',
      },
    })
    .then((response) => {
      if (!response.ok) {
        this.setState({
          errorMessage: response.statusText,
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
  changeValue(attr, value) {
    this.setState({
      [attr]: value
    })
  }

  render() {

    return (
        <div>
          {/*      <Navbar brand='' ref={'navBarE4'} left
                  className={Appearances.backgroundColor}
                  options={{edge: 'right'}}
          >
            <div className={'nav-wrapper ' + Appearances.backgroundColor}>
              <ul className="rightt hide-on-med-and-down">
                <OldSchoolMenuLink to="/E4/Activites"
                                   label="Illustration des compétences"
                                   icon="view_list"/>
                <OldSchoolMenuLink to="/E4/Grille" activeOnlyWhenExact={true}
                                   label="Tableau de synthèse"
                                   icon={"view_module"}/>
                <OldSchoolMenuLink to="/E4/ActivitesObligatoires"
                                   label="Activités obligatoires"
                                   icon={"view_list"}/>
              </ul>
            </div>
          </Navbar>*/}
          <nav>
            <div className={' nav-wrapper ' + Appearances.backgroundColor}>
              <ul className="hide-on-med-and-down">
                <OldSchoolMenuLink to="/E4/Activites"
                                   label="Illustration des compétences"
                                   icon="view_list"/>
                <OldSchoolMenuLink to="/E4/Grille" activeOnlyWhenExact={true}
                                   label="Tableau de synthèse"
                                   icon={"view_module"}/>
                <OldSchoolMenuLink to="/E4/ActivitesObligatoires"
                                   label="Activités obligatoires"
                                   icon={"view_list"}/>
              </ul>
            </div>
          </nav>
          <Switch>

            <Route exact path={'/E4/Grille'} render={() => (
                <Grille
                    changeValue={this.changeValue.bind(this)}
                    _activites={this.state._activites}
                    projets={this.state.projets}
                />
            )}/>
            <Route exact path={'/E4/ActivitesObligatoires'} render={() => (
                <ActivitesObligatoires
                />
            )}/>
            <Route render={() => (
                <Row>

                  <Card className={'col m5 col s12 E4composant'}>
                    <Activites
                        changeValue={this.changeValue.bind(this)}
                        codeActivite={this.state.codeActivite}
                        _activites={this.state._activites}
                        projets={this.state.projets}
                        CompAcquisesOnly={this.state.acquiseOnly}
                    />

                  </Card>


                  <Col m={7} s={12} className={'E4composant'}>
                    <h3 className={'center-align'}>Liste de compétences</h3>
                    <hr/>
                    {/*
                            {alert(this.state.codeActivite)}
*/}
                    {this.state.codeActivite && this.state._activites.length > 0
                        ? <Competences
                            changeValue={this.changeValue.bind(this)}
                            _activites={this.state._activites}
                            codeAct={this.state.codeActivite}
                            acquiseOnly={this.state.acquiseOnly}
                            projetSelected={this.state.projetSelected}

                        />
                        : <blockquote style={{
                          marginLeft: '3%',
                          borderLeft: '5px solid ' + Appearances.backgroundColor
                        }}>Sélectionnez une activité</blockquote>}

                  </Col>

                </Row>
            )}/>

          </Switch>
        </div>

    )
  }
}
export default E4;