import React  from 'react';
import {Icon} from 'react-materialize'
import {
    Link, Route,
} from 'react-router-dom';

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact, icon }) => (

    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <li className={match ? 'active' : ''}><Link to={to}><Icon left>{icon}</Icon> {label}</Link></li>
    )}/>

)
export default OldSchoolMenuLink