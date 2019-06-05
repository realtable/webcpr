import jss from 'jss'
import preset from 'jss-preset-default'
import setup from './setup.js'

// setup jss
jss.setup(preset())

// css styles
const style = {
  '@global': {
    big: {
      fontSize: 'larger'
    },
    blink: {
      animation: '2s linear infinite blinking'
    },
    center: {
      textAlign: 'center'
    },
    hgroup: {
      display: 'block'
    },
    marqueex: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      width: '100%',
      display: 'inline-block',
      '& .webcpr-marquee': {
        display: 'inline-block',
        paddingLeft: '100%',
        animation: '20.6s linear infinite scroll-h',
        animationDirection: 'normal',
      },
      '&[direction="right"] .webcpr-marquee': {
        animationDirection: 'reverse',
      },
      '&[direction="up"] .webcpr-marquee': {
        animationName: 'scroll-v',
        paddingLeft: '0'
      },
      '&[direction="down"] .webcpr-marquee': {
        animationDirection: 'reverse',
        animationName: 'scroll-v',
        paddingLeft: '0'
      }
    },
    nobr: {
      whiteSpace: 'nowrap'
    },
    strike: {
      textDecoration: 'line-through'
    },
    'listing, plaintext, tt, xmp': {
      display: 'block',
      fontFamily: 'monospace',
      whiteSpace: 'pre',
      margin: '1em 0'
    }
  },
  '@keyframes blinking': {
    '0%': { visibility: 'hidden' },
    '50%': { visibility: 'hidden' },
    '100%': { visibility: 'visible' }
  },
  '@keyframes scroll-h': {
    '0%': { transform: 'translate(0, 0)' },
    '100%': { transform: 'translate(-100%, 0)' }
  },
  '@keyframes scroll-v': {
    '0%': { transform: 'translate(0, 100%)' },
    '100%': { transform: 'translate(0, -100%)' }
  }
}

// load styles into dom
const sheet = jss.createStyleSheet(style)
sheet.attach()

// handle attributes
setup()
