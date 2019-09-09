import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

import './PrizesView.scss'

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="rules-container">
        <div className="alignLeft">
          <h4 className='alignLeft'>Prizes</h4>
          <p className="alignLeft">Each individual vote will be an entry into a raffle to win a FREE GA Ticket to Resonance Music Festival 2017 courtesy of Essential Productions.</p>
          <p className="alignRight">Thank you!</p>
          <p className="alignRight">Advocates of Change, <br /> Essential Productions, <br />Resonance Music Festival, <br /> & Rumpke Mountain Boys,</p>
        </div>
      </div>
    )
  }
}
