import React, { Component } from 'react'

import is from 'is_js'
import { Buttonz } from '../styles/buttons'
import { trackEvent } from '../lib/analytics'

import { TextField } from '@material-ui/core'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import styled from 'styled-components'

const Formz = styled.form`
  padding-bottom: 10vh;
`

const muiTheme = createMuiTheme({
  palette: {
    accent1Color: "#ff5722"
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
            underlineStyle={{ borderColor: "#2196f3" }}
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
