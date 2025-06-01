
import React, { useState } from 'react';
import { Palette, ArrowLeft, RotateCcw, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ColorSuggestionsProps {
  outfit: any;
  weather: any;
  onBack: () => void;
  onReset: () => void;
}

export const ColorSuggestions: React.FC<ColorSuggestionsProps> = ({
  outfit,
  weather,
  onBack,
  onReset
}) => {
  const [selectedBottomColor, setSelectedBottomColor] = useState<string>('');
  const [suggestedTopColors, setSuggestedTopColors] = useState<string[]>([]);

  const bottomColorOptions = [
    { name: 'Jeans', value: 'jeans', color: '#4682B4' },
    { name: 'Schwarz', value: 'schwarz', color: '#000000' },
    { name: 'Beige', value: 'beige', color: '#F5F5DC' },
    { name: 'Weiß', value: 'weiß', color: '#FFFFFF' },
    { name: 'Braun', value: 'braun', color: '#8B4513' },
    { name: 'Pink', value: 'pink', color: '#FFC0CB' }
  ];

  const getTopColorSuggestions = (bottomColor: string): string[] => {
    const colorRules: { [key: string]: string[] } = {
      'jeans': ['Blau', 'Weiß', 'Schwarz', 'Rot', 'Lila', 'Pink', 'Grün', 'Braun'],
      'schwarz': ['Alle Farben', 'Orange', 'Gelb', 'Rot', 'Weiß', 'Grau', 'Pink', 'Grün'],
      'beige': ['Schwarz', 'Dunkelblau', 'Braun', 'Dunkelgrün', 'Bordeaux'],
      'pink': ['Schwarz', 'Dunkelblau', 'Weiß', 'Grau'],
      'weiß': ['Alle Farben möglich', 'Blau', 'Schwarz', 'Rot', 'Grün', 'Gelb'],
      'braun': ['Babyblau', 'Schwarz', 'Creme', 'Weiß']
    };
    
    return colorRules[bottomColor] || ['Neutrale Farben empfohlen'];
  };

  const handleBottomColorSelect = (color: string) => {
    setSelectedBottomColor(color);
    setSuggestedTopColors(getTopColorSuggestions(color));
  };

  const getColorBadgeStyle = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'Blau': 'bg-blue-500',
      'Weiß': 'bg-white border-2 border-gray-300 text-black',
      'Schwarz': 'bg-black',
      'Rot': 'bg-red-500',
      'Lila': 'bg-purple-500',
      'Pink': 'bg-pink-500',
      'Grün': 'bg-green-500',
      'Braun': 'bg-amber-700',
      'Orange': 'bg-orange-500',
      'Gelb': 'bg-yellow-400 text-black',
      'Grau': 'bg-gray-500',
      'Dunkelblau': 'bg-blue-800',
      'Dunkelgrün': 'bg-green-800',
      'Bordeaux': 'bg-red-800',
      'Babyblau': 'bg-blue-300 text-black',
      'Creme': 'bg-amber-100 text-black border-2 border-amber-200'
    };
    
    return colorMap[colorName] || 'bg-gray-400';
  };

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-blue-900 flex items-center justify-center gap-2">
          <Palette className="w-6 h-6" />
          Farbkombinationen
        </CardTitle>
        <CardDescription className="text-blue-600">
          Finden Sie die perfekte Farbharmonie für Ihr Outfit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Outfit Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Ihr empfohlenes Outfit:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• {outfit.bottomWear}</p>
            {outfit.topWear.map((item: string, index: number) => (
              <p key={index}>• {item}</p>
            ))}
          </div>
        </div>

        {/* Bottom Color Selection */}
        <div className="space-y-3">
          <h4 className="font-semibold text-blue-900">1. Wählen Sie die Farbe Ihres Unterteils:</h4>
          <div className="grid grid-cols-2 gap-3">
            {bottomColorOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedBottomColor === option.value ? "default" : "outline"}
                onClick={() => handleBottomColorSelect(option.value)}
                className={`h-auto p-3 flex items-center gap-3 ${
                  selectedBottomColor === option.value 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                }`}
              >
                <div 
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: option.color }}
                ></div>
                <span>{option.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Top Color Suggestions */}
        {selectedBottomColor && suggestedTopColors.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              2. Passende Oberteil-Farben:
            </h4>
            <div className="bg-white border border-blue-100 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-3">
                Zu <strong>{bottomColorOptions.find(opt => opt.value === selectedBottomColor)?.name}</strong> passen diese Farben:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedTopColors.map((color, index) => (
                  <Badge
                    key={index}
                    className={`${getColorBadgeStyle(color)} text-white px-3 py-1 text-sm font-medium`}
                  >
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Style Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">✨ Styling-Tipps:</h4>
          <div className="text-yellow-700 text-sm space-y-1">
            <p>• Neutrale Farben (Schwarz, Weiß, Grau) passen fast immer</p>
            <p>• Bei unsicherheit: Ton-in-Ton oder ein Farbakzent reicht</p>
            <p>• Berücksichtigen Sie den Anlass und Ihre Persönlichkeit</p>
            {weather.temperature > 20 && (
              <p>• Bei warmem Wetter: Helle Farben reflektieren die Sonne</p>
            )}
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
            onClick={onReset}
            className="flex-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Neue Empfehlung
          </Button>
        </div>

        {/* Success Message */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
            <Heart className="w-4 h-4" />
            Perfekt! Sie sind optimal für das Wetter angezogen.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
