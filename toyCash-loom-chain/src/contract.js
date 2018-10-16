import {
  Client, LocalAddress, CryptoUtils, LoomProvider
} from 'loom-js'

import Web3 from 'web3'
import ToyCash from './contracts/ToyCash.json'

export default class Contract {
  async loadContract() {
    this.onEvent = null
    this._createClient()
    this._createCurrentUserAddress()
    this._createWebInstance()
    await this._createContractInstance()
  }

  _createClient() {
    this.privateKey = CryptoUtils.generatePrivateKey()
    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey)
    this.client = new Client(
      'default',
      'ws://127.0.0.1:46658/websocket',
      'ws://127.0.0.1:46658/queryws',
    )

    this.client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
    })
  }

  _createCurrentUserAddress() {
    this.currentUserAddress = LocalAddress.fromPublicKey(this.publicKey).toString()
  }

  _createWebInstance() {
    this.web3 = new Web3(new LoomProvider(this.client, this.privateKey))
  }

  async _createContractInstance() {
    const networkId = await this._getCurrentNetwork()
    this.currentNetwork = ToyCash.networks[networkId]

    if (!this.currentNetwork) {
      throw Error('Contract not deployed on DAppChain')
    }

    const ABI = ToyCash.abi
    this.ToyCashInstance = new this.web3.eth.Contract(ABI, this.currentNetwork.address, {
      from: this.currentUserAddress
    })

    this.ToyCashInstance.events.LogJudgement(function (err, event) {
      if(err){
        console.error('Error on event : LogJudgement');
      }else{
        if(this.onEvent) {
          this.onEvent(event.returnValues)
        }
      }
    })
  }

  addEventListener(fn) {
    this.onEvent = fn
  }

  //function to get token balance 
  async getTokenBalance(token_address) {
    console.log('Try to execute getTokenBalance...')
    console.log(this.ToyCashInstance)
    console.log(this.ToyCashInstance.methods)
    console.log(token_address)
    console.log("あなたのアドレス",this.currentUserAddress)
    return await this.ToyCashInstance.methods.getTokenBalance(token_address).call({
      from: this.currentUserAddress
    })
  }

  //function to send reward to a judgement
  async sendReward(tweet_id, user_address, amount, token_address, judge_address, message_hash, judge_sig) {
    console.log('Try to execute sendReward...')
    return await this.ToyCashInstance.methods.sendReward(tweet_id, user_address, amount, token_address, judge_address, message_hash, judge_sig).send({
      from: this.currentUserAddress
    })
  }

  //function to hash the tweet.
  async packTweetObject(tweet_id, user_address, amount, token_address) {
    console.log('Try to execute packTweetObject...')
    return await this.ToyCashInstance.methods.packTweetObject(tweet_id, user_address, amount, token_address).send({
      from: this.currentUserAddress
    })
  }

  //used in _createContractInstance
  async _getCurrentNetwork() {
    return await this.web3.eth.net.getId()
  }
}

