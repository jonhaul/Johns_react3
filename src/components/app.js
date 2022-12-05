import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from './navigation/navigation-Container';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import PortfolioManager from "./pages/portmanager";

library.add(faTrash, faSignOutAlt, faEdit);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }
    
    this.handleSucessfulLogin = this.handleSucessfulLogin.bind(this);
    this.handleUnSucessfulLogin = this.handleUnSucessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSucessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnSucessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    return axios.get("https://api.devcamp.space/logged_in", { 
      withCredentials: true 
    })
    .then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
       this.setState({
         loggedInStatus: "NOT_LOGGED_IN"
       });
     }
    })
    .catch(error => {
      console.log("Error", error)
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return  [<Route key="port-man" path="/portmanager" component={PortfolioManager} />];
  }

  render() {
    return (
      <div className='container'>

        <Router>
          <div>
          
            <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route 
              path="/auth" 
              render={props => (
                <Auth
                  {...props}
                  handleSucessfulLogin={this.handleSucessfulLogin}
                  handleUnSucessfulLogin={this.handleUnSucessfulLogin}
                />  
              )

              } 
              />

              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              {this.state.loggedInStatus === "LOGGED_IN" ? (
                this.authorizedPages()
              ) : null}
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>

        
      </div>
    );
  }
}
