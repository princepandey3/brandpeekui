import type { Brand } from '@/types/brand';

const MOCKAPI_BASE_URL = 'https://68978796250b078c20422e42.mockapi.io/api/v1';

class BrandService {
  async getBrands(): Promise<Brand[]> {
    try {
      const response = await fetch(`${MOCKAPI_BASE_URL}/brands`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw new Error('Failed to fetch brands from API');
    }
  }

  async getBrandById(id: number): Promise<Brand> {
    try {
      const response = await fetch(`${MOCKAPI_BASE_URL}/brands/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching brand:', error);
      throw new Error('Failed to fetch brand details from API');
    }
  }
}

export const brandService = new BrandService();