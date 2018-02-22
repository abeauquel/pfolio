import React  from 'react';
import {Icon} from 'react-materialize'
import {
    Link, Route,
} from 'react-router-dom';

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact, icon }) => (
    <div>
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <li className={match ? 'active' : ''}><Link to={to}><Icon left>{icon}</Icon> {label}</Link></li>
    )}/>
    </div>
)
export default OldSchoolMenuLink