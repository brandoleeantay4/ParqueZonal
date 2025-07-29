const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// Tipos de datos para el sistema de administración
export interface HeroSlide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  active: boolean;
}

export interface Wonder {
  id: number;
  name: string;
  image: string;
  description: string;
  fullDescription: string;
  active: boolean;
}

export interface Animal {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  image: string;
  active: boolean;
}

export interface PriceOption {
  id: number;
  price: number;
  category: string;
  ageRange: string;
  description?: string;
  color: string;
  active: boolean;
}

export interface GroupImage {
  id: number;
  image: string;
  caption: string;
  active: boolean;
}

export interface MapData {
  id: number;
  image: string;
  active: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('jwtToken');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  async request<T>(endpoint: string, method: string, data?: any, isFormData = false): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {};

    if (this.token) {
      headers['x-auth-token'] = this.token;
    }

    let body: BodyInit | undefined;
    if (data) {
      if (isFormData) {
        body = data;
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
      }
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json() as Promise<T>;
  }

  // Auth
  async login(credentials: any): Promise<{ token: string; user: User }> {
    return this.request('/auth/login', 'POST', credentials);
  }

  async register(userData: any): Promise<User> {
    return this.request('/auth/register', 'POST', userData);
  }

  // Hero Slides
  async getHeroSlides(): Promise<HeroSlide[]> {
    return this.request('/hero-slides', 'GET');
  }

  async createHeroSlide(slide: Omit<HeroSlide, 'id'>): Promise<HeroSlide> {
    return this.request('/hero-slides', 'POST', slide);
  }

  async updateHeroSlide(id: number, slide: Partial<HeroSlide>): Promise<HeroSlide> {
    return this.request(`/hero-slides/${id}`, 'PUT', slide);
  }

  async deleteHeroSlide(id: number): Promise<{ message: string }> {
    return this.request(`/hero-slides/${id}`, 'DELETE');
  }

  // Wonders
  async getWonders(): Promise<Wonder[]> {
    return this.request('/wonders', 'GET');
  }

  async createWonder(wonder: Omit<Wonder, 'id'>): Promise<Wonder> {
    return this.request('/wonders', 'POST', wonder);
  }

  async updateWonder(id: number, wonder: Partial<Wonder>): Promise<Wonder> {
    return this.request(`/wonders/${id}`, 'PUT', wonder);
  }

  async deleteWonder(id: number): Promise<{ message: string }> {
    return this.request(`/wonders/${id}`, 'DELETE');
  }

  // Animals
  async getAnimals(): Promise<Animal[]> {
    return this.request('/animals', 'GET');
  }

  async createAnimal(animal: Omit<Animal, 'id'>): Promise<Animal> {
    return this.request('/animals', 'POST', animal);
  }

  async updateAnimal(id: number, animal: Partial<Animal>): Promise<Animal> {
    return this.request(`/animals/${id}`, 'PUT', animal);
  }

  async deleteAnimal(id: number): Promise<{ message: string }> {
    return this.request(`/animals/${id}`, 'DELETE');
  }

  // Price Options
  async getPriceOptions(): Promise<PriceOption[]> {
    return this.request('/price-options', 'GET');
  }

  async createPriceOption(option: Omit<PriceOption, 'id'>): Promise<PriceOption> {
    return this.request('/price-options', 'POST', option);
  }

  async updatePriceOption(id: number, option: Partial<PriceOption>): Promise<PriceOption> {
    return this.request(`/price-options/${id}`, 'PUT', option);
  }

  async deletePriceOption(id: number): Promise<{ message: string }> {
    return this.request(`/price-options/${id}`, 'DELETE');
  }

  // Group Images
  async getGroupImages(): Promise<GroupImage[]> {
    return this.request('/group-images', 'GET');
  }

  async createGroupImage(image: Omit<GroupImage, 'id'>): Promise<GroupImage> {
    return this.request('/group-images', 'POST', image);
  }

  async updateGroupImage(id: number, image: Partial<GroupImage>): Promise<GroupImage> {
    return this.request(`/group-images/${id}`, 'PUT', image);
  }

  async deleteGroupImage(id: number): Promise<{ message: string }> {
    return this.request(`/group-images/${id}`, 'DELETE');
  }

  // Map Data
  async getMapData(): Promise<MapData> {
    return this.request('/map-data', 'GET');
  }

  async updateMapData(data: Partial<MapData>): Promise<MapData> {
    return this.request('/map-data', 'PUT', data);
  }

  // Upload Image
  async uploadImage(formData: FormData): Promise<{ filePath: string }> {
    return this.request('/upload', 'POST', formData, true);
  }
}

export const apiService = new ApiService();