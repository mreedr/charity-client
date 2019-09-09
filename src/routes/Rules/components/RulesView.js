import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

import './RulesView.scss'

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="rules-container">
        <div className="alignLeft">
          <h4 className='alignLeft'>What Is This?</h4>
          <p className="alignLeft">1) A raffle to win a general admission entry ticket to Resonance.</p>
          <p className="alignLeft">2) A chance to vote to determine the first 4 songs of the Rumpke Mountain Boys day time set at Resonance.</p>
          <p className="alignLeft">This year Resonance Music Festival is helping to raise funds for Advocates of Change, a a 501(c)3 public charity non-profit organization that is mobilizing and empowering the music community to positively impact our communities through art and activism.</p>
        </div>

        <div className="alignLeft">
          <h4 className='alignLeft'>How It Works</h4>
          <p className="alignLeft">Participants cast their votes for what songs they want to hear the Rumpke Mountain Boys play at this year's Resonanance Music Festival. The highest voted song from each member will be the first 4 songs of Rumpke's daytime set at Resonance 2017. Participants can enter as many time as you would like and each casted vote will enter you in the raffle to win a ticket to Resonance.</p>
        </div>
        <div className="alignLeft">
          <h4 className='alignLeft'>Pricing</h4>
          <p className="alignLeft">1 Vote is $3, <br /> 2 Votes is $5 <br /> 3+ Votes are $2 per vote</p>
        </div>
        <div className="alignLeft">
          <p className="alignRight">Thank you!</p>
          <p className="alignRight">Advocates of Change, <br /> Essential Productions, <br />Resonance Music Festival, <br /> & Rumpke Mountain Boys,</p>
        </div>
      </div>
    )
  }
}
