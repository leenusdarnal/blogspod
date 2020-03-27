import React from 'react';
import ReactDOM from "react-dom";
import { Authenticator } from "@bitpod/platform-bar-shell-react";
import { getPlatformBarConfig } from '../config';

let PlatformBarConfig = getPlatformBarConfig();

PlatformBarConfig["on_auth_state_change"] = function (state) {
    console.log("state", state);
};

export default class Main extends React.Component {
    state = {
        set:"Read"
    }
    handerNavButton = (x) => this.setState({set: x})
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
                        <div className="Header--nav__button__container">
                            <div className="Header--nav__button" onClick={()=>{this.handerNavButton("Create")}}>
                                <span>CREATE</span>
                            </div>
                        </div>
                        <div>
                            <Authenticator initConfig={PlatformBarConfig} />
                        </div>
                    </div>
                </div>
                <div className="Main--body">
                    {
                        this.state.set==="Read" && <p>this is the read tab</p>
                    }
                    {
                        this.state.set==="Create" && <p>this is the create tab</p>
                    }
                </div>
            </div>
        )
    }
}