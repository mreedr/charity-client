import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import ReactTable from 'react-table'
import FontAwesome from 'react-fontawesome'
import classnames from 'classnames';
import 'react-table/react-table.css'
import './ResultsView.scss'

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableView: true
    };
    this.players = {}; // current playing song
    this.getCounts = this.getCounts.bind(this);
    this.getLabels = this.getLabels.bind(this);
    this.voteCountCell = this.voteCountCell.bind(this)
    this.songCell = this.songCell.bind(this)
    this.play = this.play.bind(this)
    this.columns = this.columns.bind(this)
  }

  componentDidMount() {
    this.props.getSongsWithVotes();
  }


  getLabels(songs) {
    if (!songs) return;
    return songs.map((song) => { return song.title });
  }

  getCounts(songs) {
    if (!songs) return;
    return songs.map((song) => { return song.count });
  }

  voteCountCell(c) {
    const { count } = c.original;
    return (
      <div>
        {count}
      </div>
    )
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

  titleCell(c) {
    const { title } = c.original;
    return <div className="song-title">{title}</div>
  }

  columns() {
    const columns = []
    // columns.push({ Header: 'Preview', accessor: 'title', Cell: this.songCell })
    columns.push({ Header: 'Song Title', accessor: 'title', Cell: this.titleCell, sortable: false })
    columns.push({ Header: 'Votes', accessor: 'count', Cell: this.voteCountCell })
    return columns
  }

  render() {
    const songs = this.props.songs && this.props.songs.data;
    let data = {
      labels: this.getLabels(songs),
      datasets: [
        {
          label: 'Votes',
          data: this.getCounts(songs),
          backgroundColor: ['#613d90', '#2a854f', '#613d90', '#2a854f', '#613d90',
                            '#2a854f', '#613d90', '#2a854f', '#613d90', '#2a854f',
                            '#613d90', '#2a854f', '#613d90', '#2a854f', '#613d90',
                            '#2a854f', '#613d90', '#2a854f', '#613d90', '#2a854f',
                            '#613d90', '#2a854f', '#613d90', '#2a854f', '#613d90']
        }
      ]
    }

    return (
      <div>
        <h2 style={{color: '#ffffff'}}>Current Standings</h2>
        <div className="results-display-buttons mobile-hide"><button className={classnames({active: this.state.tableView})}  onClick={() => this.setState({ tableView: true })}>Table View</button>
        <button className={classnames({active: !this.state.tableView})} onClick={() => this.setState({ tableView: false })}>Chart View</button></div>
        <div className="results-container">

          {(this.state.tableView) ? (
            <ReactTable
              minRows={3}
              data={songs}
              columns={this.columns()}
              showPagination={false}
              showPageSizeOptions={false}
              showPageJump={false}
              sortable={true}
            />
          ) : (
            <HorizontalBar
              data={data}
              legend={{ display: false }}
              options={{
                scales: {
                  xAxes: [{
                    ticks: {
                      beginAtZero: true,
                      stepSize: 1
                    }
                  }]
                }
              }} />
          )}
      </div>
    </div>
    )
  }
}
