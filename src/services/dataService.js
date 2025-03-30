import { HttpService } from './httpService.js';

export const dataService = {

  

  async getAdminAppDetails(org){
    const rootAdminUrl = import.meta.env.VITE_ROOT_ADMIN_URL;;
    try {
      const data = await HttpService.get('/api/getAdminUIByOrganization/'+org, rootAdminUrl);
    
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },  
  async getOranizationHiearachy(port){
    try {
      const data = await HttpService.get('/api/data', 'http://localhost:'+port);
    
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  async getAllMetadata() {
    try {
      const data = await HttpService.get('/api/metadata/getAllMetadata');
    
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  async saveMetaData(data) {
    try {
      const response = await HttpService.post('/api/metadata/saveMetadata', data);
      // Process the response as needed
      return response;
    } catch (error) {
      console.error('Error sending data:', error);
      throw error;
    }
  },

  async getData() {
    try {
      const data = await HttpService.get('/api/data');

    
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  async saveData(data) {
    try {
      const response = await HttpService.post('/api/data', data);
      // Process the response as needed
      return response;
    } catch (error) {
      console.error('Error sending data:', error);
      throw error;
    }
  },

  processSubscribedData(data) {
    // Implement your data processing logic here
    if (Array.isArray(data)) {
      // Filter the data to include only subscribed items
      return data.filter(item => item.subscribed);
    }
    // If data is not an array, return it as is
    return data;
  }
};

export default dataService;