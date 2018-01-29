
const accessToken = '';

let Spotify = {

  getAccessToken: function() {

    // Check if accessToken already exist
    if (accessToken !== '') {
      return accessToken;
    }

    const spotify = 'https://accounts.spotify.com/authorize';
    const client_id = '?client_id=cc05bf86a88943efb28413f87d317b94';
    const redirect_uri = '?redirect_uri=http://localhost:3000';
    const response_type = '?response_type=token';

    const myHeaders = new Headers({
      "Access-Control-Allow-Origin": "*"
    });

    fetch( spotify + client_id + redirect_uri + response_type,  myHeaders)
    .then( response => {
      if ( response.ok ) {
        return response.json();
      }
      //console.log("Error networkError: " + response)
      //throw new Error('Request Failed');
    }, networkError => console.log(networkError.message) )
    .then( jsonResponse => {
      //console.log("Response: " + jsonResponse)
    });

  }



};

export default Spotify;
