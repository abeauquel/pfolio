import React, {Component} from 'react';
import { Collapsible, CollapsibleItem, Row, Col, Card, MediaBox, ProgressBar} from 'react-materialize';
import Appearances from "../Enumeration/Appearance";
let lodash = require('lodash');

/***
 * Récupérer l'index du server actuel
 * @param lien
 * @returns {string}
 */
const location =(lien)=>{
    let loc=window.location.toString();
    let serv="";
    let http = new XMLHttpRequest();
   /* if(loc.includes("http://localhost:3000")){
        console.log("http://localhost:3000"+lien);
        serv="http://localhost:3000";
        let http = new XMLHttpRequest();

        http.open('HEAD', serv+lien, false);
        http.send();

        return http.status !== 404;

    }*/

    for  (let i = 0; i < loc.length; i++) {
        if(i>9 && loc[i]===! "/" ){
            serv+=loc[i];
        }else {


            http.open('HEAD', serv+lien, false);
            http.send();
            return http.status !== 404;
        }
    }

    http.open('HEAD', serv+lien, false);
    http.send();

    return http.status !== 404;
}
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
            })
            .catch((error) => {
                console.log(error)
            });
    }

    loadCompetences(codeActivite){
        let competences =lodash.filter(this.state._competences,(comp)=> {
            return comp.activite === codeActivite
        });

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
            <Card key={this.props.codeAct} >

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
                            <h5><b>{comp.code}</b>{comp.libelle}</h5> <br/>

                            {comp.Illustrer.length <1 ?
                                <div><br/><small>Compétence non acquise</small></div>
                            :
                            comp.Illustrer.map((Illust, indexIllustrer)=>(
                                <div key={comp.code+ " "+ Illust.ordreAppartition}>
                                    <br/>
                                <p>{Illust.description}</p>
                                    <Collapsible accordion >
                                        <CollapsibleItem header={"En lien avec : "+Illust.Illustration.titre} >
                                            <div style={{whiteSpace: 'pre'}}>{(Illust.Illustration.description)}</div>
                                            {location("/img/illustration/illustration"+Illust.Illustration.id+".png") ?
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
                        </div>
                    ))
                    }
            </Card>

        )
    }
}
export default Competences
