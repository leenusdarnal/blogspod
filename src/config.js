import keys from "lodash/keys";

if (window.location.hostname === "localhost") {
    window["$config"] = {
        oauth: {
            flow: "token",
            loginUrl: "https://login.bitpod.io/auth/connect/authorize",
            logoutUrl: "https://login.bitpod.io/auth/connect/endsession",
            tokenUrl: "https://login.bitpod.io/auth/connect/token",
            userInfoUrl: "https://login.bitpod.io/auth/connect/userinfo",
            clientId: "hnpwpvEdHY0rWAmmxQtU0GftaXe0g4qsZ6QiKrEmV4w=",
            clientSecret: "wHldkTtmE/bmJI4XcSpizYK88veVMjl2SosD4E1y8H8=",
            logoutRedirectUrl: window.location.origin.toString() + "/",
            loginRedirectUrl: window.location.origin.toString() + "/"
        },
        ps: {
            serviceUrl: "https://devps.bitpod.io"
        },
        backend: {
            unquieName: "azureporpoise"
        }
    }
}

let codeFlowMappings = {
        oauth: {
            flow: ["flowType"],
            loginUrl: ["codeFlowEndPoint", "authenticateURL"],
            logoutUrl: ["codeFlowEndPoint", "logoutURL"],
            userInfoUrl: ["authorizationuserInfoUrl"],
            refreshTokenUrl: ["codeFlowEndPoint", "refreshTokenURL"],
            userProfileSiteUrl: ["userProfileSiteUrl"],
            clientId: ["client_id"],
            renewalWindow: ['renewalWindow'],
            providers: ["codeFlowEndPoint", "providers"]
        },
        ps: {
            serviceUrl: ["serviceApiUrl"]
        },
        backend: {
            unquieName: ["unquieName"]
        }
    },
    tokenFlowMappings = {
        oauth: {
            flow: ["flowType"],
            loginUrl: ["authorizationUrl"],
            logoutUrl: ["authorizationlogoutUrl"],
            tokenUrl: ["authorizationToken"],
            userInfoUrl: ["authorizationuserInfoUrl"],
            clientId: ["client_id"],
            clientSecret: ["client_secret"],
            scope: ["scope"],
            logoutRedirectUrl: ["logout_redirect_url"],
            loginRedirectUrl: ["login_redirect_url"]
        },
        ps: {
            serviceUrl: ["serviceApiUrl"]
        },
        backend: {
            unquieName: ["unquieName"]
        }
    };

const setConfig = function (windowConfig, config, type) {
    const mapping = windowConfig.oauth.flow === "token" ? tokenFlowMappings : codeFlowMappings;
    keys(windowConfig[type]).forEach(k => {
        let v = windowConfig[type][k];
        config[mapping[type][k]] = v;
    });
};
const getPlatformConfig = function (windowConfig) {
    let config = {};
    ["oauth", "ps", "backend"].forEach(type => setConfig(windowConfig, config, type));
    return config;
};

const getConfigFromWindow = function (config) {
    if (window && window.$config && window.$config.oauth && window.$config.ps) {
        return Object.assign(config, getPlatformConfig(window.$config));
    }
    return {};
};


export const getPlatformBarConfig = function () {
    let version = window.location.hostname === "localhost" ? "1.0.1" : "2.0.2";
    let PlatformBarConfig = getConfigFromWindow({});
    PlatformBarConfig["version"] = version;
    PlatformBarConfig["stateVariable"] = "state";
    PlatformBarConfig["serializeExtra"] = function () {
        return window.location.search || "";
    }
    PlatformBarConfig["deserializeExtra"] = function (state) {
    
    }
    return PlatformBarConfig;
};