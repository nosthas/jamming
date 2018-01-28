import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
      { id: 1,
        name: 'Blood is on the road',
        artist: 'Emilio Nosthas',
        album: 'Life and More'
      },
      { id: 2,
        name: 'Blood is on the road',
        artist: 'Emilio Nosthas',
        album: 'Life and More'
      },
      { id: 3,
        name: 'Blood is on the road',
        artist: 'Emilio Nosthas',
        album: 'Life and More'
      }],
      playlistName: "Mi Lista",
      playlistTracks: [
        {
          id: 1,
          name: 'Test',
          artist: 'Test',
          album: 'Test'
        },
        {
          id: 2,
          name: 'Test',
          artist: 'Test',
          album: 'Test'
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.some( e => e.id === track.id)) {
      let trackArr = this.state.playlistTracks.slice()
      trackArr.push(track)
      this.setState({ playlistTracks: trackArr })
    }
  }

  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
