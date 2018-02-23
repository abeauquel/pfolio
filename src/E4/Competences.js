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
        console.log(this.props.codeAct)
        this.loadCompetences(this.props.codeAct)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.codeAct)
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
            activite: activite,
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
            <Card key={'competences'}>

                <blockquote style={{borderLeftColor: Appearances.backgroundColor}}><h4>Activite
                    : {this.state.activite != null ? this.state.activite.code : null}</h4></blockquote>

                {this.state.competences.length < 1 ?
                    <Col s={10}>
                        <ProgressBar />
                        <small>Chargement des competences</small>
                    <br/>
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
