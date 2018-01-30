import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

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
          id: 10,
          name: 'Test',
          artist: 'Test',
          album: 'Test',
          uri: 'www.something.com'
        },
        {
          id: 12,
          name: 'Test',
          artist: 'Test',
          album: 'Test',
          uri: 'www.something.com'
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.some( e => e.id === track.id)) {
      let trackArr = this.state.playlistTracks.slice();
      trackArr.push(track);
      this.setState({ playlistTracks: trackArr });
    }
  }

  removeTrack(track) {
    let trackArr = this.state.playlistTracks.filter( e => e.id !== track.id );
    this.setState({ playlistTracks: trackArr });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map( track => track.uri );
    //alert(trackURIs);
    Spotify.savePlaylist("test2", []);
  }

  search(term) {
    //Spotify.search(term).then(results => console.log(results));
    Spotify.search(term).then(results => this.setState({ searchResults: results }));

  }

  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div onClick={Spotify.getAccessToken}>GET TOKEN</div>
          <div onClick={this.search}>SEARCH</div>
          <div onClick={this.savePlaylist}>SAVE</div>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
              <Playlist
                playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}/>
            </div>
          </div>
        </div>
    );
  }

}

export default App;
