
import React, { useState, useEffect } from 'react';
import { Shirt, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OutfitRecommendationProps {
  weather: any;
  location: string;
  onOutfitGenerate: (outfit: any) => void;
  onBack: () => void;
}

export const OutfitRecommendation: React.FC<OutfitRecommendationProps> = ({
  weather,
  location,
  onOutfitGenerate,
  onBack
}) => {
  const [outfit, setOutfit] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateOutfit = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const temp = weather.temperature;
        const isRainy = weather.rainProbability > 60;
        const isWindy = weather.windSpeed > 20;
        
        let items = [];
        let bottomWear = '';
        let topWear = [];
        let outerwear = [];
        let accessories = [];

        // Temperature-based recommendations
        if (temp < 0) {
          bottomWear = 'Dicke Hose';
          topWear = ['Langarmshirt', 'Pulli'];
          outerwear = ['Winterjacke'];
          accessories = ['Mütze', 'Schal', 'Handschuhe'];
        } else if (temp <= 10) {
          bottomWear = 'Lange Hose';
          topWear = ['Langarmshirt', 'Pulli'];
          outerwear = ['Jacke'];
          accessories = ['Schal'];
        } else if (temp <= 15) {
          bottomWear = 'Hose';
          topWear = ['Langarmshirt', 'Pulli'];
          outerwear = ['Leichte Jacke'];
        } else if (temp <= 20) {
          bottomWear = 'Dünne Hose';
          topWear = ['T-Shirt'];
          outerwear = ['Pulli (optional)'];
        } else if (temp <= 25) {
          bottomWear = 'Kurze Hose oder dünne Hose';
          topWear = ['T-Shirt oder Top'];
          outerwear = ['Leichter Pulli (abends)'];
        } else {
          bottomWear = 'Kurze Hose';
          topWear = ['Top oder dünnes T-Shirt'];
        }

        // Weather adjustments
        if (isRainy) {
          if (!outerwear.includes('Regenjacke')) {
            outerwear.push('Regenjacke');
          }
        }

        if (isWindy && !outerwear.some(item => item.includes('Jacke'))) {
          outerwear.push('Windjacke');
        }

        const generatedOutfit = {
          bottomWear,
          topWear,
          outerwear,
          accessories,
          temperature: temp,
          weatherConditions: {
            rainy: isRainy,
            windy: isWindy
          }
        };

        setOutfit(generatedOutfit);
        setIsLoading(false);
      }, 1500);
    };

    generateOutfit();
  }, [weather]);

  const handleContinue = () => {
    if (outfit) {
      onOutfitGenerate(outfit);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full shadow-lg border-blue-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-900">Outfit wird zusammengestellt...</CardTitle>
          <CardDescription className="text-blue-600">
            Basierend auf {weather.temperature}°C in {location}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-blue-600">Perfekte Kleidungskombination wird berechnet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-blue-900 flex items-center justify-center gap-2">
          <Shirt className="w-6 h-6" />
          Outfit-Empfehlung
        </CardTitle>
        <CardDescription className="text-blue-600">
          Perfekt für {weather.temperature}°C in {location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weather Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-blue-900">Aktuelle Bedingungen:</span>
            <span className="text-2xl font-bold text-blue-900">{weather.temperature}°C</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {weather.rainProbability > 60 && (
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                Regen möglich ({weather.rainProbability}%)
              </Badge>
            )}
            {weather.windSpeed > 20 && (
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                Windig ({weather.windSpeed} km/h)
              </Badge>
            )}
          </div>
        </div>

        {/* Outfit Recommendations */}
        <div className="space-y-4">
          {/* Bottom Wear */}
          <div className="bg-white border border-blue-100 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Unterteil
            </h4>
            <p className="text-blue-700">{outfit.bottomWear}</p>
          </div>

          {/* Top Wear */}
          <div className="bg-white border border-blue-100 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Oberteil
            </h4>
            <div className="space-y-1">
              {outfit.topWear.map((item: string, index: number) => (
                <p key={index} className="text-blue-700">• {item}</p>
              ))}
            </div>
          </div>

          {/* Outer Wear */}
          {outfit.outerwear.length > 0 && (
            <div className="bg-white border border-blue-100 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Oberbekleidung
              </h4>
              <div className="space-y-1">
                {outfit.outerwear.map((item: string, index: number) => (
                  <p key={index} className="text-blue-700">• {item}</p>
                ))}
              </div>
            </div>
          )}

          {/* Accessories */}
          {outfit.accessories.length > 0 && (
            <div className="bg-white border border-blue-100 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Accessoires
              </h4>
              <div className="space-y-1">
                {outfit.accessories.map((item: string, index: number) => (
                  <p key={index} className="text-blue-700">• {item}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Tipp:</h4>
          <p className="text-yellow-700 text-sm">
            {outfit.temperature < 15 
              ? "Bei kühleren Temperaturen empfiehlt sich das Zwiebelprinzip - so können Sie Schichten nach Bedarf an- oder ausziehen."
              : "Bei wärmeren Temperaturen wählen Sie atmungsaktive Materialien wie Baumwolle oder Leinen."
            }
          </p>
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
            Farbkombinationen anzeigen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
