import React, {Component} from 'react';
import { Collapsible, CollapsibleItem, Pagination, Row, Col, Card, CardTitle, MenuItem, ProgressBar} from 'react-materialize';
import Appearances from "../Enumeration/Appearance";
let lodash = require('lodash');
let $ = require("jquery")(window);
class Competences extends Component{
    constructor(props){
        super(props);

        this.state={
            _competences:[],
            competences:[],
            test:0,
        }
    }

    componentWillMount(){
        this.fetchCompetences();

    }

    componentWillUpdate(nextProps, nextState){
    console.log("update du composant COMPETENCE");
      if(nextProps.codeAct === this.props.codeAct){
          return;
      }

      this.loadCompetences(nextProps.codeAct)
  }

    fetchCompetences(){
        fetch("https://abeauquel.ovh/api_pfolio/competences",{
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
                    _competences: json,},()=>{this.loadCompetences(this.props.codeAct);

                });
                console.log("jai reload de l'API :"+this.state.competences);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadCompetences(codeActivite){
        console.log(this.state._competences);
        let competences =lodash.filter(this.state._competences,(comp)=> {
            return comp.activite === codeActivite
        });
        console.log("MES COMPT :"+ competences);
        competences.map((co)=>{
            console.log(co.code)
        })

        this.setState({
            competences: competences,
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
            <div key={this.props.codeAct}>

                <blockquote  style={{borderLeftColor: Appearances.backgroundColor}}><h4 >Activite : {this.props.codeAct}</h4></blockquote>

                {!this.state.competences ?
                    <Col s={12}>
                        <ProgressBar />
                        <small>Chargement des competences</small>
                    </Col>
                    :
                    this.state.competences.map((comp,indexComp)=>(

                        <div key={comp.code}>
                            <Card>
                            <h5><b>{comp.code}</b>{comp.libelle}</h5>

                            {comp.Illustrer.length <1 ?
                                <div><br/><small>Compétence non acquise</small></div>
                            :
                            comp.Illustrer.map((Illust, indexIllustrer)=>(
                                <div key={comp.code+Illust.ordreAppartition}>

                                <p>{Illust.description}</p>

                                    <Collapsible accordion >
                                        <CollapsibleItem header={"En lien avec : "+Illust.Illustration.titre} >
                                            <div style={{whiteSpace: 'pre'}}>{(Illust.Illustration.description)}</div>
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
                        </div>
                    ))
                    }
            </div>

        )
    }
}
export default Competences
