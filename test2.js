///SOLUTION

savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(https://api.spotify.com/v1/users/${userId}/playlists, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }


////

return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(https://api.spotify.com/v1/users/${userId}/playlists, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });


    //Spotify Save Playlist
    savePlaylist2(playlistName, playlistTracks) {

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

          return fetch('https://api.spotify.com/v1/users/'+user+'/playlists', {
            headers: {  Authorization: `Bearer ${accessToken}`},
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


&scope=playlist-modify-public
