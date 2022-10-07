export interface ITrack {
    album:IAlbum;
    artists:IArtist[];
    disc_number:number;
    duration_ms:number;
    explicit:boolean;
    href:string;
    id:string;
    name:string;
    popularity:number;
    track_number:number;
    type:string;
    uri:string;
}

export interface IRecentlyPlayed  {
    context:{
        href:string;
        type:string;
        uri:string;
    }
    played_at:string | Date;
    track:ITrack;
}

export interface IAlbum {
    album_type:string;
    artists:IArtist[];
    href:string;
    id:string;
    images:IImage[];
    name:string;
    release_date:string;
    release_date_precision:string;
    total_tracks:number;
    type:string;
    uri:string;

}

export interface IImage {
    height:number;
    url:string;
    width:number;
}

export interface IArtist {
    href:string;
    id:string;
    name:string;
    type:string;
    uri:string;
}