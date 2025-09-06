import axios from 'axios';

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  location: string;
  timestamp: Date;
}

export interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  location: string;
  timestamp: Date;
}

export interface EnvironmentalContext {
  weather: WeatherData;
  airQuality: AirQualityData;
  season: string;
  timeOfDay: string;
  location: string;
}

export interface RecyclingInfo {
  centerName: string;
  address: string;
  distance: number;
  acceptedMaterials: string[];
  hours: string;
  phone: string;
}

class EnvironmentalDataService {
  private weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  private airQualityApiKey = process.env.REACT_APP_AIR_QUALITY_API_KEY;

  // Get weather data for a location
  async getWeatherData(location: string): Promise<WeatherData> {
    try {
      if (!this.weatherApiKey) {
        // Return mock data for development
        return this.getMockWeatherData(location);
      }

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.weatherApiKey}&units=metric`
      );

      return {
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        condition: response.data.weather[0].main,
        windSpeed: response.data.wind.speed,
        location: response.data.name,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getMockWeatherData(location);
    }
  }

  // Get air quality data for a location
  async getAirQualityData(location: string): Promise<AirQualityData> {
    try {
      if (!this.airQualityApiKey) {
        // Return mock data for development
        return this.getMockAirQualityData(location);
      }

      const response = await axios.get(
        `https://api.waqi.info/feed/${location}/?token=${this.airQualityApiKey}`
      );

      const data = response.data.data;
      return {
        aqi: data.aqi,
        pm25: data.iaqi.pm25?.v || 0,
        pm10: data.iaqi.pm10?.v || 0,
        o3: data.iaqi.o3?.v || 0,
        no2: data.iaqi.no2?.v || 0,
        so2: data.iaqi.so2?.v || 0,
        co: data.iaqi.co?.v || 0,
        location: data.city.name,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      return this.getMockAirQualityData(location);
    }
  }

  // Get comprehensive environmental context
  async getEnvironmentalContext(location: string): Promise<EnvironmentalContext> {
    const [weather, airQuality] = await Promise.all([
      this.getWeatherData(location),
      this.getAirQualityData(location)
    ]);

    return {
      weather,
      airQuality,
      season: this.getSeason(),
      timeOfDay: this.getTimeOfDay(),
      location
    };
  }

  // Get local recycling centers
  async getRecyclingCenters(location: string): Promise<RecyclingInfo[]> {
    try {
      // Mock data for development - in production, you'd use Google Places API or similar
      return [
        {
          centerName: "Green Earth Recycling Center",
          address: "123 Eco Street, " + location,
          distance: 2.5,
          acceptedMaterials: ["Plastic", "Paper", "Glass", "Metal", "Electronics"],
          hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
          phone: "(555) 123-4567"
        },
        {
          centerName: "Community Recycling Hub",
          address: "456 Green Avenue, " + location,
          distance: 4.2,
          acceptedMaterials: ["Plastic", "Paper", "Glass", "Compost"],
          hours: "Daily: 7AM-8PM",
          phone: "(555) 987-6543"
        }
      ];
    } catch (error) {
      console.error('Error fetching recycling centers:', error);
      return [];
    }
  }

  // Get environmental tips based on current conditions
  getEnvironmentalTips(context: EnvironmentalContext): string[] {
    const tips: string[] = [];

    // Weather-based tips
    if (context.weather.temperature > 25) {
      tips.push("🌡️ It's hot today! Consider using fans instead of AC to save energy.");
    } else if (context.weather.temperature < 10) {
      tips.push("❄️ It's cold! Layer up with warm clothes before turning on the heater.");
    }

    if (context.weather.humidity > 70) {
      tips.push("💧 High humidity detected! Open windows for natural ventilation.");
    }

    // Air quality tips
    if (context.airQuality.aqi > 100) {
      tips.push("😷 Poor air quality today. Consider staying indoors or wearing a mask.");
    } else if (context.airQuality.aqi < 50) {
      tips.push("🌬️ Great air quality! Perfect day for outdoor activities.");
    }

    // Time-based tips
    if (context.timeOfDay === 'morning') {
      tips.push("🌅 Good morning! Start your day with energy-saving habits.");
    } else if (context.timeOfDay === 'evening') {
      tips.push("🌆 Evening time! Remember to turn off unnecessary lights.");
    }

    // Season-based tips
    if (context.season === 'summer') {
      tips.push("☀️ Summer season! Use natural light and ventilation when possible.");
    } else if (context.season === 'winter') {
      tips.push("❄️ Winter season! Insulate your home to reduce heating costs.");
    }

    return tips;
  }

  // Helper methods
  private getSeason(): string {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }

  // Mock data for development
  private getMockWeatherData(location: string): WeatherData {
    return {
      temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      location,
      timestamp: new Date()
    };
  }

  private getMockAirQualityData(location: string): AirQualityData {
    return {
      aqi: Math.floor(Math.random() * 150) + 20, // 20-170 AQI
      pm25: Math.floor(Math.random() * 50) + 10, // 10-60 μg/m³
      pm10: Math.floor(Math.random() * 80) + 20, // 20-100 μg/m³
      o3: Math.floor(Math.random() * 100) + 20, // 20-120 μg/m³
      no2: Math.floor(Math.random() * 60) + 10, // 10-70 μg/m³
      so2: Math.floor(Math.random() * 30) + 5, // 5-35 μg/m³
      co: Math.floor(Math.random() * 5) + 1, // 1-6 mg/m³
      location,
      timestamp: new Date()
    };
  }
}

export const environmentalDataService = new EnvironmentalDataService();
export default environmentalDataService;
