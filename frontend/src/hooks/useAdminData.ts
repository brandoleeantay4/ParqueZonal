import { useState, useEffect } from "react";
import { apiService, type HeroSlide, type Wonder, type Animal, type PriceOption, type GroupImage, type MapData } from "@/lib/adminStorage";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(apiService.isAuthenticated());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsAuthenticated(apiService.isAuthenticated());
  }, [apiService.isAuthenticated]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token } = await apiService.login({ email, password });
      apiService.setToken(token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiService.setToken(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
}

export function useHeroSlides() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSlides = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getHeroSlides();
      setSlides(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const add = async (slide: Omit<HeroSlide, "id">) => {
    try {
      await apiService.createHeroSlide(slide);
      await fetchSlides();
    } catch (err: any) {
      setError(err.message);
      throw err; // Re-throw to allow component to handle
    }
  };

  const update = async (id: number, slide: Partial<HeroSlide>) => {
    try {
      await apiService.updateHeroSlide(id, slide);
      await fetchSlides();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id: number) => {
    try {
      await apiService.deleteHeroSlide(id);
      await fetchSlides();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { slides, loading, error, add, update, remove, refresh: fetchSlides };
}

export function useWonders() {
  const [wonders, setWonders] = useState<Wonder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWonders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getWonders();
      setWonders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWonders();
  }, []);

  const add = async (wonder: Omit<Wonder, "id">) => {
    try {
      await apiService.createWonder(wonder);
      await fetchWonders();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id: number, wonder: Partial<Wonder>) => {
    try {
      await apiService.updateWonder(id, wonder);
      await fetchWonders();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id: number) => {
    try {
      await apiService.deleteWonder(id);
      await fetchWonders();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { wonders, loading, error, add, update, remove, refresh: fetchWonders };
}

export function useAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAnimals();
      setAnimals(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const add = async (animal: Omit<Animal, "id">) => {
    try {
      await apiService.createAnimal(animal);
      await fetchAnimals();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id: number, animal: Partial<Animal>) => {
    try {
      await apiService.updateAnimal(id, animal);
      await fetchAnimals();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id: number) => {
    try {
      await apiService.deleteAnimal(id);
      await fetchAnimals();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { animals, loading, error, add, update, remove, refresh: fetchAnimals };
}

export function usePriceOptions() {
  const [priceOptions, setPriceOptions] = useState<PriceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPriceOptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getPriceOptions();
      setPriceOptions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceOptions();
  }, []);

  const add = async (option: Omit<PriceOption, "id">) => {
    try {
      await apiService.createPriceOption(option);
      await fetchPriceOptions();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id: number, option: Partial<PriceOption>) => {
    try {
      await apiService.updatePriceOption(id, option);
      await fetchPriceOptions();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id: number) => {
    try {
      await apiService.deletePriceOption(id);
      await fetchPriceOptions();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { priceOptions, loading, error, add, update, remove, refresh: fetchPriceOptions };
}

export function useGroupImages() {
  const [groupImages, setGroupImages] = useState<GroupImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroupImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getGroupImages();
      setGroupImages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupImages();
  }, []);

  const add = async (image: Omit<GroupImage, "id">) => {
    try {
      await apiService.createGroupImage(image);
      await fetchGroupImages();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id: number, image: Partial<GroupImage>) => {
    try {
      await apiService.updateGroupImage(id, image);
      await fetchGroupImages();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id: number) => {
    try {
      await apiService.deleteGroupImage(id);
      await fetchGroupImages();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { groupImages, loading, error, add, update, remove, refresh: fetchGroupImages };
}

export function useMapData() {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMapData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getMapData();
      setMapData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  const update = async (data: Partial<MapData>) => {
    try {
      await apiService.updateMapData(data);
      await fetchMapData();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const toggleActive = async () => {
    if (mapData) {
      try {
        await apiService.updateMapData({ active: !mapData.active });
        await fetchMapData();
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    }
  };

  return { mapData, loading, error, update, toggleActive, refresh: fetchMapData };
}