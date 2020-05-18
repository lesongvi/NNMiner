import React from 'react'

import Setting from './Setting'

let _startTime

const stamp = () => _startTime || +new Date()

const CSetting = ({ isShowAbout, persistanceData, client }) =>
  isShowAbout ? (
    stamp() && (
      <div>
        <Setting client={client} persistanceData={persistanceData} />
      </div>
    )
  ) : (
    <div />
  )

export default CSetting
