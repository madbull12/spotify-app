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

export interface IPlaylist {
    collaborative:boolean;
    description:string;
    id:string;
    images:IImage[];
    name:string;
    owner:{
        display_name:string;
        id:string;
        type:string;
        uri:string;
    };
    primary_color:null | string;
    snapshot_id:string;
    tracks:ITrack[];
    type:string;
    uri:string;
}

export interface IEpisode {
    description:string;
    duration_ms:string;
    explicit:boolean;
    id:string;
    images:IImage[];
    release_date:string;
    release_date_precision:string;
    type:string;
    uri:string;
    language:string;
    languages:string[];
    is_playable:boolean;
    html_description:string;

}

export interface ISearchResult {
    albums:{
        items:IAlbum[]
    };
    artists:{
        items:IArtist[]
    };
    tracks:{
        items:ITrack[]
    };
    playlists:{
        items:IPlaylist[]
    }

}

export interface ICategory {
    icons:IImage[];
    id:string;
    name:string;
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