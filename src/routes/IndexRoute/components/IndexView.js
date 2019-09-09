import React from 'react'

import './IndexView.scss'

export default class HomeView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="raffle-container">
        <div className="info-column">
          <h2>Win FREE Resonance Tickets!</h2>
          <div className="horizontal-rule"></div>
          <div className="details-container">
            <div className="pricing">
              <h4>Pricing:</h4>
              <span>1 vote for $3.00</span>
              <span>2 votes for $5.00</span>
              <span>3+ for $2.00 per vote</span>
            </div>
            <span className="sold">Sold: xxz</span>
            <p className="expire">Raffle Ends August 21st 2017</p>
            <button className="button-raffle">Buy Raffle Tickets</button>
            <p className="proceeds">
              Enter to win Resonance 2017 tickets with the purchase of a $3 raffle ticket!
              All net proceeds benefit Advocates of Change.
            </p>
            <p className="what-is-this">
              <h2>What Is This?</h2>
              This year Resonance Music Festival is helping to raise funds for Advocates of Change, a 501(c)3 public charity non-profit organization that
              is mobilizing and empowering the music community to positively impact our communities through art and activism.
              In addition to prompting festival goers to donate money to Advocates of Change during the ticket buying process,
              Resonance and Advocates of Change have parntered with The Rumpke Mountain Boys to allow fans to vote on what songs will appear in their late
              night setlist in exchange for a monetary contribution to Advocates of Change.
            </p>
          </div>
        </div>
        <div className="prize-column">
          <img src={require('../assets/cetcb6ws6fiy.jpg')} className="resonance-lineup"/>
        </div>
      </div>
    )
  }
}
