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
            selected:null,


            /* Pagination */
            page: 1,
            nbAct: 10,
            nbPage: 5,

            /* Trie*/
            acquiseOnly:false,
            IDprojetSelected:-1,
            wordSearchBar:"",
        }
    }
    componentWillMount(){
        this.loadActivite(this.props._activites);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.state.page) {
            this.setState({activePage: nextProps.activePage})
        }
        if(nextProps._activites !== this.props._activites){
            this.loadActivite(nextProps._activites);
        }
    }

    /***
     * Trie sur ma liste d'activités
     * @param array_activites
     */
    loadActivite(array_activites){
        let activites = lodash.filter(array_activites, (activite, index)=>{
            let projetFound=true;

            if(this.state.acquiseOnly && activite.nbCompetencesAcquises < 1) {
                return false;
            }

            if(this.state.wordSearchBar !== "" && !(activite.code.toLowerCase().includes(this.state.wordSearchBar) || activite.libelle.toLowerCase().includes(this.state.wordSearchBar))){
                return false;
            }

            if(this.state.IDprojetSelected >0){
                projetFound=false;
                activite.competences.map((competence)=>{
                    return competence.Illustrer.map((illustrer)=>{
                        if(illustrer.Illustration.Projet.id === this.state.IDprojetSelected){
                            projetFound=true;
                            return true;
                        }
                    })
                })
            }

            return projetFound
        });

        this.setState({
            activites:activites,
            nbPage: Math.round(activites.length / this.state.nbAct,+1),
            page:1,
        })
    }

    /* Est appelé lors d'un changement de valeur*/
    changeValue(attr, value){
        this.setState({
            [attr]:value
        })
    }

    handleSearchBar(event){

        this.setState({
            wordSearchBar:event.target.value.toLowerCase(),
        },()=>{
            this.loadActivite(this.props._activites);
        })
    }

    handleCheckAcquises(){
        this.setState({
            acquiseOnly:!this.state.acquiseOnly,
        },()=>{
            this.loadActivite(this.props._activites);
        })

    }

    handleSelectProjet(event){
        this.setState({
            IDprojetSelected:event.target.value,
        },()=>{
            this.loadActivite(this.props._activites);
        })

    }

    render(){
        //TODO gérer les activités obligatoires
        return(
            <Row>
                <nav style={{heighttop:'50px', marginBottom:10}}>
                    <div className={'nav-wrapper '+Appearances.backgroundColor}>
                        <form>
                            <div className="input-field">
                                <input ref="search" type="search" onChange={(e)=>this.handleSearchBar(e)} required/>
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            </div>
                        </form>
                    </div>
                </nav>

                <Row>

                    <Input s={5} name='group1' className={'red'} type='checkbox' label='Compétences avec preuve seulement' onChange={()=>this.handleCheckAcquises()}/>


                    <Input s={7} type='select' label='Par projet' icon='computer'  onChange={(e)=>this.handleSelectProjet(e)}>
                        <option > </option>
                        {this.props.projets.map((projet)=>{
                            return (
                                <option key={projet.id} value={projet.id}>{projet.nom}</option>
                            )
                        })}
                    </Input>
                </Row>
                {this.state.activites.length ?

                    <div className={'center-align '}>
                        <Pagination classname={'.pagination .li '+Appearances.backgroundColor} items={this.state.nbPage} activePage={this.state.page} maxButtons={this.state.nbPage} onSelect={(e)=>this.changeValue('page',e)}>

                        </Pagination>
                    </div>


                    : <Col s={12}>
                        <ProgressBar />
                        <small>Aucune activite</small>
                    </Col>
                }

                <Collection ref={this.state.activites.length}>

                    {this.state.activites.map((activite,index)=>{
                        if(index>=(this.state.page*this.state.nbAct)-this.state.nbAct && index<(this.state.page*this.state.nbAct) ){

                            return (<Link
                                className={'collection-item ' + (this.props.codeActivite && this.props.codeActivite === activite.code ? 'active' : '')}
                                key={activite.code} to={'/E4/Activites/'+activite.code}
                                onClick={()=>this.props.changeValue('codeActivite',activite.code)}
                            >   <Row>
                                <Col s={9}><b>{activite.code}</b>{activite.libelle}</Col>
                                <Col s={3}>
                                    {activite.nbCompetencesAcquises > 0 ?
                                        <Badge className={'red white-text'}>{activite.nbCompetencesAcquises} preuve{activite.nbCompetencesAcquises >1 ? "s":null}</Badge>
                                        :null}
                                </Col>
                            </Row>
                            </Link>)

                        }return <div key={activite.code}> {" "}</div>

                    })
                    }



                </Collection>



            </Row>


        )}
}
export default Activites;