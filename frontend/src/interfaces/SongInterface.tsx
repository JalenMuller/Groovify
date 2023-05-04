interface SongInterface {
    id: number;
    name: string;
    artist: string;
    features: string;
    release_date: number;
    length: number;
    cover_path: string;
    song_path: string;
    album_id?: number;
    album_order?: number;
    album_title?: string;
    // updated_at: string;
    // created_at: string;
}
export type { SongInterface as Song };
