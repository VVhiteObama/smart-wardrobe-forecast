
import React, { useState } from 'react';
import { LocationSearch } from '@/components/LocationSearch';
import { WeatherDisplay } from '@/components/WeatherDisplay';
import { OutfitRecommendation } from '@/components/OutfitRecommendation';
import { ColorSuggestions } from '@/components/ColorSuggestions';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [outfitData, setOutfitData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setCurrentStep(2);
  };

  const handleWeatherFetch = (weather: any) => {
    setWeatherData(weather);
    setCurrentStep(3);
  };

  const handleOutfitGenerate = (outfit: any) => {
    setOutfitData(outfit);
    setCurrentStep(4);
  };

  const resetApp = () => {
    setSelectedLocation('');
    setWeatherData(null);
    setOutfitData(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-900">WetterFit</h1>
            <p className="text-blue-600 text-sm">Dein smarter Outfit-Berater</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentStep >= step
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-100 text-blue-400'
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-12 h-1 mx-2 transition-all duration-300 ${
                    currentStep > step ? 'bg-blue-500' : 'bg-blue-100'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 1 && (
            <LocationSearch onLocationSelect={handleLocationSelect} />
          )}
          
          {currentStep === 2 && selectedLocation && (
            <WeatherDisplay 
              location={selectedLocation} 
              onWeatherFetch={handleWeatherFetch}
              onBack={() => setCurrentStep(1)}
            />
          )}
          
          {currentStep === 3 && weatherData && (
            <OutfitRecommendation 
              weather={weatherData}
              location={selectedLocation}
              onOutfitGenerate={handleOutfitGenerate}
              onBack={() => setCurrentStep(2)}
            />
          )}
          
          {currentStep === 4 && outfitData && (
            <ColorSuggestions 
              outfit={outfitData}
              weather={weatherData}
              onBack={() => setCurrentStep(3)}
              onReset={resetApp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
