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
    const progressBar = document.querySelector<HTMLDivElement>('.player__music-progress');
    let timer: NodeJS.Timeout;

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

    previousButton?.addEventListener('click', function() {
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

    audioElement?.addEventListener('playing', function() {
      makeProgressBar(this.duration);
    })

    audioElement?.addEventListener('pause', () => clearTimeout(timer));

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

    function makeProgressBar(duration: number) :void{
      if(!audioElement) return;
      const currentTime = audioElement?.currentTime;
      const percent = Math.min(10 / duration * currentTime * 10, 100);
      
      progressBar!.style.width = `${percent}%`;

      if(percent < 100) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          makeProgressBar(duration);
        }, 500)
      }
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
      
      <div class="player__controllers">

        <div class="player__music-progress_div">
          <div class="player__music-progress"></div>
        </div>

        <section class="player_control">
          <img id="player_previous-button" src="/img/prev.svg"/>
          <img id="player_state-playing" src="/img/play.svg"/>
          <img id="player_next-button" src="/img/next.svg"/>
        </section>

      </div>
    </div>
  `;
}
