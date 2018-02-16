import React, {Component, ReactDOM} from 'react';

import { Collection, Pagination, Row, Col, Input, ProgressBar, Badge, CollectionItem} from 'react-materialize';
import {
    Route,
    Link
} from 'react-router-dom'
import Competences from './Competences';
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
            acquiseOnly:false,
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

    loadActivite(array_activites){
        let activites = array_activites;

        this.setState({
            activites:activites,
            nbPage: Math.round(activites.length / this.state.nbAct,+1)
        })
    }

    /* Est appelé lors d'un changement de valeur*/
    changeValue(attr, value){
        this.setState({
            [attr]:value
        })
    }

    searchBar(event){
        let compare=event.target.value.toLowerCase();
        let activites = lodash.filter( this.props._activites, (activite)=>{
            if(activite.code.toLowerCase().includes(compare)){
                return true;
            }
            return activite.libelle.toLowerCase().includes(compare)

        });

        this.setState({
            activites:activites,
            nbPage: Math.round(activites.length / this.state.nbAct,+1),
            page:1,
        })
    }

    checkAcquise(){
        this.setState({
            acquiseOnly:!this.state.acquiseOnly,
        })

    }
    render(){

        return(
            <Row>
                <nav style={{heighttop:'50px', marginBottom:10}}>
                    <div className={'nav-wrapper '+Appearances.backgroundColor}>
                        <form>
                            <div className="input-field">
                                <input ref="search" type="search" onChange={(e)=>this.searchBar(e)} required/>
                                <label className="label-icon" for="search"><i class="material-icons">search</i></label>
                            </div>
                        </form>
                    </div>
                </nav>

                <Row>
                    <Input name='group1' className={'red'} type='checkbox' label='Compétences acquises seulement' onChange={()=>this.checkAcquise()}/>
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
                        if(index>=(this.state.page*this.state.nbAct)-this.state.nbAct && index<(this.state.page*this.state.nbAct) && ((this.state.acquiseOnly && activite.nbCompetencesAcquises>0) || (!this.state.acquiseOnly))){
                           /* return (<Link key={activite.code}
                                         to={'/E4/Activites'}
                                         className={'collection-item' + (this.props.codeActivite ? (this.props.codeActivite === activite.code ? ' active':'') : '')}
                                         onClick={()=>this.props.changeValue('codeActivite',activite.code)}>
                                <b>{activite.code}</b>{activite.libelle}
                                    {activite.nbCompetencesAcquises >0 ? <Badge className={'new'}>{activite.nbCompetencesAcquises} comp</Badge>:''}
                            </Link>)
*/

                            return (<CollectionItem href={'#'}
                                                   active={this.props.codeActivite ? (this.props.codeActivite === activite.code ? true: false) :false}
                                                    onClick={()=>this.props.changeValue('codeActivite',activite.code)}>
                                <b>{activite.code}</b>{activite.libelle}
                                 <Badge className={'red white-text'}>{activite.nbCompetencesAcquises} comp</Badge>
                            </CollectionItem>)

                        }return <div></div>

                    })
                    }



                </Collection>



            </Row>


        )}
}
export default Activites;