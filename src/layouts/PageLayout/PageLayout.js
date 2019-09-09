import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div>
    <div className='container text-center'>
      <img src={require('../assets/site-banner.png')} width={'100%'}/>
      {/* <h2 style={{color: '#ffffff'}}>Advocates for Change Ticket Raffle</h2>
      <p style={{color: '#ffffff'}}>Vote on Rumpke's setlist, enter to win a free ticket to this year's Resonance Music Festival</p> */}
      <div className="header-nav">
        <Link to="/" style={{marginRight: 10}}><button>Home</button></Link>
        <Link to="/results" style={{marginRight: 10}}><button>Standings</button></Link>
        <Link to="/prizes" style={{marginRight: 10}}><button>Prizes</button></Link>
        <Link to="/rules" style={{marginRight: 10}}><button>Rules</button></Link>
        <Link to="/about"><button>About</button></Link>
      </div>
      {/*
        // this activeClassName is super cool
        <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
      {' · '}
      <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link> */}
      <div className='page-layout__viewport'>
        {children}
      </div>
    </div>
    <div className="footer">
      <div className="footer-left">
        Resonance is a weekend long gathering of like minded, motivated, music loving individuals happening September 21 - 23, 2017 at Legend Valley in Thornville, OH.
      </div>
      <div className="footer-center"></div>
      <div className="footer-right">
        Advocates for Change is a 501(c)3 public charity non-profit organization aimed at *** GET VERBAGE FROM CHAD ***.
      </div>

    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
