import React, {Component, ReactDOM} from 'react';
import {
  Link, Route,
} from 'react-router-dom';
import {
  Collection,
  Card,
  Row,
  Col,
  Input,
  ProgressBar,
  Badge,
  CollectionItem,
  Icon
} from 'react-materialize';
import Appearances from "../Enumeration/Appearance";

let lodash = require('lodash');

class ActivitesObligatoire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activites: [
        {
          id: 1,
          libelle: "Production d'une solution logiciel et d'infrastructure"
        },
        {
          id: 2,
          libelle: "Prise en charge d'incidents et de de demandes d'assitances"
        },
        {id: 4, libelle: "Elaboration de document relatif à la production"},
        {
          id: 3,
          libelle: "Mise en place d'un dispositif de veille technologique"
        }],
      selected: null,
      preuves: [
        {
          id: 1,
          libelle: "Activités réalisé grâce aux projets ( voir portfolio)"
        },
        {id: 2, libelle: "à venir "},
        {id: 3, libelle: "Twitter <3<3"},
        {
          id: 4,
          libelle: " Ce portfolio fait office de document relatif à la production ? "
        },
      ],
    }
  }

  render() {

    return (
        <Row>

          <Card className={'col s4'}>
            <h3>Activités obligatoires</h3>
            <hr/>

            {this.state.activites.length ? null
                : <Col s={12}>
                  <ProgressBar/>
                  <small>Chargement des activités</small>
                </Col>
            }
            <Collection>

              {this.state.activites.map((activite, index) => {

                return <Link key={activite.id} to={'#'}
                             className={'collection-item' + (this.state.selected
                             && this.state.selected.id === activite.id
                                 ? ' active' : '')}
                             onClick={() => this.setState(
                                 {selected: activite})}>{activite.libelle}</Link>

              })
              }


            </Collection>

          </Card>
          <Col s={8}>
            {this.state.selected ? <Card className={Appearances.backgroundColor}
                                         textClassName={Appearances.TxtColor
                                         + '-text'}>
                  <h5>{this.state.selected.libelle}</h5>
                  {this.state.preuves.map((preuve) => {
                    if (this.state.selected && preuve.id
                        === this.state.selected.id) {
                      return (<p>{preuve.libelle}</p>)
                    }
                  })}
                </Card>
                : <p>Sélectionnez une activité</p>}
          </Col>


        </Row>
    )
  }
}

export default ActivitesObligatoire;