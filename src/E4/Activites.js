import React, {Component, ReactDOM} from 'react';
import {
  Link, Route,
} from 'react-router-dom';
import { Collection, Pagination, Row, Col, Input, ProgressBar, Badge, CollectionItem, Icon} from 'react-materialize';
import Appearances from "../Enumeration/Appearance";
let lodash = require('lodash');


class Activites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activites: [],
      selected: null,

      /* Pagination */
      page: 1,
      nbAct: 10,
      nbPage: 5,

      /* Trie*/
      acquiseOnly: false,
      IDprojetSelected: -1,
      wordSearchBar: "",
    }
  }

  componentWillMount() {
    this.loadActivite(this.props._activites);
  }

  /**
   * Quand on reçoit un changement sur les props
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.state.page) {
      this.setState({activePage: nextProps.activePage})
    }
    if (nextProps._activites !== this.props._activites) {
      this.loadActivite(nextProps._activites);
    }
  }

  /***
   * Trie sur ma liste d'activités
   * @param array_activites
   */
  loadActivite(array_activites) {

    let activites = lodash.filter(array_activites, (activite, index) => {
      let result = true;
      let nbCompetencesAcquise = activite.nbCompetencesAcquises;
      console.log("je recharge tout")
      /** Je recompte mes compétences acquises*/

      nbCompetencesAcquise = 0;
        activite.competences.map((competence) => {
          console.log(competence.code)
          competence.Illustrer.map((illustrer) => {
            nbCompetencesAcquise += 1;
          })
        });

        activite.nbCompetencesAcquises = nbCompetencesAcquise;
      console.log(activite.nbCompetencesAcquises);



      /** Vire l'activité si non acquises et AcquiseOnly*/
      if (this.state.acquiseOnly && nbCompetencesAcquise === 0) {
        console.log('je vire l accc')
        return false;
      }

      /** Trie sur la bar de recherche*/
      if (this.state.wordSearchBar !== ""
          && !(activite.code.toLowerCase().includes(this.state.wordSearchBar)
              || activite.libelle.toLowerCase().includes(
                  this.state.wordSearchBar))) {
        return false;
      }

      /** Compte le nombre de compétences acquises pour un projet*/
      if (this.state.IDprojetSelected > 0) {
        nbCompetencesAcquise = 0;
        result = false;
        activite.competences.map((competence) => {
          return competence.Illustrer.map((illustrer) => {
            if (illustrer.Illustration.Projet.id
                === this.state.IDprojetSelected) {
              result = true;
              nbCompetencesAcquise += 1;
            }
          })
        })
        activite.nbCompetencesAcquises = nbCompetencesAcquise;
      }

      return result
    });

    this.setState({
      activites: activites,
      nbPage: Math.round(activites.length / this.state.nbAct, +1),
      page: 1,
    })
  }

  /* Est appelé lors d'un changement de valeur*/
  changeValue(attr, value) {
    this.setState({
      [attr]: value
    })
  }

  /***
   * Evenement sur la barre de recherche
   * @param event
   */
  handleSearchBar(event) {

    this.setState({
      wordSearchBar: event.target.value.toLowerCase(),
    }, () => {
      this.loadActivite(this.props._activites);
    })
  }

  /***
   *  Evenement sur le check de activités acquises seulement
   */
  handleCheckAcquises(e) {
    this.setState({
      acquiseOnly: e.target.checked,
    }, () => {
      this.loadActivite(this.props._activites);
    })

  }

  /***
   * Evenement sur le check de compétences acquises seulement
   */
  handleCheckCompetencesAcquises() {
    let CompacquiseOnly = !this.props.CompAcquisesOnly;
    this.props.changeValue('acquiseOnly', CompacquiseOnly);
  }

  /***
   * Evenement sur la sélection d'un projet
   * @param event
   */
  handleSelectProjet(event) {
    this.setState({
      IDprojetSelected: event.target.value,
      acquiseOnly: event.target.value !== "",
    }, () => {
      this.loadActivite(this.props._activites);
      this.props.changeValue('projetSelected', event.target.value)
    })

  }

  render() {

    return (
        <Row>
          {/*Trie sur les d'activités*/}
          <nav style={{heighttop: '50px', marginBottom: 10}}>
            <div className={'nav-wrapper ' + Appearances.backgroundColor}>
              <form>
                <div className="input-field">
                  <input ref="search" type="search"
                         onChange={(e) => this.handleSearchBar(e)} required/>
                  <label className="label-icon" htmlFor="search"><i
                      className="material-icons">search</i></label>
                </div>
              </form>
            </div>
          </nav>

          <Row>

            <Input s={7} type='select' label='Par projet' icon='computer'
                   onChange={(e) => this.handleSelectProjet(e)}>
              <option></option>
              {this.props.projets.map((projet) => {
                console.log(this.state.acquiseOnly)
                return (
                    <option key={projet.id}
                            value={projet.id}>{projet.nom}</option>
                )
              })}
            </Input>

            {this.state.IDprojetSelected > 0 ?
                <Input s={5} name='group1' key={12} className={'red'}
                       type='checkbox' label='Activités réalisées seulement'
                       onChange={(e) => this.handleCheckAcquises(e)}
                       disabled='disabled'/>
                : <Input s={5} name='group1' key={12} className={'red'}
                         type='checkbox' label='Activités réalisées seulement'
                         checked={this.state.acquiseOnly}
                         onChange={(e) => this.handleCheckAcquises(e)}/>
            }
            <Input s={5} name='group1' key={2} className={'red'} type='checkbox'
                   label='Compétences réalisées seulement'
                   checked={this.props.CompAcquisesOnly}
                   onChange={() => this.handleCheckCompetencesAcquises()}/>

          </Row>
          {this.state.activites.length ? <div className={'center-align '}>
                <Pagination
                    classname={'.pagination .li ' + Appearances.backgroundColor}
                    items={this.state.nbPage} activePage={this.state.page}
                    maxButtons={this.state.nbPage}
                    onSelect={(e) => this.changeValue('page', e)}>

                </Pagination>
              </div>

              : <Col s={12}>
                <ProgressBar/>
                <small>Aucune activite</small>
              </Col>
          }

          {/*Collection d'activités*/}
          <Collection ref={this.state.activites.length}>

            {this.state.activites.map((activite, index) => {
              if (index >= (this.state.page * this.state.nbAct)
                  - this.state.nbAct && index < (this.state.page
                      * this.state.nbAct)) {

                return (<Link
                    className={'collection-item ' + (this.props.codeActivite
                    && this.props.codeActivite === activite.code ? 'active'
                        : '')}
                    key={activite.code} to={'/E4/Activites/' + activite.code}
                    onClick={() => this.props.changeValue('codeActivite',
                        activite.code)}
                > <Row>
                  <Col s={9}><b>{activite.code}</b>{activite.libelle}</Col>
                  <Col s={3}>
                    {activite.nbCompetencesAcquises > 0 ? <Badge
                            className={'red white-text'}>{activite.nbCompetencesAcquises} doc{activite.nbCompetencesAcquises
                        > 1 ? "s" : null}</Badge>
                        : null}
                  </Col>
                </Row>
                </Link>)

              }
              return <div key={activite.code}> {" "}</div>

            })
            }


          </Collection>


        </Row>

    )
  }
}
export default Activites;