
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        onLocationSelect(searchTerm.trim());
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demo purposes, we'll use a mock city name
          onLocationSelect('Aktueller Standort (Berlin)');
          setIsLoading(false);
        },
        (error) => {
          console.log('Geolocation error:', error);
          alert('Standort konnte nicht ermittelt werden. Bitte geben Sie eine Stadt manuell ein.');
          setIsLoading(false);
        }
      );
    } else {
      alert('Geolocation wird von diesem Browser nicht unterstützt.');
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-blue-900 flex items-center justify-center gap-2">
          <MapPin className="w-6 h-6" />
          Ort auswählen
        </CardTitle>
        <CardDescription className="text-blue-600">
          Wählen Sie Ihren Standort für die Wettervorhersage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Location Button */}
        <Button
          onClick={handleCurrentLocation}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
          size="lg"
        >
          <MapPin className="w-4 h-4 mr-2" />
          {isLoading ? 'Ermittle Standort...' : 'Aktueller Standort verwenden'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-blue-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-blue-500">oder</span>
          </div>
        </div>

        {/* Manual Location Search */}
        <form onSubmit={handleLocationSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Stadt eingeben (z.B. Berlin, München, Hamburg)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 border-blue-200 focus:border-blue-500"
            />
          </div>
          <Button
            type="submit"
            disabled={!searchTerm.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3"
            size="lg"
          >
            {isLoading ? 'Suche läuft...' : 'Ort bestätigen'}
          </Button>
        </form>

        {/* Popular Cities */}
        <div className="space-y-2">
          <p className="text-sm text-blue-600 font-medium">Beliebte Städte:</p>
          <div className="grid grid-cols-2 gap-2">
            {['Berlin', 'München', 'Hamburg', 'Köln'].map((city) => (
              <Button
                key={city}
                variant="outline"
                size="sm"
                onClick={() => onLocationSelect(city)}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                disabled={isLoading}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
