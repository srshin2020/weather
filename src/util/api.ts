class Api {
  private readonly API_KEY = import.meta.env.VITE_API_KEY;
  private static instance: Api;
  private constructor() {}
  public static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  public async getLatAndLon(city: string) {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.API_KEY}`,
    );
    return response.json();
  }

  public async getWeather(city: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=metric&lang=kr`,
      );
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getforecast5days3hours(city: string) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.API_KEY}&units=metric&lang=kr`,
    );
    return response.json();
  }
}

const api = Api.getInstance();
// singleton pattern
export default api;
