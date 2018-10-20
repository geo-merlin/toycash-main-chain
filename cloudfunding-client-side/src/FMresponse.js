import React, { Component } from 'react';

//FMからのレスポンスを受け取ってAPIを出してサーバーに伝えるコンポーネント
export default class FMResponse extends Component {

    takeHalf() {
        //半額受け取ることをAPIでサーバーに伝える処理
        console.log("半額受け取ることをAPIでサーバーに伝える処理");
    }

    takeAll() {
        //全額受け取ることをAPIでサーバーに伝える処理
        console.log("全額受け取ることをAPIでサーバーに伝える処理");
    }

    takeNothing() {
        //受け取らないことをAPIでサーバーに伝える処理
        console.log("受け取らないことをAPIでサーバーに伝える処理");
    }

    sendDistribution(distribution) {
        //配分先をAPIでサーバーに伝える処理
        console.log("受け取らないことをAPIでサーバーに伝える処理");
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary m-2" onClick={this.takeHalf}>半額受け取る</button>
                <button type="button" className="btn btn-danger m-2" onClick={this.takeAll}>全額受け取る</button>
                <button type="button" className="btn btn-dark m-2" onClick={this.takeNothing}>何も見なかった</button>

                <form>
                    {/* 全額を選んだとき、FMが配分先を登録するためのフォーム */}
                </form>
            </React.Fragment>
        );
    }
}