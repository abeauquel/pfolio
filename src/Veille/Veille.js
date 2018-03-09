import React, {Component} from 'react';
import {Timeline, Tweet} from 'react-twitter-widgets'
import {
  Container,
  Row,
  Col,
  Card,
  Collection,
  ProgressBar,
  Tabs,
  Tab,
  Badge,
  Input,
  Preloader,
  Pagination
} from 'react-materialize'
import {
  Link,
} from 'react-router-dom';
import Appearances from "../Enumeration/Appearance";

let lodash = require('lodash');

class Veille extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _comptes: [],
      comptes: [],
      selected: null,
      selectedTab: 0,

      /** Trie des comptes*/
      wordSearchBar: "",
      ComptesWithTweetOnly: false,
      themes: [],
      selectedIdTheme: -1,
      selectedTweetPagination: 1,
      isChargedTimeline: false,
    }

  }

  componentWillMount() {
    this.fetchComptes();
  }

  /***
   * Chargement des comptes
   */
  fetchComptes() {
    fetch(process.env.REACT_APP_API_HOST + "comptes", {
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'APIKey': '12345',
      },
    })
    .then((response) => {
      if (!response.ok) {
        this.setState({
          errorMessage: response.statusText,
        });
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      console.log(json);
      let themes = [];
      json.map((compte) => {
        themes.push(compte.theme);

      });
      let themes2 = lodash.uniqBy(themes, (theme) => {
        return (theme.id);
      });

      this.setState({
        _comptes: json,
        themes: themes2,

      }, () => {
        this.loadComptes();
      })

    })
    .catch((error) => {
      console.log(error)
    });
  }

  /***
   * Trie sur les comptes
   * */
  loadComptes() {
    console.log(this.state.themes);
    let comptes = lodash.filter(this.state._comptes, (compte, index) => {
      let result = true;

      /** Si aucun trie*/
      if (this.state.selectedIdTheme < 1 && !this.state.ComptesWithTweetOnly) {
        return true;
      }
      /** Trie sur les thèmes */
      if (this.state.selectedIdTheme > 0 && result && compte.theme.id
          !== this.state.selectedIdTheme) {
        result = false;

      }

      /** Trie sur les comptes avec tweet only*/
      if (this.state.ComptesWithTweetOnly && result && compte.tweets.length
          < 1) {
        result = false;
      }

      return result;
    });
    this.setState({
      comptes: comptes,
    })
  }

  /***
   * Evenement sur le changement de Tab
   * @param e
   */
  handleTabChange(e) {
    let num = e.slice(-1);
    num = parseInt(num, 10);
    console.log(num);
    this.setState({
      selectedTab: num,
    })
  }

  /***
   * Evenement sur la barre de recherche
   * @param event
   */
  handleSearchBar(event) {

    this.setState({
      wordSearchBar: event.target.value.toLowerCase(),
    }, () => {
      this.loadComptes();
    })
  }

  /***
   *Evenement sur le check de Comptes avec tweet seulement
   **/
  handleCheckComptesWithTweetOnly() {
    this.setState({
      ComptesWithTweetOnly: !this.state.ComptesWithTweetOnly,
    }, () => {
      this.loadComptes();
    })
  }

  /***
   * Evenement sur la selection d'un theme
   * @param e
   */
  handleSelectTheme(e) {
    this.setState({
      selectedIdTheme: e.target.value,
    }, () => {
      this.loadComptes();
    })
  }
  render() {

    return (<Row style={{marginTop: 10, height: '56em'}}>
          <Card className={'col s4'}>
            <h5>Comptes twitter suivies</h5>
            <hr/>

            {this.state.comptes.length ? null
                : <Col s={12}>
                  <ProgressBar/>
                  <small>Chargement des comptes</small>
                </Col>
            }
            {/*Trie sur les comptes*/}
            <nav style={{heighttop: '50px', marginBottom: 10}}>
              <div className={'nav-wrapper ' + Appearances.backgroundColor}>
                <form>
                  <div className="input-field">
                    <input ref="search" type="search"
                           onChange={(e) => this.handleSearchBar(e)} required/>
                    <label className="label-icon" htmlFor="search"><i
                        className="material-icons">search</i></label>
                  </div>
                </form>
              </div>
            </nav>
            <Row>
              <Input m={7} s={12} type='select' label='Par theme' icon='filter'
                     onChange={(e) => this.handleSelectTheme(e)}>
                <option key={-1} value={-1}></option>
                {this.state.themes.map((theme) => {
                  return (
                      <option key={theme.id}
                              value={theme.id}>{theme.libelle}</option>
                  )
                })}
              </Input>
              <Input m={5} s={12} name='group1' key={2} className={'red'}
                     type='checkbox'
                     label='Comptes avec tweet seulement'
                     checked={this.state.ComptesWithTweetOnly}
                     onChange={() => this.handleCheckComptesWithTweetOnly()}/>
            </Row>

            {/*Affichage des comptes*/}
            <Collection>

              {this.state.comptes.map((compte, index) => {

                return <Link key={compte.idTwitter} to={'#'}
                             className={'collection-item' + (this.state.selected
                             && this.state.selected.idTwitter
                             === compte.idTwitter
                                 ? ' active' : '')}
                             onClick={() => this.setState(
                                 {
                                   selected: compte,
                                   selectedTweetPagination: 1,
                                   isChargedTimeline: false,
                                 })}>{compte.nomCompte}
                  {compte.tweets.length > 0 ? <Badge
                          className={'red white-text'}>{compte.tweets.length} tweet{compte.tweets.length
                      > 1 ? "s" : null}</Badge>
                      : null}
                </Link>

              })
              }


            </Collection>

          </Card>

          {/*Affichage par rapport à un compte*/}
          <Col s={8}>
            <Tabs className='tab-demo z-depth-1'
                  onChange={(e) => this.handleTabChange(e)}>

              {/*Tab pour le Time Line*/}
              <Tab key={1} title="TimeLine"
                   active={this.state.selectedTab === 0}>
                <div key={'tabDiv' + 1}>
                  {this.state.selected ? null

                      : <p>Sélectionnez un compte</p>}

                  {this.state.selected && !this.state.isChargedTimeline ?
                      <Col s={12} style={{marginTop: '10%', marginLeft: '40%'}}>
                        <Preloader size='big'/>
                      </Col>
                      : null}
                  <div className={this.state.isChargedTimeline ? '' : 'hide'}>
                    <Timeline
                        key={'timeline'}
                        ref={'timeline'}
                        dataSource={{
                          sourceType: 'profile',
                          screenName: this.state.selected
                              ? this.state.selected.idTwitter
                              : "react"
                        }}
                        options={{
                          username: this.state.selected
                              ? this.state.selected.idTwitter
                              : "merde",
                          height: '800'
                        }}
                        onLoad={() => {
                          console.log('Timeline is loaded!');
                          if (!this.state.isChargedTimeline) {
                            this.setState({
                              isChargedTimeline: true,
                            })
                          }
                        }}
                    />
                  </div>
                </div>
              </Tab>

              {/*Tab pour les Tweets sauvegardés*/}
              <Tab key={2} title="Tweets sauvegardés"
                   active={this.state.selectedTab === 1}>
                <div key={'tabDiv' + 2}>
                  {!this.state.selected ? <p>Sélectionnez un compte</p>
                      : (this.state.selected.tweets.length < 1 ?
                              <p>Aucun tweets</p>
                              : this.state.selected.tweets.map(
                                  (tweetObj, indexTweet) => {
                                    if (this.state.selectedTweetPagination
                                        === (indexTweet + 1)) {
                                      return (
                                          <Row key={tweetObj.id}>
                                            <Col s={6} m={6}>
                                              <Tweet
                                                  tweetId={tweetObj.id}
                                                  options={{
                                                    username: this.state.selected
                                                        ? this.state.selected.idTwitter
                                                        : "reactjs",
                                                    height: '1000',
                                                    width: '500'
                                                  }}>
                                              </Tweet>
                                            </Col>
                                            <Col s={6} m={6}>
                                              <Pagination
                                                  items={this.state.selected.tweets.length}
                                                  activePage={this.state.selectedTweetPagination}
                                                  maxButtons={8}
                                                  onSelect={(e) => this.setState(
                                                      {selectedTweetPagination: e})}
                                              />

                                              <hr style={{color: Appearances.gris}}/>
                                              <p><b>Description</b></p>
                                              <p>{tweetObj.libelle}</p>

                                              <hr style={{color: Appearances.gris}}/>
                                              <p><b>Avis</b></p>
                                              <p>{tweetObj.avis}</p>

                                            </Col>
                                          </Row>)
                                    }
                                    else {
                                      console.log("index : " + indexTweet);
                                      console.log("selected : "
                                          + this.state.selectedTweetPagination);
                                      console.log("affiche pas");
                                    }
                                  })
                      )
                  }
                </div>
              </Tab>

              {/*Tab pour la description du compte*/}
              <Tab key={3} title="Description du compte"
                   active={this.state.selectedTab === 2}>
                <div key={'tabDiv' + 3}>

                  {!this.state.selected ? <p>Sélectionnez un compte</p> :
                      <div className={'row'}>
                        <hr style={{color: Appearances.gris}}/>
                        <p><b>Description du compte:</b></p>
                        <p>{this.state.selected.description
                            ? this.state.selected.description
                            : 'non définie'}</p>

                        <hr style={{color: Appearances.gris}}/>
                        <p><b>Theme principal auquel le compte est lié:</b></p>
                        <p>{this.state.selected.theme.libelle}</p>
                        <p>{this.state.selected.theme.description}</p>

                      </div>
                  }
                </div>

              </Tab>

            </Tabs>

          </Col>

        </Row>
    )
  }
}

export default Veille;