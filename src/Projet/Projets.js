import React, {Component} from 'react';
import { Row, Card, Col, ProgressBar, Collection}from 'react-materialize'
import {Link} from 'react-router-dom'
import Appearances from "../Enumeration/Appearance";


class Projets extends Component{
    constructor(props){
        super(props);

        this.state={
            _projets:[],
            projets:[],
            selected:null,

        }
    }
    componentWillMount(){
        this.fetchProjet();
    }

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


    render(){

        return(
            <Row>

                <Card  className={'col s4'} >
                    <h3>Mes projets</h3>
                    <hr/>

                    {this.state.projets.length ? null
                        : <Col s={12}>
                            <ProgressBar />
                            <small>Chargement des projets</small>
                        </Col>
                    }
                    <Collection>

                        {this.state.projets.map((projet,index)=>{

                                return <Link key={projet.id} to={'/Projets/'+projet.id} className={'collection-item' + (this.state.selected && this.state.selected.id === projet.id ? ' active' : '')} onClick={()=>this.setState({selected:projet})}>{projet.nom}</Link>


                            })
                        }



                    </Collection>

                </Card>
                <Col s={8}>
                    {this.state.selected ?
                        <Card className={Appearances.backgroundColor} textClassName={Appearances.TxtColor+'-text'} >
                            <h3>{this.state.selected.nom}</h3>
                            <h6><b>Contexte : </b></h6>
                            <p>{this.state.selected.contexte}</p>
                            <hr/>
                            <h6><b>Description : </b></h6>
                            <p style={{whiteSpace: 'pre'}}>{this.state.selected.description}</p>
                        </Card>
                    :<p>Sélectionnez un projet</p>}
                </Col>


            </Row>
        )
    }
}
export default Projets;

