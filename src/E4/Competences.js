import React, {Component} from 'react';
import { Collapsible, CollapsibleItem, Row, Col, Card, MediaBox, ProgressBar} from 'react-materialize';
import Appearances from "../Enumeration/Appearance";
let lodash = require('lodash');

const msgNonApprisProjet = (Illust, idProjet) => {
  if (!idProjet) {
    return false
  }
  let bool = true;
  Illust.map((illustrer) => {
    if (illustrer.Illustration.Projet.id === idProjet) {
      console.log("je retourne faux")
      bool = false;
    }
  })
  console.log("je retourne vrai")
  return bool;
}
class Competences extends Component{
  constructor(props) {
    super(props);

    this.state = {
      competencesAmettre: [],
      illustrerAMettre: [],
      competences: [],
      test: 0,
      activite: null,
    }
  }

  componentWillMount() {
    this.loadCompetences(this.props.codeAct, this.props.projetSelected)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.codeAct === this.props.codeAct && prevProps.projetSelected
        === this.props.projetSelected && prevProps.acquiseOnly
        === this.props.acquiseOnly) {
      return;
    }

    this.loadCompetences(this.props.codeAct, this.props.projetSelected)
  }

  /***
   * Algo de trie des compétences en fonction des critères
   * @param codeActivite
   * @param idProjet
   */
  loadCompetences(codeActivite, idProjet) {

    let activite = lodash.find(this.props._activites, (activite) => {
      return activite.code === codeActivite
    });
    let illustrerAMettre = [];

    let competences = lodash.filter(activite.competences, (competence) => {

      /** Si competences acquises seulement*/
      if (this.props.acquiseOnly && !competence.Illustrer.length) {
        return false
      }
      /** Si compétences aquises seulement et projet non select */
      if (this.props.acquiseOnly && !this.props.projetSelected) {
        competence.Illustrer.map((illustrer) => {
          illustrerAMettre.push(illustrer.Illustration.id);
        });
      }

      /** Si aucun trie*/
      if (!this.props.projetSelected && !this.props.acquiseOnly) {
        competence.Illustrer.map((illustrer) => {
          illustrerAMettre.push(illustrer.Illustration.id);
        });
        return true
      }

      /** Si un projet est selectionné*/
      if (this.props.projetSelected) {
        competence.Illustrer.map((illustrer) => {
          if (illustrer.Illustration.Projet.id === idProjet) {

            illustrerAMettre.push(illustrer.Illustration.id);
          }
        })
      }

      return true
    });

    this.setState({
      illustrerAMettre: illustrerAMettre,
      activite: activite,
      competences: competences,
    })
  }

  afficherImagesIllustrer(Illust) {
    let str = [];
    let codeCompetence = Illust.Competence.replace('.', '-');
    codeCompetence = codeCompetence.replace('.', '-');
    codeCompetence = codeCompetence.replace('.', '-');
    for (let i = 1; i <= Illust.haveLien; i++) {

      str.push(
          <MediaBox
              src={"/img/illustrer/illustrer"
              + i
              + Illust.ordreApparition
              + Illust.Illustration.id
              + codeCompetence
              + ".png"}
              caption={"screen doc sur "
              + Illust.Illustration.Projet.nom
              + " (illustre " + Illust.Competence
              + " )"} width="500"/>
      )
    }
    return str
  }

  render() {

    return (
        <Row>

          <blockquote style={{borderLeftColor: Appearances.backgroundColor}}>
            <h4>Activite
              : {this.state.activite != null ? this.state.activite.code
                  : null}</h4></blockquote>

          {this.state.competences.length < 1 ? <Col s={10}>
                <ProgressBar/>
                <small>Chargement des competences</small>
                <br/>
              </Col>
              : this.state.competences.map((comp, indexComp) => (

                  <Card key={comp.code}><h5><b>{comp.code}</b>{comp.libelle}
                  </h5> <br/>

                    {/*Si la competence n'a jamais été validé*/}
                    {comp.Illustrer.length < 1 ?
                        <small>Compétence non acquise</small>
                        : <div>
                          {/*Si la competence n'a jamais été validé avec ce projet*/}
                          {msgNonApprisProjet(comp.Illustrer,
                              this.props.projetSelected) ?
                              <small>Compétence non acquise (avec ce
                                projet)</small>
                              : null}
                        </div>

                    }
                    {comp.Illustrer.map((Illust, indexIllustrer) => {
                      /** Si l'illustrer ne dois pas être affiché*/
                      if (!this.state.illustrerAMettre.includes(
                              Illust.Illustration.id)) {
                        return null
                      }
                      return (
                          <div key={indexIllustrer}>
                            <br/>
                            <p>{Illust.description}</p>
                            {Illust.haveLien > 0 ? this.afficherImagesIllustrer(
                                Illust)

                                : null}
                            <Collapsible accordion>
                              <CollapsibleItem header={"En lien avec : "
                              + Illust.Illustration.titre}>
                                <div
                                    style={{whiteSpace: 'pre'}}>{(Illust.Illustration.description)}</div>

                                {Illust.Illustration.haveIMG === '1' ? <MediaBox
                                        src={"/img/illustration/illustration"
                                        + Illust.Illustration.id
                                        + ".png"}
                                        caption={"screen réalisation sur "
                                        + Illust.Illustration.Projet.nom
                                        + " (illustre " + comp.code
                                        + " )"} width="500"/>
                                    : null}

                                <Collapsible popout>
                                  <CollapsibleItem
                                      header={" Extrait du projet : "
                                      + Illust.Illustration.Projet.nom}>
                                    <p style={{whiteSpace: 'pre'}}><b>Contexte
                                      :</b> {Illust.Illustration.Projet.contexte}
                                    </p>
                                    <p style={{whiteSpace: 'pre'}}><b>Description
                                      : </b>{Illust.Illustration.Projet.description}
                                    </p>
                                  </CollapsibleItem>
                                </Collapsible>
                              </CollapsibleItem>

                            </Collapsible>
                          </div>)
                    })}
                  </Card>

              ))
          }
        </Row>

    )
  }
}

export default Competences
