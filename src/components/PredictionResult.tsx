import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, MapPin, Home, Bath, Car, IndianRupee } from 'lucide-react';

interface PredictionResultProps {
  predictedRent: number;
  propertyDetails: {
    state: string;
    city: string;
    location: string;
    size: number;
    bedrooms: number;
    bathrooms: number;
    parking: number;
  };
  onNewPrediction: () => void;
}

export default function PredictionResult({ 
  predictedRent, 
  propertyDetails, 
  onNewPrediction 
}: PredictionResultProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const pricePerSqft = Math.round(predictedRent / propertyDetails.size);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      {/* Main Result Card */}
      <Card className="shadow-strong border-0">
        <CardHeader className="text-center bg-gradient-hero text-white rounded-t-lg py-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-6 w-6" />
            <CardTitle className="text-3xl font-bold">Rent Prediction</CardTitle>
          </div>
          <div className="text-6xl font-bold text-white mb-2">
            {formatCurrency(predictedRent)}
          </div>
          <p className="text-blue-100 text-lg">per month</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-real-estate-navy flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">
                    {propertyDetails.location ? 
                      `${propertyDetails.location}, ${propertyDetails.city}, ${propertyDetails.state}` :
                      `${propertyDetails.city}, ${propertyDetails.state}`
                    }
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Home className="h-4 w-4 text-gray-500" />
                    <span>{propertyDetails.size} sq ft</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">🛏️</span>
                    <span>{propertyDetails.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-gray-500" />
                    <span>{propertyDetails.bathrooms} bath</span>
                  </div>
                  {propertyDetails.parking > 0 && (
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4 text-gray-500" />
                      <span>{propertyDetails.parking} parking</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-real-estate-navy flex items-center gap-2">
                <IndianRupee className="h-5 w-5" />
                Price Breakdown
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-semibold">{formatCurrency(predictedRent)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Price per sq ft</span>
                  <span className="font-semibold">₹{pricePerSqft}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Annual Rent</span>
                  <span className="font-semibold">{formatCurrency(predictedRent * 12)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-xl text-real-estate-navy">Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-real-estate-light rounded-lg">
              <div className="text-2xl font-bold text-real-estate-blue mb-1">
                {Math.round(pricePerSqft * 0.9)} - {Math.round(pricePerSqft * 1.1)}
              </div>
              <div className="text-sm text-gray-600">Price Range (₹/sq ft)</div>
            </div>
            
            <div className="text-center p-4 bg-real-estate-light rounded-lg">
              <div className="text-2xl font-bold text-real-estate-teal mb-1">
                {propertyDetails.city}
              </div>
              <div className="text-sm text-gray-600">Market Location</div>
            </div>
            
            <div className="text-center p-4 bg-real-estate-light rounded-lg">
              <div className="text-2xl font-bold text-real-estate-gold mb-1">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {pricePerSqft > 50 ? 'Premium' : pricePerSqft > 30 ? 'Mid-Range' : 'Budget'}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">Property Segment</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={onNewPrediction}
          variant="outline"
          size="lg"
          className="flex-1 sm:flex-none"
        >
          Try Another Property
        </Button>
        <Button 
          className="bg-gradient-hero hover:shadow-glow transition-all duration-300 flex-1 sm:flex-none"
          size="lg"
        >
          Get Detailed Report
        </Button>
      </div>
    </div>
  );
}