import React from 'react';
import ReactDOM from "react-dom";
import { Authenticator } from "@bitpod/platform-bar-shell-react";
import { getPlatformBarConfig } from '../config';

let PlatformBarConfig = getPlatformBarConfig();

PlatformBarConfig["on_auth_state_change"] = function (state) {
    console.log("state", state);
};

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        if (!window.React) {
            window.React = React;
            window.ReactDOM = ReactDOM;
        }
    }
    render() {
        return (
            <div className="Header">
                <div className="Header--title">
                    BlogsPod
                </div>
                <div className="Header--input">
                    <input placeholder="seach tags"/>
                </div>
                <ul>
                    <li>Read</li>
                    <li>Create</li>
                    <li>
                        <Authenticator initConfig={PlatformBarConfig} />
                    </li>
                </ul>
            </div>
        )
    }
}