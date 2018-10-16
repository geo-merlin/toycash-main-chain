import React, { Component } from "react";
import Balance from "./Balance";
import RegisterTag from "./RegisterTag";
import Judge from "./Judge";
import PackTweet from "./PackTweet";

export default class App extends Component {
  
    render() {
      return (
        <React.Fragment>
            <div className="row">
                <div>
                    <h1 className="text-center">ToyCash Demo</h1>
                    <hr/>
                    <br/>
                </div>
            </div>

            <RegisterTag />

            <hr />

            <div className="row" id="balance">
                <Balance />
            </div>

            <hr />

            <div className="row" id="send-reward">
                <Judge />
            </div>

            <hr />

            <div className="row" id="pack-tweet">
                <PackTweet />
            </div>
        </React.Fragment>
      )
    }
  }