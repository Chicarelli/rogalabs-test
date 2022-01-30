import {html} from '../../utils';
import {Album} from '../../models/Album';
import "./Album.css"

export function AlbumView(props: AlbumType, isAlbumSelected: boolean, trackIndex: number){
  const album = new Album(props);

  return html`
    <section class="album__container ${isAlbumSelected && 'album__container--selected'}"> 
      
      <section class="album__header">
        <img src="${album.cover}"/>
        <section class="album__header__info">
          <h2>${album.title}</h2>
          <p>${album.artist}</p>
        </section>
      </section>

      <section>
        <ol>
          ${album.tracks.map((track,index) => (
            `<li class=${isAlbumSelected && trackIndex === index && 'album__track--selected'}>${track.title}</li>`      
            )).join(" ")}
        </ol>
      </section>

    </section>
  `;
}
