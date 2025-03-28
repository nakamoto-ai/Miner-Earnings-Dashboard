import axios from 'axios';

const API_BASE_URL = 'http://165.22.185.94:9999/api/v1';

export interface EarningEntry {
  people_id: number;
  tao_earned: number;
  tao_price: number;
}

export interface EarningSubmissionRequest {
  earnings: EarningEntry[]
}

export interface ApiResponse {
  message: string;
  success?: boolean;
}

export interface Miner {
  id: number;
  name: string;
  created_at: string;
}

export interface MinerEarnings {
  people_id: number;
  tao_earned: number;
  tao_price: number;
  id: number;
  created_at: string;
}

export interface PersonEntry {
  name: string;
}

export interface PeopleSubmissionRequest {
  people: PersonEntry[];
}

export const getMiners = async (): Promise<Miner[]> => {
  try {
    const response = await axios.get<Miner[]>(`${API_BASE_URL}/people`);
    return response.data;
  } catch (error) {
    console.error('Error fetching miners:', error);
    throw error;
  }
};

export const getEarnings = async (date: string): Promise<MinerEarnings[]> => {
  try {
    const response = await axios.get<MinerEarnings[]>(`${API_BASE_URL}/earnings?since=${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching miner earning data:', error);
    throw error;
  }
}

export const submitEarnings = async (
  data: EarningSubmissionRequest,
  apiKey: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      `${API_BASE_URL}/earnings`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.message) {
        console.error('Error submitting earnings:', error.response?.status, error.response?.data);
        throw new Error(`API Error (${error.response?.status}): ${JSON.stringify(error.response?.data)}`);
      } else if (error.request) {
        console.error('Error submitting earnings: No response received');
        throw new Error('No response received from server');
      } else {
        console.error('Error submitting earnings:', error.message);
        throw new Error(`Request configuration error: ${error.message}`)
      }
    } else {
      console.error('Error submitting earnings:', error);
      throw error;
    }
  }
}

export const addPeople = async (
  data: PeopleSubmissionRequest,
  apiKey: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      `${API_BASE_URL}/people`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error adding people:', error.response?.status, error.response?.data);
        throw new Error(`API Error (${error.response?.status}): ${JSON.stringify(error.response?.data)}`);
      } else if (error.request) {
        console.error('Error adding people: No response received');
        throw new Error('No response received from server');
      } else {
        console.error('Error adding people:', error.message);
        throw new Error(`Request configuration error: ${error.message}`);
      }
    } else {
      console.error('Error adding people:', error);
      throw error;
    }
  }
}