import {html, mounted} from '../../utils';
import albums from '~/mocks/albums.json';
import {AlbumView} from '../Album';
import "./Playlist.css";

export function PlaylistView(playlist: PlaylistType, albumIndex: number, trackIndex:number){

  mounted(function (){
    const btnAddAlbum = document.querySelector<HTMLButtonElement>('.playlist__btn_add-album');

    btnAddAlbum!.addEventListener('click', function(){
      const amountAlbums = playlist.albums?.length ?? 0;

      const nextAlbum = albums[amountAlbums]; 

      if(!nextAlbum){
        alert('Não existe um próximo album');
        return;
      }

      playlist.addAlbum(nextAlbum);

      let toAppend = html`
        ${playlist.albums?.length >= 0 ? 
        playlist.albums.map((album, index) => (
          `${AlbumView(album, index === albumIndex, trackIndex)}`
        )).join(" ")
        :
        `Playlist vazia`
      }
      `;

      const playlistSection = document.querySelector<HTMLDivElement>('.playlist__album_section');
      playlistSection!.innerHTML = toAppend;
    });


  })

  return html`
      <section class="playlist__album_section">
        ${playlist.albums?.length >= 0 ? 
        playlist.albums.map((album, index) => (
          `${AlbumView(album, index === albumIndex, trackIndex)}`
          )).join(" ")
          :
          `<p style="text-align: center; margin-top: 2rem;">Playlist vazia</p>`
        }
      </section>
      
      <section class="playlist__div-button">
        <button class="playlist__btn_add-album">+</button>
      </section>
  `;
}