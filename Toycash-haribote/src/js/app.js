App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        //やることなし
        return App.initWeb3();
    },

    //Web3をセットするためのメソッド
    initWeb3: function () {
        if (typeof web3 !== "undefined") {
            App.web3Provider = web3.currentProvider;
        } else {
            //web3が定義されていないならganacheをセットする
            App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
        }
        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    //コントラクトに関する情報をweb3が取得できるようにするためのメソッド
    initContract: function () {
        $.getJSON("ToyCash.json", function (data) {
            //コントラクトデータを取得してセットする
            let ToyCashArtifact = data;
            App.contracts.ToyCash = TruffleContract(ToyCashArtifact);

            //プロバイダとコントラクトをつなげる
            App.contracts.ToyCash.setProvider(App.web3Provider);
            return console.log("success");
        });
        return App.bindEvents();
    },

    //バインドするイベント
    bindEvents: function () {
        //ボタンクリック時の処理を定義
        $("#getBalance").click(function () {
            let token_address = $("#TokenAddress").val();
            App.getBalance(token_address);
        });

        $("#judge").click(function () {
            let tweet_id = $("#Judge_TweetID").val();
            let user_address = $("#Judge_UserAddress").val();
            let amount = $("#Judge_amount").val();
            let token_address = $("#Judge_TokenAddress").val();
            let judge_address = $("#JudgeAddress").val();
            let message_hash = $("#MessageHash").val();
            let judge_sig = $("#JudgeSig").val();
            App.judge(tweet_id, user_address, amount, token_address, judge_address, message_hash, judge_sig);
        });

        $("#encode").click(function () {
            let tweet_id = $("#TweetID").val();
            let user_address = $("#UserAddress").val();
            let amount = $("#amount").val();
            let token_address = $("#TokenAddress").val();
            App.encode(tweet_id, user_address, amount, token_address);
        });
    },

    //残高取得ボタンが押されたときの処理
    getBalance: function(token_address) {
        event.preventDefault();
        let ToyCashInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            let account = accounts[0];

            App.contracts.ToyCash.deployed().then(function (instance) {
                ToyCashInstance = instance;
                console.log(ToyCashInstance);
                //getTokenBalanceメソッドを実行するトランザクションの送信
                return ToyCashInstance.getTokenBalance(token_address, {
                    from: account
                }).call();
            }).then(function (result) {
                //成功ならUIを変える
                console.log("Success!!!");
                $("#balance").text(token_address + " : " + result);
            }).catch(function (err) {
                //失敗ならエラーを吐く
                $("#balance").text("残高取得失敗です。");
                console.log(err.message);
            });
        });
    },

    //審査ボタンが押されたときの処理
    judge: function (tweet_id, user_address, amount, token_address, judge_address, message_hash, judge_sig) {
        event.preventDefault();
        let ToyCashInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            let account = accounts[0];

            App.contracts.ToyCash.deployed().then(function (instance) {
                ToyCashInstance = instance;

                //getTokenBalanceメソッドを実行するトランザクションの送信
                return ToyCashInstance.sendReward(tweet_id, user_address, amount, token_address, judge_address, message_hash, judge_sig, {
                    from: account
                });
            }).then(function (result) {
                //成功ならUIを変える
                console.log("Success!!!");
                $("#judgement").text("報酬遷移成功です。");
            }).catch(function (err) {
                //失敗ならエラーを吐く
                console.log(err.message);
                $("#judgement").text("報酬遷移失敗です。");
            });
        });
    },

    //エンコードボタンが押されたときの処理
    encode: function (tweet_id, user_address, amount, token_address){
        event.preventDefault();
        let ToyCashInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            let account = accounts[0];

            App.contracts.ToyCash.deployed().then(function (instance) {
                ToyCashInstance = instance;

                //getTokenBalanceメソッドを実行するトランザクションの送信
                return ToyCashInstance.packTweetObject(tweet_id, user_address, amount, token_address, {
                    from: account
                });
            }).then(function (result) {
                //成功ならUIを変える
                console.log("Success!!!");
                $("#encodeTweet").text("エンコード成功です。");
            }).catch(function (err) {
                //失敗ならエラーを吐く
                console.log(err.message);
                $("#encodeTweet").text("エンコード失敗です。");
            });
        });
    }

};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
