import React, {Component} from 'react';
import {Timeline, Tweet} from 'react-twitter-widgets'
import {
  Container, Row, Col, Card, Collection, ProgressBar, Tabs, Tab
} from 'react-materialize'
import {
  Link,
} from 'react-router-dom';

let query = require('jquery');

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

    return (<Row style={{marginTop: 10, height: '56em'}}>
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
              <Tabs className='tab-demo z-depth-1'>
                <Tab title="TimeLine" active>
                  <div>
                    {this.state.selected ? null : <p>Sélectionnez un compte</p>}
                    <Timeline
                        dataSource={{
                          sourceType: 'profile',
                          screenName: this.state.selected
                              ? this.state.selected.id
                              : "react"
                        }}
                        options={{
                          username: this.state.selected ? this.state.selected.id
                              : "merde",
                          height: '800'
                        }}
                        onLoad={() => console.log('Timeline is loaded!')}
                    />
                  </div>
                </Tab>
                <Tab title="Tweets sauvegardés">
                  <div>
                    <Tweet
                        tweetId="955857875695529984"
                        options={{
                          username: this.state.selected ? this.state.selected.id
                              : "reactjs",
                          height: '1000',
                          width: '500'
                        }}>
                    </Tweet>
                  </div>
                </Tab>
                <Tab title="Test 3">
                  <div className={'green'}>
                    Test 3
                  </div>

                </Tab>
                <Tab title="Test 4">Test 4</Tab>
              </Tabs>

              {/*<ul id="tabs-swipe-demo" class="tabs col s12">
                <li class="tab col s3"><a class="active" href="#test-swipe-1">TimeLine</a></li>
                <li class="tab col s3"><a  href="#test-swipe-2">Tweets sauvegardés</a></li>
                <li class="tab col s3"><a href="#test-swipe-3">Test 3</a></li>
              </ul>

              <div id="test-swipe-1" class="col s12 " style={{height:'50em'}}>
                {this.state.selected ? null : <p>Sélectionnez un compte</p>}
                <Timeline
                    dataSource={{
                      sourceType: 'profile',
                      screenName: this.state.selected ? this.state.selected.id
                          : "react"
                    }}
                    options={{
                      username: this.state.selected ? this.state.selected.id
                          : "merde",
                      height: '800'
                    }}
                    onLoad={()=> console.log('Timeline is loaded!')}
                        />

              </div>

              <div id="test-swipe-2" class="col s12" style={{height:'30em'}}>

                <Tweet
                    tweetId="955857875695529984"
                    options={{
                      username: this.state.selected ? this.state.selected.id
                          : "reactjs",
                      height: '1000',
                      width:'500'
                    }}>
                </Tweet>

              </div>
              <div id="test-swipe-3" class="col s12 green" style={{height:'30em'}}>Test 3</div>*/}
            </Container>
          </Col>

        </Row>
    )
  }
}

export default Veille;