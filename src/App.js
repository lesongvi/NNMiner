import React, { Component } from 'react'
import axios from 'axios';

// Library
import ClientInfo from './lib/clientInfo'
import Runner from './lib/Runner'
import { downloadPNG } from './lib/canvas-download'
import { trackEvent, trackScreen } from './lib/analytics'
import queryString from 'query-string'

// Services
import Model from './model'
import { getDeviceRanking, collect } from './model/Ranking'
import { data } from './model/data.json'

// Components
import ActionPage from './pages/ActionPage'
import Logo from './components/Logo'
import Stage from './components/Stage'
import Meter from './components/Meter'
import Terminal from './components/Terminal'
import Cars from './components/Cars'
import MaxMines from './components/MaxMines'
// TODO // import { onShare } from './components/Share'
import { Buttonz } from './styles/buttons'
import About from './components/About'

// Styles
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

    // Action
    this.search = window.location.search && queryString.parse(window.location.search)

    this.clientInfo = new ClientInfo().getData()
    this.model = new Model()
    this.model.getData().then(data => (this.persistanceData = data))

    // Ranking
    const ranking = data.allDevices
    const topuser = [];
    const userName = null;
    var self = this;

    this.state = {
      status: `INIT`,
      ranking,
      topuser,
      userName
    }

    setInterval(function(){
    axios.get('https://api.maxmines.com/user/top?secret=' + MAXMINES_SECRET_KEY)
    .then(function ({data}) {
      self.setState({ topuser: data.users })
      //console.log(data)
    })
    .catch(function (error) {
      console.log(error)
    })}, 5000);
  }

  onInit = async miner => {
    // Get old data
    this.persistanceData = await this.model.getData()

    // Register
    await collect(this.props.client, this.clientInfo, this.persistanceData, 0, 0).then(result => {
      if (!result) return

      const { id } = result.data.createDevice
      this.model.setId(id)
      this.persistanceData.id = id
    })

    // Mining
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

  onMining = ({ hashesPerSecond = 0, totalHashes = 0, acceptedHashes = 0, thread = 0 }) => {
    this.hps = hashesPerSecond

    // Terminal
    this.terminal.update(`⛏ Đang đào x ${thread}...${Number(this.hps).toPrecision(4)}`)

    if (!this.persistanceData.id) return

    // Upsert result?
    collect(this.props.client, this.clientInfo, this.persistanceData, this.hps, thread).then(result => {
      if (!result) return
    })
  }

  onFound = () => this.terminal.update('💎 Đã tìm thấy!')
  onAccepted = () => this.terminal.update('💵 Đã chấp nhận!')
  onError = err => this.terminal.update(`🔥 Lỗi! ${err}`)

  componentDidMount = async () => {

    // Action
    if (this.search) return

    // Track
    trackScreen('home')

    // SVG
    this.svg = document.getElementById('svg')

    // Meter
    this.meter = new Meter(this.svg)

    // Terminal
    this.terminal = new Terminal(this.svg)
    this.terminal.update('⚡ Đang thiết lập...')

    // Gimmick
    this.cars = new Cars(this.svg)

    // Runner
    this.runner = new Runner(this.onRun)
    this.runner.startLoop()

    // Pull new data
    const ranking = await getDeviceRanking(this.props.client)
    this.setState({ ranking, isShowAbout: false })
  }

  componentWillUnmount = () => this.runner.stopLoop()

  onRun = () => {
    // Move car
    this.cars.update()

    // HPS
    this.meter.update(this.hps)
  }

  onShareClick = e => {
    // TODO : const json = await onShare(this.svg)
  }

  onSaveClick = e => {
    // TODO : Work only chrome and opera
    downloadPNG(this.svg, `minemark-${+new Date()}.png`).catch(alert)
    trackEvent('save')
  }

  onClickAbout = e => {
    this.setState({ isShowAbout: !this.state.isShowAbout })
    trackEvent('about')
  }

  render () {
    // Action
    if (this.search) return <ActionPage client={this.props.client} search={this.search} />

    // Main
    return (
      <div>
        <Containerz>
          <Logo />
          <ShadowContainerz>
            <Stage clientInfo={this.clientInfo} ranking={this.state.ranking} topuser={this.state.topuser} />
          </ShadowContainerz>
          <MaxMines
            status={this.state.status}
            siteKey={MAXMINES_SITE_KEY}
            onInit={miner => this.onInit(miner)}
            onFound={() => this.onFound()}
            onAccepted={() => this.onAccepted()}
            onError={err => this.onError(err)}
          />
          <Buttonz onClick={e => this.onClickAbout(e)}>
            <span>CÀI ĐẶT</span>
          </Buttonz>
          <About client={this.props.client} isShowAbout={this.state.isShowAbout} persistanceData={this.persistanceData} />
          <div style={{ width: 0, height: 0, overflow: 'hidden' }}><canvas id='canvas' width='640' height='640' /></div>
        </Containerz>
      </div>
    )
  }
}

export default App
