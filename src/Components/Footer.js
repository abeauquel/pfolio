import React, {Component} from 'react'
import {Footer} from 'react-materialize'
import {Appearances} from "../Enumeration/Appearance";

class Myfooter extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div>
            <Footer copyrights="© 2018 Beauquel Alexandre, All rights reserved " className={Appearances.backgroundColor}>
            </Footer>

            </div>

        )
    }
}
export default Myfooter;
