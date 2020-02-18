import React from 'react'

import Subscription from './Subscription'

let _startTime

const stamp = () => _startTime || +new Date()

const About = ({ isShowAbout, persistanceData, client }) =>
  isShowAbout ? (
    stamp() && (
      <div>
        <Subscription client={client} persistanceData={persistanceData} />
      </div>
    )
  ) : (
    <div />
  )

export default About
