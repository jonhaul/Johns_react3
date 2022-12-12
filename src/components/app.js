import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationContainer from './navigation/navigation-Container';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-det";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./pages/portmanager";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

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
              <Route path="/blog"  
              render={props => ( 
                <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
                 />

              <Route 
              path="/b/:slug"  
              render={props => (
                <BlogDetail {... props} loggedInStatus={this.state.loggedInStatus} />
              )}
              />
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
