import React, { Component } from 'react';
import './App.css';

//パトロンによる出資先の登録処理を担うコンポーネント
export default class Patron extends Component {

    register(amount, screen_name){
        //サーバーにamountとscreen_nameを伝えるAPIを飛ばす処理
    }

    render() {
        return (
            <div>
                {/* パトロンが出資額と出資先を入力するモーダル */}
            </div>
        );
    }
}
