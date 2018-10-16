import React, { Component } from "react";
import Contract from './contract'

export default class Balance extends Component {
    constructor(props){
        super(props);

        this.contract = new Contract()

        this.state = {
            token_address: "Token Address",
            your_balance: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.getYourBalance = this.getYourBalance.bind(this);
    }

    //this function will be executed when the component is renderd
    async componentWillMount() {
        await this.contract.loadContract()
    }

    handleChange(e) {
        this.setState({
            token_address: e.target.value
        });
    }

    async getYourBalance() {
        try {
            console.log("Try to execute transaction...");
            let result = await this.contract.getTokenBalance(this.state.token_address);
            console.log(result);
            this.setState({
                your_balance: Number(result)
            });
        } catch (err) {
            console.error('Ops, some error happen:', err);
        }
    }

    render(){
        return (
            <div>
                <h4><strong>Your token balance</strong></h4>
                <form>
                <div className="form-group">
                    <label>Token Address</label>
                    <input type="text" className="form-control" onChange={this.handleChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.getYourBalance} >get balance</button>
                </form>
                <p>{this.state.token_address} : {this.state.your_balance}</p>
            </div>
        )
    }
}