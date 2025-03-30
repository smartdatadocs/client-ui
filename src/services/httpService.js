export const HttpService ={


    async get(url,baseURL) {
        try {
          const response = await fetch(baseURL + url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const text = await response.text();
          return text ? JSON.parse(text) : {};
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }

};