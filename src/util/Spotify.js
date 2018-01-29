
let accessToken = '';
let expiresIn = '';

let Spotify = {

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


    } else {
      // No params on URL, redirect to Spotify
      window.location.href = spotify + client_id + redirect_uri + response_type;
    }

  }


};

export default Spotify;
