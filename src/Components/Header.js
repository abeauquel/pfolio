import React, {Component} from 'react'
import {Navbar} from 'react-materialize'
import {Appearances} from "../Enumeration/Appearance";
import OldSchoolMenuLink from './OldSchoolMenuLink'


class Header extends Component{
    constructor(props){
        super(props);

        this.state={

        }
    }
    render(){
    return (

        <div>
            <Navbar brand={'pfolio'} left className={Appearances.backgroundColor} >
                <OldSchoolMenuLink to="/Home" label="Home" icon="home"/>
              <OldSchoolMenuLink to="/E4" label="Justification des activités"
                                 icon={"web"}/>
                <OldSchoolMenuLink to="/E6" label="E6" icon={"computer"}/>
                <OldSchoolMenuLink to="/Projets" label="Mes projets" icon={"book"}/>
              {/*
                <OldSchoolMenuLink to="/construction" label="Construction de ce PortFolio" icon={"build"}/>
*/}
              <OldSchoolMenuLink to="/veilletech" label="Veille technologique"
                                 icon={"lightbulb_outline"}/>
            </Navbar>

        </div>

    )
    }
}
export default Header;
