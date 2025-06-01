
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, ArrowLeft, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherDisplayProps {
  location: string;
  onWeatherFetch: (weather: any) => void;
  onBack: () => void;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ 
  location, 
  onWeatherFetch, 
  onBack 
}) => {
  const [weather, setWeather] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate weather API call with mock data
    const fetchWeather = async () => {
      setIsLoading(true);
      
      // Mock weather data - in real app, this would call OpenWeatherMap API
      setTimeout(() => {
        const mockWeather = {
          temperature: Math.floor(Math.random() * 30) + 5, // 5-35°C
          condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
          rainProbability: Math.floor(Math.random() * 100),
          windSpeed: Math.floor(Math.random() * 30) + 5,
          description: 'Teilweise bewölkt mit gelegentlichen Sonnenstrahlen',
          humidity: Math.floor(Math.random() * 50) + 30,
          feelsLike: Math.floor(Math.random() * 30) + 5
        };
        
        setWeather(mockWeather);
        setIsLoading(false);
      }, 2000);
    };

    fetchWeather();
  }, [location]);

  const handleContinue = () => {
    if (weather) {
      onWeatherFetch(weather);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-16 h-16 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="w-16 h-16 text-blue-500" />;
      default:
        return <Cloud className="w-16 h-16 text-gray-500" />;
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'Sonnig';
      case 'rainy':
        return 'Regnerisch';
      default:
        return 'Bewölkt';
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full shadow-lg border-blue-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-900">Wetter wird abgerufen...</CardTitle>
          <CardDescription className="text-blue-600">{location}</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-blue-600">Aktuelle Wetterdaten werden geladen</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-blue-900 flex items-center justify-center gap-2">
          <Thermometer className="w-6 h-6" />
          Wettervorhersage
        </CardTitle>
        <CardDescription className="text-blue-600">{location}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Weather Display */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {weather && getWeatherIcon(weather.condition)}
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-900">{weather?.temperature}°C</h3>
            <p className="text-lg text-blue-600">{weather && getConditionText(weather.condition)}</p>
            <p className="text-sm text-blue-500 mt-2">{weather?.description}</p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <CloudRain className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-blue-600">Regenwahrscheinlichkeit</p>
            <p className="text-lg font-semibold text-blue-900">{weather?.rainProbability}%</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Wind className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-blue-600">Windgeschwindigkeit</p>
            <p className="text-lg font-semibold text-blue-900">{weather?.windSpeed} km/h</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Thermometer className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-blue-600">Gefühlte Temperatur</p>
            <p className="text-lg font-semibold text-blue-900">{weather?.feelsLike}°C</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Cloud className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-blue-600">Luftfeuchtigkeit</p>
            <p className="text-lg font-semibold text-blue-900">{weather?.humidity}%</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
          <Button
            onClick={handleContinue}
            className="flex-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            Outfit-Empfehlung erhalten
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
