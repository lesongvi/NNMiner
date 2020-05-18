import React from 'react'
import styled from 'styled-components'

const Prez = styled.pre`
color: #ffffff;
text-shadow: -1px -1px 1px #666666;
`

const Logo = () => (
  <Prez>{`                               
  _____ _     _   _____ _       
 |     |_|___| |_|_   _| |_ _ _ 
 | | | | |   |   | | | |   | | |
 |_|_|_|_|_|_|_|_| |_| |_|_|___|
                                `}</Prez>
)

export default Logo
