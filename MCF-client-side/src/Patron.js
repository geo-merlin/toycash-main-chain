import React, { Component } from 'react';
import './App.css';

//パトロンによる出資先の登録処理を担うコンポーネント
export default class Patron extends Component {

    register(amount, token, screen_name, message){
        //サーバーにamountとscreen_nameを伝えるAPIを飛ばす処理
    }

    render() {
        return (
            <div>
                {/* パトロンが出資額と出資するトークンの種類、出資先、メッセージを入力するモーダル */}
            </div>
        );
    }
}
