import React, {Component} from 'react';
import { Collapsible, CollapsibleItem, Row, Col, Card, MediaBox, ProgressBar} from 'react-materialize';
import Appearances from "../Enumeration/Appearance";
let lodash = require('lodash');


class Competences extends Component{
    constructor(props){
        super(props);

        this.state={
            _competences:[],
            competences:[],
            test:0,
            activite:null,
        }
    }

    componentWillMount(){

    }

    componentWillUpdate(nextProps, nextState){
      if(nextProps.codeAct === this.props.codeAct){
          return;
      }

      this.loadCompetences(nextProps.codeAct)
  }


    loadCompetences(codeActivite){
        let activite= lodash.find(this.props._activites,(activite)=>{
            return activite.code === codeActivite
            });

        this.setState({
            competences: activite.competences,
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
            <Card key={this.props.codeAct} >

                <blockquote  style={{borderLeftColor: Appearances.backgroundColor}}><h4 >Activite : {this.props.codeAct}</h4></blockquote>

                {!this.state.competences ?
                    <Col s={12}>
                        <ProgressBar />
                        <small>Chargement des competences</small>
                    </Col>
                    :
                    this.state.competences.map((comp,indexComp)=>(

                            <Card key={comp.code}>
                            <h5><b>{comp.code}</b>{comp.libelle}</h5> <br/>

                            {comp.Illustrer.length <1 ?
                                <div><br/><small>Compétence non acquise</small></div>
                            :
                            comp.Illustrer.map((Illust, indexIllustrer)=>(
                                <div key={indexIllustrer}>
                                    <br/>
                                <p>{Illust.description}</p>
                                    <Collapsible accordion >
                                        <CollapsibleItem header={"En lien avec : "+Illust.Illustration.titre} >
                                            <div style={{whiteSpace: 'pre'}}>{(Illust.Illustration.description)}</div>
                                            {Illust.Illustration.haveIMG === '1' ?
                                            <MediaBox src={"/img/illustration/illustration"+Illust.Illustration.id+".png"} caption={"screen réalisation sur " +Illust.Illustration.Projet.nom + " (illustre "+ comp.code + " )"} width="500"/>
                                            :null}
                                            <Collapsible popout >
                                                <CollapsibleItem header={" Extrait du projet : "+ Illust.Illustration.Projet.nom} >
                                                    <p style={{whiteSpace: 'pre'}}><b>Contexte :</b> {Illust.Illustration.Projet.contexte}</p>
                                                    <p style={{whiteSpace: 'pre'}}><b>Description : </b>{Illust.Illustration.Projet.description}</p>
                                                </CollapsibleItem>
                                            </Collapsible>
                                        </CollapsibleItem>

                                    </Collapsible>

                                </div>
                            ))

                            }
                            </Card>

                    ))
                    }
            </Card>

        )
    }
}
export default Competences
