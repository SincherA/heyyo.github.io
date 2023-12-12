import { useEffect, useState } from 'react';
import axios from 'axios';
import './sharedStyles.css'


const SpotifyRecommendations = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientId = '03461048bc924c90b0d69d70051c8be9'; 
      const clientSecret = 'c15b10055fe649e385efc1dce5e6dc2d'; 

      const base64Credentials = btoa(`${clientId}:${clientSecret}`);

      try {
        const tokenResponse = await axios.post(
          'https://accounts.spotify.com/api/token',
          'grant_type=client_credentials',
          {
            headers: {
              'Authorization': `Basic ${base64Credentials}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const accessToken = tokenResponse.data.access_token;

        const playlistsResponse = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        setFeaturedPlaylists(playlistsResponse.data.playlists.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-container">
      {featuredPlaylists.map(playlist => (
        <div key={playlist.id} className="card">
          <img src={playlist.images[0].url} alt={playlist.name} />
          <div className="card-content">
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              Open in Spotify
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpotifyRecommendations