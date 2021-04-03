import React, { Component } from 'react'

import is from 'is_js'
import { Buttonz } from '../styles/buttons'
import { trackEvent } from '../lib/analytics'

import { TextField } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";

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

const txtColor = {
  root: {
    background: "black"
  },
  input: {
    color: "#FFF"
  }
};

class Setting extends Component {
  constructor (props) {
    super(props);
    this.persistanceData = props.persistanceData;

    this.state = {
      minername: localStorage.getItem('minerName')
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const minername = this.state.minername;
    
    if (is.undefined(minername) || is.null(minername) || minername === "") {
      alert('Nhập tên máy đào dùm tui')
      return
    }

    localStorage.removeItem('minerName');
    localStorage.setItem('minerName', minername);

    trackEvent('submit', { minername });

    //this.props.onShowDone(false);
  }

  render () {
    const { classes } = this.props;
    const { minername } = this.state;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Formz onSubmit={this.onSubmit}>
          <TextField
            onChange={this.handleChange}
            underlineStyle={{ borderColor: "#2196f3" }}
            InputProps={{
              className: classes.input
            }}
            floatingLabelText=' Nhập tên máy đào của bạn.'
            defaultValue={minername}
            name="minername"
          />
          <br />
          <Buttonz type='submit'>
            <span>Lưu</span>
          </Buttonz>
        </Formz>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(txtColor)(Setting)
