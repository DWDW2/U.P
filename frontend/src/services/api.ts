import axios, { type AxiosResponse } from 'axios';
import type { DetectionResponse, ApiError } from '../types/api';

const API_BASE_URL = 'http://localhost:3005/car-detection';

class ApiService {
    private api = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
    });

    async uploadImage(file: File): Promise<DetectionResponse> {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response: AxiosResponse<DetectionResponse> = await this.api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async detectFromUrl(imageUrl: string): Promise<DetectionResponse> {
        try {
            const response: AxiosResponse<DetectionResponse> = await this.api.post('/url', {
                imageUrl,
            });
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async checkHealth(): Promise<{ status: string; message: string }> {
        try {
            const response = await this.api.post('/health');
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): ApiError {
        if (error.response) {
            return {
                message: error.response.data.message || 'An error occurred',
                statusCode: error.response.status,
            };
        } else if (error.request) {
            return {
                message: 'Network error - please check your connection',
                statusCode: 0,
            };
        } else {
            return {
                message: error.message || 'An unexpected error occurred',
                statusCode: 0,
            };
        }
    }
}

export const apiService = new ApiService();
