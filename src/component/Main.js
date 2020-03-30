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
        checkin: false
    }
    componentDidMount(){
        setTimeout(()=>{
            const t = JSON.parse(localStorage[localStorage[window.$config.oauth.clientId+"lastactiveuserid"]]).guestUser;
            this.setState({checkin: t});
        },500);
    }
    updatechecking = (checkin) => this.setState({checkin});
    handerNavButton = (x) => this.setState({set: x});
    constructor(props) {
        super(props);
        if (!window.React) {
            window.React = React;
            window.ReactDOM = ReactDOM;
        }
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
                            !this.state.checkin &&
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
                        this.state.set==="Read" && <ReadTab />
                    }
                    {
                        this.state.set==="Create" && <CreateTab />
                    }
                </div>
            </div>
        )
    }
}