import React from 'react';
import ReactDOM from "react-dom";
import { Authenticator } from "@bitpod/platform-bar-shell-react";
import { getPlatformBarConfig } from '../config';

import ReadTab from './Read';
import CreateTab from './Create';

let PlatformBarConfig = getPlatformBarConfig();
PlatformBarConfig["on_auth_state_change"] = function (checkin) {
    console.log("state", checkin);
}

export default class Main extends React.Component {
    state = {
        set:"Read",
        logUserStatus: {guestUser:true}
    }
    componentDidMount(){
        setTimeout(()=>{
            // const t = JSON.parse(localStorage[localStorage[window.$config.oauth.clientId+"lastactiveuserid"]]).guestUser;
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
        },1000);
    }
    handerNavButton = (x) => this.setState({set: x});
    constructor(props) {
        super(props);
        if (!window.React) {
            window.React = React;
            window.ReactDOM = ReactDOM;
        }
        setTimeout(console.log("wait time out"),3000);
    }
    render() {
        return (
            <div>
                <div className="Header">
                    <div className="Header--title">
                        BlogsPod
                    </div>
                    <div className="Header--input">
                        <input placeholder="seach tags"/>
                    </div>
                    <div className="Header--nav">
                        <div className="Header--nav__button__container">
                            <div className="Header--nav__button" onClick={()=>{this.handerNavButton("Read")}}
                            >
                                <span>READ</span>
                            </div>
                        </div>
                        {
                            !this.state.logUserStatus.guestUser &&
                            <div className="Header--nav__button__container">
                                <div className="Header--nav__button" onClick={()=>{this.handerNavButton("Create")}}>
                                    <span>CREATE</span>
                                </div>
                            </div>
                        }
                        <div>
                            <Authenticator initConfig={PlatformBarConfig} />
                        </div>
                    </div>
                </div>
                <div className="Main--body">
                    {
                        this.state.set==="Read" && <ReadTab userData={this.state.logUserStatus.userProfile}/>
                    }
                    {
                        this.state.set==="Create" && <CreateTab />
                    }
                </div>
            </div>
        )
    }
}