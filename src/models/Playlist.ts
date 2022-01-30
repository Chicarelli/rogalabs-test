import { Album } from "./Album";
export class Playlist implements PlaylistType {
  _albums!: AlbumType[];

  get albums(){
    return this._albums;
  }

  addAlbum(data: AlbumData) {
    this._albums = [... this._albums || [], (new Album(data))];
  }

  isFirstAlbum(index: number): boolean {
    return index === 0 ? true : false;
  }

  isLastAlbum(index: number): boolean {
    return this._albums.length - 1 === index ? true : false;
  }
}
