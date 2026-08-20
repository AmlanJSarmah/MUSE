import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { RecommendationFeed } from './components/RecommendationFeed';
import { MovieSearch } from './components/MovieSearch';
import { PlaylistDetailPage } from './pages/PlaylistDetailPage';
import { PlayerProvider } from './context/PlayerContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlayerBar } from './components/PlayerBar';
import { AuthModal } from './components/AuthModal';

const pageStyle = { backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '32px 24px 100px', fontFamily: 'sans-serif' };

function Header() {
    const { isAuthenticated, logout } = useAuth();
    const [authOpen, setAuthOpen] = useState(false);

    return (
        <>
            <header style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                        <h1 style={{ margin: 0, fontSize: 28 }}>🎬 MovieMusic (Muse)</h1>
                    </Link>
                    <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <Link to="/" style={{ color: '#fff', textDecoration: 'none', padding: '8px 12px', background: '#141414', borderRadius: 6 }}>Discover</Link>
                        <Link to="/search" style={{ color: '#fff', textDecoration: 'none', padding: '8px 12px', background: '#141414', borderRadius: 6 }}>Search</Link>
                        {isAuthenticated ? (
                            <button onClick={logout} style={{ color: '#fff', background: '#333', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}>Logout</button>
                        ) : (
                            <button onClick={() => setAuthOpen(true)} style={{ color: '#000', background: '#1db954', border: 'none', padding: '8px 12px', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
                        )}
                    </nav>
                </div>
            </header>
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PlayerProvider>
                    <div style={pageStyle}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<RecommendationFeed />} />
                            <Route path="/search" element={<MovieSearch />} />
                            <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
                        </Routes>
                        <PlayerBar />
                    </div>
                </PlayerProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;