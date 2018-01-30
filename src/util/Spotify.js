
let accessToken = '';
let expiresIn = '';

let Spotify = {

// Spotify Access Token
  getAccessToken: function() {

    const spotify = 'https://accounts.spotify.com/authorize';
    const client_id = '?client_id=cc05bf86a88943efb28413f87d317b94';
    const redirect_uri = '&redirect_uri=http://localhost:3000';
    const response_type = '&response_type=token';

    const access_token = window.location.href.match(/access_token=([^&]*)/);
    const expires_in = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken !== '') {
      // Check if there is already a token
      console.log("Already: " + accessToken);
      return accessToken;

    } else if ( access_token && expires_in ) {

      // No token but there are spotify params on URL
      accessToken = access_token[1];
      expiresIn = expires_in[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;

    } else {
      // No params on URL, redirect to Spotify
      window.location.href = spotify + client_id + redirect_uri + response_type;
    }

  },

// Spotify Search Request
  search(term){

    const header = {
      headers: { Authorization: `Bearer ${accessToken}`}
    }

    return fetch( 'https://api.spotify.com/v1/search?type=track&q="' + term + '"', header )
    .then( response => {
      if ( response.ok) {
        return response.json();
      }
      throw new Error('Search Request Failed!');
    }, networkError => { console.log(networkError.message) })
    .then(jsonResponse => {
      if ( jsonResponse.tracks ) {
        let result =  jsonResponse.tracks.items.map( track => (
              { id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri }
        ));
        return result;
      } else {
        return [];
      }
    });
  },

  //Spotify Save Playlist
  savePlaylist(playlistName, playlistTracks) {

    if (!playlistName || !playlistTracks) {
      return;
    }

    let access_token = accessToken;
    const header = { headers: { Authorization: `Bearer ${accessToken}`}};
    let user_id;

    // Get User ID from Spotify
    let spotifyUser = fetch('https://api.spotify.com/v1/me', header)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(' User ID Request Failed!');
    }, networkError => { console.log(networkError.message)})
    .then(jsonResponse => {
      user_id = jsonResponse.id;
      return user_id;
    })

    // Create a Playlist
    let spotifyPlaylist = spotifyUser.then(user => {
        //alert(user);
        return fetch('https://api.spotify.com/v1/users/'+user+'/playlists', {
          headers: {  'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json' },
          scope: 'playlist-modify-private',
          method:'POST',
          body: JSON.stringify({name:playlistName})});
    }).then(response => {
      if (response.ok ) {
        return response.json();
      }
      console.log(response);
      throw new Error(' Playlist Create Request Failed!');
    })
    .then(jsonResponse => {
      console.log(jsonResponse);
    })
  }

};

export default Spotify;
