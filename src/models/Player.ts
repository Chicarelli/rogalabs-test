import { Playlist } from "./Playlist";

export class Player implements PlayerType {
  _album!: AlbumType | null;
  _playing!: boolean;
  _playlist: PlaylistType;
  _trackUrl!: string | null;
  _albumIndex: number;
  _trackIndex: number;

  constructor(){
    this._album = null;
    this._trackUrl = null;
    this._albumIndex = 0;
    this._trackIndex = 0;
    this._playing = false;
    this._playlist = new Playlist();
  }

  get album(): AlbumType | null{
    return this._album;
  }

  set album(newAlbum: AlbumType | null){
    this._album = newAlbum;
  }

  get playing(){
    return this._playing;
  }

  set playing(state: boolean){
    this._playing = state;
  }

  get playlist(){
    return this._playlist;
  }

  set playlist(playlist: PlaylistType){
    this._playlist = playlist;
  }

  get trackUrl(){
    return this._trackUrl;
  }

  set trackUrl(track: string | null){
    this._trackUrl = track;
  }

  get albumIndex(){
    return this._albumIndex;
  }

  set albumIndex(index: number){
    if(this._playlist.albums && this._playlist.albums[index]){
      this._albumIndex = index;
      this._album = this._playlist.albums[index];
    } else {
      this.albumIndex = 0;
    }
  }

  get trackIndex(){
    return this._trackIndex;
  }

  set trackIndex(index: number){
    if(this._album === null){
      this._trackIndex = 0;
      return;
    }

    if(this._album.tracks[index]){
      this._trackIndex = index;
      this._trackUrl = this._album.tracks[index].url;
    }

  }

  play(): void { 
    this._playing = true;

    if(this._album === null) {
      const album = this._playlist.albums[0];
      this._album = album;
      this._trackUrl = album.tracks[0].url;
    }
  }

  pause(): void {
    this.playing = false;
  }

  nextTrack(): void {
    if(this._album === null && !this._playlist.albums[this._albumIndex]){
      throw new Error("No albums");
    } else if (this._album === null){
      this._album = this._playlist.albums[this._albumIndex];
    }

    if(this._album.tracks[this._trackIndex + 1]){
      this._trackIndex += 1;
      this._trackUrl = this._album.tracks[this._trackIndex].url;
      return;
    } 

    else if(this._playlist.albums[this._albumIndex + 1]){
      this._albumIndex += 1;
      this._album = this._playlist.albums[this._albumIndex];
      this._trackIndex = 0;
      this._trackUrl = this._album.tracks[this._trackIndex].url;
      return;
    } 

    if(this._playlist.albums[0]){
      this._album = this._playlist.albums[0];
      this._albumIndex = 0;
      this._trackIndex = 0;
      this._trackUrl = this._album.tracks[this._trackIndex].url;
    }
  }

  prevTrack(): void {
    if(this._album === null && !this._playlist.albums[this._albumIndex]){
      throw new Error("No albums");
    } else if (this._album === null){
      this._album = this._playlist.albums[this._albumIndex];
    }

    if(this._album.tracks[this._trackIndex - 1]){
      this._trackIndex -= 1;
      this._trackUrl = this._album.tracks[this._trackIndex].url
      return;
    }

    if(this._albumIndex >= 1){
      this._album = this._playlist.albums[this._albumIndex - 1];
      this._albumIndex -= 1;
      this.setLastTrack();
      return;
    }

    if(this._albumIndex === 0){
      this.setLastAlbum();
      this.setLastTrack();     
      return
    }
  }

  setLastTrack():void {
    if(this._album === null) return;
    const amountTracks = this._album.tracks.length;
    this._trackIndex = amountTracks - 1;
    this._trackUrl = this._album.tracks[this._trackIndex].url;
  }

  setLastAlbum(): void {
    if(this._album === null) return;

    const amountAlbums = this._playlist.albums.length;
    this._albumIndex = amountAlbums - 1;
    this._album = this._playlist.albums[this._albumIndex];
    return;
  }
  
}
