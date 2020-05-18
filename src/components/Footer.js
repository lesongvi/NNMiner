import React from 'react'

import styled from 'styled-components'

const Divz = styled.div`
ul {
  list-style: none;
  padding: 0;
}

ul  li{
  display: inline;
}
`

const facebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.URL)}&t=${encodeURIComponent(document.URL)}`)
}

const twitter = () => {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(document.title)}:%20${encodeURIComponent(document.URL)})`)
}

const google = () => {
  window.open(`https://plus.google.com/share?url=${encodeURIComponent(document.URL)}`)
}

const pocket = () => {
  window.open(`https://getpocket.com/save?url=${encodeURIComponent(document.URL)}&title=${encodeURIComponent(document.title)})`)
}

const reddit = () => window.open(`http://www.reddit.com/submit?url=${encodeURIComponent(document.URL)}&title=${encodeURIComponent(document.title)})`)

const Footer = () => (
  <Divz>
    <ul>
      <li>
        <a
          href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fngocnhipy.github.io%2Fnnminer&t='
          title='Chia sẽ lên Facebook'
          target='_blank'
          rel='noopener noreferrer'
          onClick={facebook}
        >
          <img alt='Chia sẽ lên Facebook' src='images/facebook.png' />
        </a>
      </li>
      <li>
        <a
          href='https://twitter.com/intent/tweet?source=https%3A%2F%2Fngocnhipy.github.io%2Fnnminer&text=:%20https%3A%2F%2Fngocnhipy.github.io%2Fnnminer'
          target='_blank'
          title='Tweet'
          rel='noopener noreferrer'
          onClick={twitter}
        >
          <img alt='Tweet' src='images/twitter.png' />
        </a>
      </li>
      <li>
        <a
          href='https://getpocket.com/save?url=https%3A%2F%2Fngocnhipy.github.io%2Fnnminer&title='
          target='_blank'
          title='Thêm vào Pocket'
          rel='noopener noreferrer'
          onClick={pocket}
        >
          <img alt='Thêm vào Pocket' src='images/pocket.png' />
        </a>
      </li>
      <li>
        <a
          href='http://www.reddit.com/submit?url=https%3A%2F%2Fngocnhipy.github.io%2Fnnminer&title='
          target='_blank'
          title='Đăng lên Reddit'
          rel='noopener noreferrer'
          onClick={reddit}
        >
          <img alt='Đăng lên Reddit' src='images/reddit.png' />
        </a>
      </li>
    </ul>
  </Divz>
)

export default Footer
