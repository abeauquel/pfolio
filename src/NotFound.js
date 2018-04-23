import React from 'react';
import {Container}from 'react-materialize'
import {Row, Col} from 'react-materialize';
import ToastNotifcation from "./Script/ToastNotifcation";



const NotFound = ({ location }) => (
    <Container>
      {location.pathname.includes("/img/") ? <p>Je devrais pas être ici</p>
          : null}

        <h3>404 Not Found</h3>
        <Row>

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