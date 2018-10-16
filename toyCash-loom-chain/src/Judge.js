import React, { Component } from 'react'
import Contract from './contract'

export default class Judge extends Component {
  constructor(props) {
    super(props)

    this.contract = new Contract();

    //initial state
    this.state = {
      tweet_id: "",
      user_id: "",
      reward: 0,
      token_address: "",
      judge_address: "",
      message_hash: "",
      judge_sig: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.sendJudgeReward = this.sendJudgeReward.bind(this);

  }

  //this function will be executed when the component is renderd
  async componentWillMount() {
    await this.contract.loadContract()
  }

  //handler that detects change of values
  handleChange(e) {
    // eventが発火したname属性名ごとに値を処理
    switch (e.target.name) {
      case 'tweet-id':
          this.setState({tweet_id: e.target.value});
          break;
      case 'user-id':
          this.setState({user_id: e.target.value});
          break;
      case 'reward':
          this.setState({reward: e.target.value});
          break;
      case 'token-address':
          this.setState({token_address: e.target.value});
          break;
      case 'judge-address':
          this.setState({judge_address: e.target.value});
          break;
      case 'message-hash':
          this.setState({message_hash: e.target.value});
          break;
      case 'judge-sig':
          this.setState({judge_sig: e.target.value});
          break;
    }
  }

  //processing when button is pressed
  async sendJudgeReward() {
    try {
      console.log("Try to execute transaction...");
      const tx = await this.contract.sendReward(this.state.tweet_id, this.state.user_id, this.state.reward, this.state.token_address, this.state.judge_address, this.state.message_hash, this.state.judge_sig);
      console.log(tx);
    } catch (err) {
      console.error('Ops, some error happen:', err)
    }
  }

  render() {
    return (
      //here is the place where the html file is deployed.
      <div>
        <h4><strong>Send Reward</strong></h4>
        <form>
            <div className="form-group">
              <label htmlFor="tweet-id">Tweet ID</label>
              <input type="text" name="tweet-id" className="form-control" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="user-id">Address of the User</label>
              <input type="text" name="user-id" className="form-control" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="reward">Reward Amount</label>
              <input type="number" name="reward" className="form-control" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="token-address">Token Address</label>
              <input type="text" name="token-address" className="form-control" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="judge-address">Address of the Judge</label>
              <input type="text" name="judge-address" className="form-control" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message-hash">Hash of Message</label>
              <input type="text" name="message-hash" className="form-control" value={this.state.name} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="judge-sig">Signature</label>
              <input type="text" name="judge-sig" className="form-control" value={this.state.name} onChange={this.handleChange} />
            </div>
            <button type="button" className="btn btn-danger" onClick={this.sendJudgeReward}>Judgement</button>
        </form>
        <p id="judgement-result">Result</p>
      </div>
    )
  }
}
