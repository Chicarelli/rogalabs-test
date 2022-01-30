export class Album implements AlbumType {
  _artist: string;
  _cover: string;
  _title: string;
  _tracks: TrackData[];

  constructor(album : AlbumData){
    this._cover = album.cover;
    this._title = album.title;
    this._artist = album.artist;
    this._tracks = album.tracks;
  }

  get artist(){
    return this._artist;
  }

  get cover(){
    return this._cover;
  }

  get title(){
    return this._title;
  }

  get tracks(){
    return this._tracks;
  }
 
  getUrlFromIndex(index: number): string | null {
    return this._tracks[index]?.url || null;
  }
  isFirstTrack(index: number): boolean {
    return index === 0 ? true : false;
  }
  isLastTrack(index: number): boolean {
    return this._tracks?.length - 1 === index ? true : false;
  }
}
