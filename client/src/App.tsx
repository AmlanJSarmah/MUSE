import { useState, useEffect } from 'react';
import type { Playlist } from './types/api';
import { playlistService } from './services/apiClient';
import { PlayerBar } from './components/PlayerBar';

export default function App() {
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

    useEffect(() => {
        playlistService.getPlaylistById('default').then(setPlaylist);
    }, []);

    const handleNext = () => {
        if (!playlist) return;
        setCurrentSongIndex((prev) => (prev + 1) % playlist.songs.length);
    };

    const handlePrev = () => {
        if (!playlist) return;
        setCurrentSongIndex((prev) => (prev - 1 + playlist.songs.length) % playlist.songs.length);
    };

    return (
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#ffffff', padding: '32px 24px 100px 24px', fontFamily: 'sans-serif' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ margin: 0, fontSize: '28px' }}>🎬 MovieMusic (Muse)</h1>
            </header>

            {playlist && (
                <main>
                    <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
                        {playlist.movie?.posterUrl && (
                            <img src={playlist.movie.posterUrl} alt={playlist.name} style={{ width: '160px', height: '220px', borderRadius: '8px', objectFit: 'cover' }} />
                        )}
                        <div>
                            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#1db954', fontWeight: 'bold' }}>{playlist.source}</span>
                            <h2 style={{ fontSize: '32px', margin: '8px 0' }}>{playlist.name}</h2>
                            <p style={{ color: '#aaa', maxWidth: '600px' }}>{playlist.description}</p>
                        </div>
                    </div>

                    <section>
                        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '8px' }}>Soundtrack Tracks</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                            {playlist.songs.map((song, idx) => (
                                <div
                                    key={song.youtubeVideoId}
                                    onClick={() => setCurrentSongIndex(idx)}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        borderRadius: '6px',
                                        backgroundColor: idx === currentSongIndex ? '#222' : '#141414',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div>
                                        <strong>{idx + 1}. {song.title}</strong>
                                        <div style={{ fontSize: '12px', color: '#888' }}>{song.artist}</div>
                                    </div>
                                    <span style={{ color: '#888' }}>
                                        {Math.floor(song.durationSeconds / 60)}:{(song.durationSeconds % 60).toString().padStart(2, '0')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            )}

            {playlist && (
                <PlayerBar
                    currentTrack={playlist.songs[currentSongIndex]}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </div>
    );
}