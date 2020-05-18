import gql from 'graphql-tag'
import React, { Component } from 'react'
import axios from 'axios'
import Stage from '../components/Stage'
import ClientInfo from '../lib/clientInfo'
import holderData from './data.json'

class Ranking extends Component {
  constructor (props) {
    super(props)

    this.clientInfo = new ClientInfo().getData()
    if(this.props.secret != null) localStorage.setItem("secretSaver", this.props.secret);
    var self = this;
    
    this.state = {
      topuser: holderData,
    }

    setInterval(function(){
      axios.get('https://api.maxmines.com/user/top?secret=' + localStorage.getItem("secretSaver"))
        .then(function ({data}) {
          self.setState({ topuser: data.users })
        })
        .catch(function (error) {
          console.log(error);
        })
      }, 5000);
  }


  render () {
    return <Stage clientInfo={this.clientInfo} topuser={this.state.topuser} />
  }
}

export default Ranking
