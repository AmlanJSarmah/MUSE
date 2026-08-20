import axios from 'axios';
import type { ApiResponse, MovieSummary, Playlist, RecommendationResponse } from '../types/api';
import { mockPlaylist, mockRecommendations } from './mockData';

const USE_MOCK = true;

export const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to all requests if present
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* =========================================================
   AUTH & USER SERVICE
   ========================================================= */
export const authService = {
    login: async (credentials: { email: string; passwordHash: string }) => {
        if (USE_MOCK) {
            return { token: 'mock-jwt-token-xyz', userId: 'user-uuid-101' };
        }
        const response = await apiClient.post('/users/login', credentials);
        return response.data;
    },
    register: async (data: { email: string; passwordHash: string; username: string }) => {
        if (USE_MOCK) {
            return { token: 'mock-jwt-token-xyz', userId: 'user-uuid-101' };
        }
        const response = await apiClient.post('/users/register', data);
        return response.data;
    }
};

/* =========================================================
   MOVIE SERVICE
   ========================================================= */
export const movieService = {
    searchMovies: async (query: string): Promise<ApiResponse<MovieSummary>> => {
        if (USE_MOCK) {
            const movies: MovieSummary[] = [
                { id: 'movie-uuid-999', title: 'Interstellar', year: 2014, posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400' },
                { id: 'movie-uuid-888', title: 'Oppenheimer', year: 2023, posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400' },
                { id: 'movie-uuid-777', title: 'Inception', year: 2010, posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400' },
            ];
            const filtered = movies.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
            return { data: filtered, pagination: { page: 1, pageSize: filtered.length, totalCount: filtered.length, totalPages: filtered.length > 0 ? 1 : 0 } };
        }
        const res = await apiClient.get<ApiResponse<MovieSummary>>('/movies/search', { params: { query } });
        return res.data;
    },

    generatePlaylist: async (movieId: string): Promise<Playlist> => {
        if (USE_MOCK) return mockPlaylist;
        const res = await apiClient.post<Playlist>(`/movies/${movieId}/generate-playlist`);
        return res.data;
    },
};

/* =========================================================
   PLAYLIST SERVICE
   ========================================================= */
export const playlistService = {
    getPlaylistById: async (id: string): Promise<Playlist> => {
        if (USE_MOCK) return mockPlaylist;
        const res = await apiClient.get<Playlist>(`/playlists/${id}`);
        return res.data;
    },

    savePlaylist: async (playlist: Partial<Playlist>): Promise<Playlist> => {
        if (USE_MOCK) return { ...mockPlaylist, ...playlist };
        const res = await apiClient.post<Playlist>('/playlists', playlist);
        return res.data;
    },

    getRecommendations: async (): Promise<RecommendationResponse> => {
        if (USE_MOCK) return mockRecommendations;
        const res = await apiClient.get<RecommendationResponse>('/recommendations');
        return res.data;
    },
};