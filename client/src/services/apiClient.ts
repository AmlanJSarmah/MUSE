import axios from 'axios';
import type { Playlist, RecommendationResponse } from '../types/api';
import { mockPlaylist, mockRecommendations } from './mockData';

const USE_MOCK = true;

export const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
});

export const playlistService = {
    getPlaylistById: async (id: string): Promise<Playlist> => {
        if (USE_MOCK) return Promise.resolve(mockPlaylist);
        const res = await apiClient.get<Playlist>(`/playlists/${id}`);
        return res.data;
    },
    getRecommendations: async (): Promise<RecommendationResponse> => {
        if (USE_MOCK) return Promise.resolve(mockRecommendations);
        const res = await apiClient.get<RecommendationResponse>('/recommendations');
        return res.data;
    }
};