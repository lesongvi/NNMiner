import React, { Component } from 'react'

import is from 'is_js'
import { Buttonz } from '../styles/buttons'
import { trackEvent } from '../lib/analytics'

import TextField from 'material-ui/TextField'

import { deepOrange500, blue500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import styled from 'styled-components'

const Formz = styled.form`
  padding-bottom: 10vh;
`

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
})

const defaultValueHere = localStorage.getItem('minerName');

class Setting extends Component {
  constructor (props) {
    super(props)
    this.persistanceData = props.persistanceData
  }

  onSubmit = e => {
    e.preventDefault()

    const minername = this.refs.minername.input.value
    localStorage.removeItem('minerName');
    localStorage.setItem('minerName', this.refs.minername.input.value);

    trackEvent('submit', { minername })

    if (is.undefined(minername) || is.null(minername)) {
      alert('Nhập tên máy đào dùm tui')
      return
    }
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Formz onSubmit={this.onSubmit}>
          <TextField
            ref='minername'
            underlineStyle={{ borderColor: blue500 }}
            floatingLabelText=' Nhập tên máy đào của bạn.'
            defaultValue={defaultValueHere}
          />
          <br />
          <Buttonz type='submit'>
            <span>Xong</span>
          </Buttonz>
        </Formz>
      </MuiThemeProvider>
    )
  }
}

export default Setting
