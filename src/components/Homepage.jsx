import Header from "./Header";
import PropTypes from "prop-types";
import React, { Component } from "react";
import TimelineContainer from "./TimelineContainer";
import { Row, Col } from 'react-bootstrap';
import './TimelineStyles.css'
import { FaRegImage, FaRegSmile, FaRegCommentDots, FaRegChartBar, FaEllipsisH, FaSnowman } from 'react-icons/fa'

export default class HomePage extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      profileImageUrl: PropTypes.string,
      twitterId: PropTypes.string,
      screenName: PropTypes.string,
      _id: PropTypes.string
    })
  };

  state = {
    user: {},
    error: null,
    authenticated: false
  };

  componentDidMount() {
    fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <Header
          authenticated={authenticated}
          handleNotAuthenticated={this._handleNotAuthenticated}
        />
        <div>
          {!authenticated ? (
            <div className="text-center">
              <h4 className="clr-b-1">WELCOME!</h4>
              <h1 className="clr-b-2">to Twitter App</h1>
              <div className="pt-4">
                <button onClick={this._handleSignInClick} className="btn-login">
                  <span className="btn-icon">
                    <img class="tweet-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg" />
                  </span>
                  <span className="btn-text">LOGIN WITH TWITTER</span>
                </button>
              </div>
            </div>
          ) : (
              <div className="container">
                <Row>
                  <Col className="text-center">       
                    <div><img className="width-20" src={this.state.user.profileImageUrl} /></div>           
                    <h3 className="mt-3 font-weight-bold">{this.state.user.name}</h3>
                    <div>
                      <Row className="tweet-post-area">
                        <Col md={2}>
                          <img className="border-r-50" src={this.state.user.profileImageUrl} />
                        </Col>
                        <Col>
                          <textarea placeholder="What's happening?"  className="w-100 post-box"></textarea>
                          <Row>
                            <Col>
                              <div className="d-flex upload-icons">
                                <div><a href="#" title=""><FaRegImage /></a></div>
                                <div><a href="#"><FaSnowman /></a></div>
                                <div><a href="#"><FaRegChartBar /></a></div>
                                <div><a href="#"><FaRegSmile /></a></div>
                                <div><a href="#"><FaEllipsisH /></a></div>
                              </div>
                            </Col>
                            <Col className="text-right ">
                              <div className="mt-3 d-inline-block">
                                <a href="#" className="btn-tweet">Tweet</a>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col className="bg-white">                
                    <p className="col-heading">Tweets            
                    <span> by  @{this.state.user.screenName}</span></p> 
                    <TimelineContainer screenName={this.state.user.screenName} userName={this.state.user.name} />
                  </Col>
                </Row>
              </div>
          )}
        </div>
      </div>
    );
  }

  _handleSignInClick = () => {
    window.open("http://localhost:4000/auth/twitter", "_self");
  };

  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };
}
