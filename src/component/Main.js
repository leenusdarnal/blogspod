import React ,{Component}  from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Authenticator } from "@bitpod/platform-bar-shell-react";
import { getPlatformBarConfig } from '../config';

import ReadTab from './Read';
import CreateTab from './Create';

let PlatformBarConfig = getPlatformBarConfig();
PlatformBarConfig["on_auth_state_change"] = function (checkin) {
    console.log("state", checkin);
}

export default class Main extends Component {
    state = {
        set:"Read",
        logUserStatus: {guestUser:true},
        search : ""
    }
    componentWillMount(){
        setTimeout(()=>{
            this.setState({logUserStatus: [JSON.parse(localStorage[localStorage[window.$config.oauth.clientId+"lastactiveuserid"]])].map(e=>{
                return {
                    guestUser : e.guestUser,
                    userProfile : {
                        email:e.userProfile.email,
                        email_verified:e.userProfile.email_verified,
                        family_name:e.userProfile.family_name,
                        given_name:e.userProfile.givenName,
                        id:e.userProfile.id,
                        language:e.userProfile.language,
                        name:e.userProfile.name,
                        preferred_username:e.userProfile.preferred_username,
                        sub:e.userProfile.sub
                    }
                }
            })[0] });
        },2500);
    }
    handerNavButton = (x) => this.setState({set: x});
    constructor(props) {
        super(props);
        if (!window.React) {
            window.React = React;
            window.ReactDOM = ReactDOM;
        }
    }
    handletitlechange = (x) => {
        console.log(x);
        // this.state.title = x;
    }
    onEditorMounted =(x) =>{
        
    }
    render() {
        return (
            <Router>
                <div className="Header">
                    <div className="Header--title">
                        BlogsPod
                    </div>
                    <div className="Header--input">
                        <input placeholder = "search tags"  onKeyUp={(e) => {   return this.setState({search:e.target.value}) }   }/>
                    </div>
                    <div className="Header--nav">
                        <Link to="/read" style={{ textDecoration: 'none' }}>
                            <div className="Header--nav__button__container">
                                <div className="Header--nav__button" onClick={()=>{this.handerNavButton("Read")}}
                                >
                                    <span>READ</span>
                                </div>
                            </div>
                        </Link>
                        {
                            !this.state.logUserStatus.guestUser &&
                            <Link to='/create' style={{ textDecoration: 'none' }}>
                                <div className="Header--nav__button__container">
                                    <div className="Header--nav__button" onClick={()=>{this.handerNavButton("Create")}}>
                                        <span>CREATE</span>
                                    </div>
                                </div>
                            </Link>
                        }
                        <div>
                            <Authenticator initConfig={PlatformBarConfig} />
                        </div>
                    </div>
                </div>
                <div className="Main--body">
                    <Switch>
                        <Route path="/read" render={() => { return <ReadTab search={this.state.search}  /> } }/>
                        <Route path="/create" component={CreateTab} />
                    </Switch>
                    {/* save button  */}
                </div>
            </Router>
        )
    }
}