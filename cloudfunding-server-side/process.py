def register_investment(amount, token, screen_name, message):
    #パトロンからの出資内容(出資額と出資するトークンの種類、出資先のツイッターアカウント)をサーバーに登録する処理を担う関数
    pass

def give_notice_tweet(amount, token, screen_name, message):
    #我々のアカウントから出資先に通知するためのツイートを作り出す関数
    pass

def handle_FMresponse(res):
    #FMから来た返答(半額、全額、見ないフリ)をサーバーに登録する処理を担う関数
    pass

def confirm_distribution(screen_name_list):
    #パトロンからの出資について配分が確定したらその通りに残高を操作しサーバーに記録する処理を担う関数
    pass

def make_tip_tweet(amount, token, screen_name, message):
    #我々のアカウントから出資先（達）にtipNEMなどでtipするためのツイートを作り出す関数
    pass

def main():
    """
    処理本体:
    (クライアントが登録情報をフォームに入力する)
    (そして登録情報通りに""我々の""アカウントにTipツイートをする。)
    1.サーバーは我々のアカウントにTipがあったことを察知してTipツイートから内容を読み取ってサーバーに登録する :register_investment
    2.我々のアカウントからツイッターで通知（リプライ）を出資先のツイッターアカウントに出す :give_notice_tweet
    (ツイッターで通知を受けたFMがクライアントサイドを使って返信(半額、全額、無視)をAPI形式で伝えてくる)
    3.返信に応じてパトロンからの出資を受け取る処理を行う :handle_FMresponse
        a.半額or見ないふりだった場合
            配分を確定させる :confirm_distribution
            パトロンに返す処理とFMにわたす処理（Tipツイート）を行う :make_tip_tweet
        b.全額だった場合
            ある一定の猶予期間を設ける
                x.猶予期間以内にFMからの配分先の登録があった場合
                    配分を確定させる :confirm_distribution
                    出資先達にわたす処理（Tipツイート）を行う :make_tip_tweet
                y.なかった場合
                    パトロンに返す処理とFMにわたす処理（Tipツイート）を行う :make_tip_tweet
    """
    pass


if __name__ == "__main__":
    main()
