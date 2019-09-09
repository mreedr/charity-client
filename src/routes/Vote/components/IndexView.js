import React from 'react'
import ReactTable from 'react-table'
import Checkout from './Checkout'
import ReactModal from 'react-modal'
import { Elements } from 'react-stripe-elements'
import { CSSTransitionGroup } from 'react-transition-group'

// import AudioPlayer from 'react-responsive-audio-player'
import FontAwesome from 'react-fontawesome'

import 'react-table/react-table.css'
import './IndexView.scss'

export default class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.players = {}; // current playing song
    this.onCellClick = this.onCellClick.bind(this)
    this.selectCell = this.selectCell.bind(this)
    this.songCell = this.songCell.bind(this)
    this.play = this.play.bind(this)
    this.columns = this.columns.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    this.props.getSongs()
  }

  onCellClick(original) {
    // const { isSelected, id, title } = original;
    return () => this.props.selectSong(original.id)
  }

  selectCell(c) {
    const { isSelected } = c.original;
    return (
      <div onClick={this.onCellClick(c.original)}>
        <div className="squaredFour">
          <input type="checkbox" value="None" id="squaredFour" name="check" checked={(isSelected) ? true : false} />
          <label for="squaredFour"></label>
        </div>
      </div>
    )
  }

  play(id) {
    return () => {
      const songIds = Object.keys(this.players);
      for (let i = 0; i < songIds.length; i++) {
        const id = songIds[i]
        // resets all other song
        if (this.players[id].played.length > 0) {
          this.players[id].load()
        }
      }
      // if we played the currrent playing song, stop it and reload
      if (this.state.currentPlay === id) {
        this.players[id].load()
        this.setState({ currentPlay: null })
      } else {
        this.players[id].play()
        this.setState({ currentPlay: id })
      }
    }
  }

  songCell(c) {
    const { id } = c.original
    const { currentPlay } = this.state

    return (
      <div className="song-player-container">
        <FontAwesome name={currentPlay === id ? 'stop' : 'play'} className="play-button"
          onClick={this.play(id)} />
        <audio className="audio-player" controls="controls" data-test={id} preload ref={(ref) => this.players[id] = ref} >
          <source src={`http://archive.org/download/${c.original.url}`} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    )
  }

  titleCell(c) {
    const { title } = c.original;
    return <div className="song-title">{title}</div>
  }

  columns() {
    const columns = []
    columns.push({ Header: 'Preview', accessor: 'title', Cell: this.songCell })
    columns.push({ Header: 'Song Title', accessor: 'title', Cell: this.titleCell })
    columns.push({ Header: '', accessor: 'isSelected', Cell: this.selectCell })
    return columns
  }

  getNumSelected(song) {
    // add up all songs voted for
    return [0, ...song].reduce((sum, b) => {
      return b.isSelected ? sum + 1 : sum
    })
  }

  calculateTotal() {
    let { songs } = this.props;
    if (songs.length === 0) return 0;
    if (songs.length === 1) return 3;
    if (songs.length === 2) return 5;
    return songs.length * 2;

  }

  render() {
    const { songs, vote } = this.props;
    console.log('vote: ', vote);
    if (!this.props.songs) {
      return (<div> Error requesting page </div>);
    }
    console.log('style: ', require('./modal-styles.js'));
    return (
      <div className="index-container">
        <h4 style={{color: '#fff'}}>Prize: One (1) Free Ticket to Resonance Music Festival 2017</h4>
        <div className="ballot-table">
          <ReactTable
            minRows={3}
            data={songs}
            columns={this.columns()}
            showPagination={false}
            showPageSizeOptions={false}
            showPageJump={false}
            sortable={false}
          />
          <div className="songsSelectedInfo">You selected {this.getNumSelected(songs)} songs</div>
        </div>

        <div className="cast-ballot-container">
          <button onClick={() => this.setState({modalOpen: true})}>
            Cast Ballot!
          </button>
        </div>

        <ReactModal
          isOpen={this.state.modalOpen}
          contentLabel="Payment Modal"
          onRequestClose={() => this.setState({modalOpen: false})}
          style={require('./modal-styles.js').default}
        >
          <h2 className="checkout-header">Payment Information</h2>
          <Elements>
            <Checkout songCount={this.getNumSelected(songs)} vote={vote}/>
          </Elements>
        </ReactModal>
      </div>
    )
  }
}
