import {html, mounted} from '../../utils';
import { Player } from '../../models/Player';
import { PlaylistView } from '../Playlist';
import "./Player.css"

export function PlayerView(){
  const player = new Player();

  mounted(function(){
    const musicState = document.querySelector<HTMLImageElement>('#player_state-playing');
    const audioElement = document.querySelector<HTMLAudioElement>('#audio_player')
    const previousButton = document.querySelector<HTMLImageElement>('#player_previous-button');
    const nextButton = document.querySelector<HTMLImageElement>('#player_next-button');

    musicState?.addEventListener('click', function() {
      if(player.playing){
        player.pause();
        audioElement!.pause();
        musicState.src = "/img/play.svg";
      }  
      else {
        player.play();
        if(!audioElement!.src){
          audioElement!.src = player.trackUrl ?? '';
        }
        audioElement!.play();
        musicState.src = "/img/pause.svg";
      } 
    });

    previousButton?.addEventListener('click', function(){
      try {
        player.prevTrack();
        audioElement!.src = player.trackUrl ?? '';
        player.play();
        musicState!.src = "/img/pause.svg";
        renderPlaylist();
        audioElement!.play();
      }
      catch(error){
        console.error('não há albuns')
      }
    });

    audioElement?.addEventListener('ended', () => nextTrack());

    nextButton?.addEventListener('click', () => nextTrack());

    function nextTrack(){
      try {
        player.nextTrack();
        audioElement!.src = player.trackUrl ?? '';
        player.play();
        musicState!.src = "/img/pause.svg";
        renderPlaylist();
        audioElement!.play();
      }
      catch(error){
        console.error('não há albuns')
      }
    }

    function renderPlaylist() {
      const playlistHtml = PlaylistView(player.playlist, player.albumIndex, player._trackIndex);
      const playlistDiv = document.querySelector<HTMLDivElement>(".player_playlist-view");
      playlistDiv!.innerHTML = playlistHtml;
    }
  })

  return html`
    <div class="player_container">
      <div class="player_playlist-view">
        ${player.playlist &&
        `${PlaylistView(player.playlist, player.albumIndex, player._trackIndex)}`
        }
      </div>
      
      <audio id="audio_player"></audio>
      
      <div class="player_control">
        <img id="player_previous-button" src="/img/prev.svg"/>
        <img id="player_state-playing" src="/img/play.svg"/>
        <img id="player_next-button" src="/img/next.svg"/>
      </div>
    </div>
  `;
}
