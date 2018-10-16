import React, { Component } from 'react'
import Contract from './contract'

export default class PackTweet extends Component {
    constructor(props){
        super(props);

        this.contract = new Contract();

        //initial state
        this.state = {
        tweet_id: "",
        user_id: "",
        reward: "",
        token_address: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.packTheTweet = this.packTheTweet.bind(this);
    }

    //this function will be executed when the component is renderd
    async componentWillMount() {
        await this.contract.loadContract()
    }

    handleChange(e){
        switch(e.target.name){
            case "tweet-id":
                this.setState({
                    tweet_id: e.target.value
                })
                break;
            case "user-id":
                this.setState({
                    user_id: e.target.value
                })
                break;
            case "reward":
                this.setState({
                    reward: e.target.value
                })
                break;
            case "token-address":
                this.setState({
                    token_address: e.target.value
                })
                break;
        }
    }

    async packTheTweet(){
        try {
            console.log("Try to execute transaction...");
            let result = await this.contract.packTweetObject(this.state.token_address, this.state.user_id, this.state.reward, this.state.token_address);
            console.log("Signature: ",result);
        } catch (err) {
            console.error('Ops, some error happen:', err);
        }
    }
    
    render(){
        return(
                <div>
                    <h4><strong>Generate Signature</strong></h4>
                    <small>generate signature to be needed in the proof</small>
                    <form>
                        <div className="form-group">
                            <label htmlFor="TweetId">Tweet ID</label>
                            <input type="text" name="tweet-id" className="form-control" id="TweetId" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="UserAddress">Address of the user</label>
                            <input type="text" name="user-id" className="form-control" id="UserAddress" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Reward</label>
                            <input type="text" name="reward" className="form-control" id="amount" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="TokenAddress">Token Address</label>
                            <input type="text" name="token-address" className="form-control" id="TokenAddress" onChange={this.handleChange}/>
                        </div>
                        <button type="button" id="encode" className="btn btn-warning" onClick={this.packTheTweet}>generate signature</button>
                    </form>
                    <p id="encodeTweet"></p>
                </div>
        );
    }
}