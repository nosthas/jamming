// Jammming Main React Component

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
      searchResults: [],
      playlistName: "...My New Playlist",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Adds a new song to the Playlist
  addTrack(track) {
    if (!this.state.playlistTracks.some( e => e.id === track.id)) {
      let trackArr = this.state.playlistTracks.slice();
      trackArr.push(track);
      this.setState({ playlistTracks: trackArr });
    }
  }

  // Removes a selected song from the Playlist
  removeTrack(track) {
    let trackArr = this.state.playlistTracks.filter( e => e.id !== track.id );
    this.setState({ playlistTracks: trackArr });
  }

  // Updates the Playlist Name
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  // Sends and Saves the selected playlist to Spotify
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map( track => track.uri );
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then( result => {
      console.log(result);
      this.setState({ playlistName: "...My New Playlist",
                      searchResults: [],
                      playlistTracks: [] });
    });
  }

  // Query Spotify Songs.
  search(term) {
    Spotify.search(term).then(results => this.setState({ searchResults: results }));
  }

  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResults
                  searchResults={this.state.searchResults}
                  onAdd={this.addTrack} />
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
