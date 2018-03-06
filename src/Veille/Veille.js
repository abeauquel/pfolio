import React, {Component} from 'react';
import {Timeline, Tweet} from 'react-twitter-widgets'
import {
  Container,
  Row,
  Col,
  Card,
  Collection,
  ProgressBar
} from 'react-materialize'
import {
  Link, Route,
} from 'react-router-dom';

class Veille extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comptes: [
        {
          id: 'reactjs',
          libelle: "React js"
        },
        {
          id: 'npmjs',
          libelle: 'Npm'
        },
        {
          id: 'getBootstrap',
          libelle: ' Boostrap '
        },
        {
          id: 'TwitterEng',
          libelle: 'Twitter Engineering'
        },
        {
          id: 'AirbnbEng',
          libelle: 'Airbnb Engineering'
        },
        {
          id: 'vuejs',
          libelle: 'Vue js'
        },

      ],
      selected: null,
    }

  }

  componentWillMount() {

  }

  render() {

    return (<Row>
          <Card className={'col s4'}>
            <h5>Comptes twitter suivies</h5>
            <hr/>

            {this.state.comptes.length ? null
                : <Col s={12}>
                  <ProgressBar/>
                  <small>Chargement des activités</small>
                </Col>
            }
            <Collection>

              {this.state.comptes.map((compte, index) => {

                return <Link key={compte.id} to={'#'}
                             className={'collection-item' + (this.state.selected
                             && this.state.selected.id === compte.id
                                 ? ' active' : '')}
                             onClick={() => this.setState(
                                 {selected: compte})}>{compte.libelle}</Link>

              })
              }


            </Collection>

          </Card>
          <Col s={8}>
            <Container>
              {this.state.selected ? null : <p>Sélectionnez un compte</p>}
              <Timeline
                  dataSource={{
                    sourceType: 'profile',
                    screenName: this.state.selected ? this.state.selected.id
                        : ""
                  }}
                  options={{
                    username: this.state.selected ? this.state.selected.id : "",
                    height: '800'
                  }}
                  onLoad={() => console.log('Timeline is loaded!')}
              />
            </Container>
          </Col>
        </Row>
    )
  }
}

export default Veille;