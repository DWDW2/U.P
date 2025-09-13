import axios, { type AxiosResponse } from 'axios';
import type { DetectionResponse, ApiError } from '../types/api';

const API_BASE_URL = 'http://localhost:3005';

class ApiService {
    private scratchDentApi = axios.create({
        baseURL: `${API_BASE_URL}/car-scratch-and-dent`,
        timeout: 30000,
    });

    private dirtyCleanApi = axios.create({
        baseURL: `${API_BASE_URL}/car-dirty-clean`,
        timeout: 30000,
    });

    async uploadImageForScratchDent(file: File): Promise<DetectionResponse> {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response: AxiosResponse<DetectionResponse> = await this.scratchDentApi.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async detectFromUrlForScratchDent(imageUrl: string): Promise<DetectionResponse> {
        try {
            const response: AxiosResponse<DetectionResponse> = await this.scratchDentApi.post('/url', {
                imageUrl,
            });
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async checkScratchDentHealth(): Promise<{ status: string; message: string }> {
        try {
            const response = await this.scratchDentApi.post('/health');
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async uploadImageForDirtyClean(file: File): Promise<DetectionResponse> {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response: AxiosResponse<DetectionResponse> = await this.dirtyCleanApi.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async detectFromUrlForDirtyClean(imageUrl: string): Promise<DetectionResponse> {
        try {
            const response: AxiosResponse<DetectionResponse> = await this.dirtyCleanApi.post('/url', {
                imageUrl,
            });
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async checkDirtyCleanHealth(): Promise<{ status: string; message: string }> {
        try {
            const response = await this.dirtyCleanApi.post('/health');
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    async uploadImage(file: File): Promise<DetectionResponse> {
        return this.uploadImageForScratchDent(file);
    }

    async detectFromUrl(imageUrl: string): Promise<DetectionResponse> {
        return this.detectFromUrlForScratchDent(imageUrl);
    }

    async checkHealth(): Promise<{ status: string; message: string }> {
        return this.checkScratchDentHealth();
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
