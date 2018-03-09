import React, {Component} from 'react';
import {
  Container,
  Collection,
  CollectionItem,
  Badge,
  Row,
  Col,
  ProgressBar
} from 'react-materialize'

class Home extends Component{
  componentWillMount() {

  }

  render() {

    return (
        <Container>

          <h3>Portfolio créé par alexandre beauquel</h3>
          <br/>
          <p>Ce projet permet de répondre à plusieurs epreuves du BTS SIO</p>
          <p>Epreuve E4 : Décrire des situations rencontrées et liens avec les
            activités du référentiel (BTS SIO). Chaque situation correspond à
            une réalisation plus ou moins
            indépendante, correspondant à un nombre limité d’activités du
            référentiel. Le terme de
            situation est ici à rapprocher de sa définition lors de l’épreuve
            E4.</p>

          <p>Epreuve E6 : Evaluation sur la gestion du patrimoine
            informatique et sur la veille technologique. Ce projet est donc en
            mesure de pouvoir fournir des
            éléments concrets sur ces points. Montrer les outils et méthodes
            utilisés et rencontrer personnellement ou en entreprise.</p>
          <Row>
            <br/>
            <Col s={12}>
              <p>Avancement du Projet : </p>
              <ProgressBar progress={50}/>
            </Col>
            <Collection className={'col m5'} header='Notes de versions'>
              <CollectionItem><Badge newIcon> </Badge><b>Version
                1.3</b> Ajout onglet veille
                technologique
                <p>Listes des comptes twitter suivient
                  Affichage du timeline et des tweets sauvegarder pour chaque
                  compte</p>

              </CollectionItem>
              <CollectionItem><b>Version 1.2</b> &nbsp; Modifications
                estétiques
                <p>Ajout de badge pour le nombre de documents par
                  activités</p>
                <p>Modification du nombre du badge nombre de doc pour le
                  nombre de documents par activités en fonction du projet
                  sélectionné</p>
                <p>Ajout d'image pour illustrer les compétences</p>
              </CollectionItem>
              <CollectionItem><b>Version 1.1</b> &nbsp;Changement de
                l'algorythme de trie
                <p>Barre de recherches</p>
                <p>Trie par Activités acquises seulements</p>
                <p>Trie de compétences acquises seulements</p>
                <p>Trie des activités par projet</p>
              </CollectionItem>
              <CollectionItem><b>Version 1.0</b> &nbsp; Changement majeur :
                passage en reactjs, partie Base de données passée sur une
                API en php
                <p>Gestions des activités dynamiques</p>
                <p>Ajout de l'onglet projet</p>
              </CollectionItem>
              <CollectionItem><b>Version 0.5</b> &nbsp;en php(affichage des
                activités, et des compétences)</CollectionItem>
            </Collection>
            <br/>
            <h5>Liens complémentaires</h5>
            <Collection className={'col m5'}>
              <CollectionItem href={'https://github.com/abeauquel/pfolio'}>
                GitHub du projet </CollectionItem>
              <CollectionItem
                  href={'http://www.abeauquel.ovh/api_pfolio/doc.php'}>Documentation
                de l'API </CollectionItem>

            </Collection>

          </Row>
        </Container>

    )
  }
}
export default Home;