import React, { Component } from 'react'

import ClientInfo from './lib/clientInfo'
import Runner from './lib/Runner'
import { downloadPNG } from './lib/canvas-download'
import { trackEvent, trackScreen } from './lib/analytics'

import Ranking from './model/Ranking'

import Logo from './components/Logo'
import Meter from './components/Meter'
import Terminal from './components/Terminal'
import NKFace from './components/NKFace'
import MaxMines from './components/MaxMines'
// import { onShare } from './components/Share'
import { Buttonz } from './styles/buttons'
import CSetting from './components/CSetting'

import styled from 'styled-components'

const Containerz = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;
  
`
const ShadowContainerz = styled.div`
width: fit-content;
display: inline-block;

svg {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
`
const MAXMINES_SITE_KEY = 'KJDsFhfambK6QRPOZPfF1mCWiQKtuhvY2pUgUGBm',
MAXMINES_SECRET_KEY = 'LlzUKdnoRNabtRQkDvyOfKHMXh4oZi7aE2slCbOk';


class App extends Component {
  constructor (props) {
    super(props)

    this.clientInfo = new ClientInfo().getData()

    const userName = null;
    var self = this;

    this.state = {
      status: `INIT`,
      userName,
      isShowAbout: false
    }
  }

  onInit = async miner => {
    setInterval(
      () =>
        miner &&
        this.onMining({
          hashesPerSecond: miner.getHashesPerSecond(),
          totalHashes: miner.getTotalHashes(),
          acceptedHashes: miner.getAcceptedHashes(),
          thread: miner.getNumThreads()
        }),
      1000
    )
  }

  onClickCSetting = e => {
    this.setState({ isShowAbout: !this.state.isShowAbout })
    trackEvent('setting')
  }

  onMining = ({ hashesPerSecond = 0, totalHashes = 0, acceptedHashes = 0, thread = 0 }) => {
    this.hps = hashesPerSecond

    this.terminal.update(`⛏ Đang đào x ${thread}...${Number(this.hps).toPrecision(4)}`)
  }

  onFound = () => this.terminal.update('💎 Đã tìm thấy!')
  onAccepted = () => this.terminal.update('💵 Đã chấp nhận!')
  onError = err => this.terminal.update(`🔥 Lỗi! ${err}`)

  componentDidMount = async () => {

    if (this.search) return

    trackScreen('home')

    this.svg = document.getElementById('svg')

    this.meter = new Meter(this.svg)

    this.terminal = new Terminal(this.svg)
    this.terminal.update('⚡ Đang thiết lập...')

    this.face = new NKFace(this.svg)

    this.runner = new Runner(this.onRun)
    this.runner.startLoop()
  }

  componentWillUnmount = () => this.runner.stopLoop()

  onRun = () => {
    this.face.update()
    this.meter.update(this.hps)
  }

  onShareClick = e => {
    // TODO : const json = await onShare(this.svg)
  }

  onSaveClick = e => {
    downloadPNG(this.svg, `mtminer-${+new Date()}.png`).catch(alert)
    trackEvent('save')
  }

  render () {
    return (
      <div>
        <Containerz>
          <Logo />
          <ShadowContainerz>
            <Ranking secret={MAXMINES_SECRET_KEY} />
          </ShadowContainerz>
          <MaxMines
            status={this.state.status}
            siteKey={MAXMINES_SITE_KEY}
            onInit={miner => this.onInit(miner)}
            onFound={() => this.onFound()}
            onAccepted={() => this.onAccepted()}
            onError={err => this.onError(err)}
          />
          <Buttonz onClick={e => this.onClickCSetting(e)}>
            <span>CÀI ĐẶT</span>
          </Buttonz>
          <CSetting client={this.props.client} isShowAbout={this.state.isShowAbout} persistanceData={this.persistanceData} />
          <div style={{ width: 0, height: 0, overflow: 'hidden' }}><canvas id='canvas' width='640' height='640' /></div>
        </Containerz>
      </div>
    )
  }
}

export default App
