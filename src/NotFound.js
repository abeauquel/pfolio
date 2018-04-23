import React from 'react';
import {Container}from 'react-materialize'
import {Row, Col} from 'react-materialize';
import ToastNotifcation from "./Script/ToastNotifcation";
import DownloadLink from "react-download-link";


const NotFound = ({ location }) => (
    <Container>


        <h3>404 Not Found</h3>
      <Row style={{marginBottom: '50%'}}>

            <ToastNotifcation
                message={"Erreur page "+location.pathname+" introuvable"}
            />

            <Col s={3}> </Col>
            <Col s={5}>
                <p>Le lien vers <b><code>{location.pathname}</code></b> n'a pas été trouvé.
                    Peut être qu'il n'existe pas</p>
            </Col>


      </Row>


    </Container>
);
export default NotFound;