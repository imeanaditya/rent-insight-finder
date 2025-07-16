import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, TrendingUp, MapPin, Users, Star } from 'lucide-react';
import PropertyForm from '@/components/PropertyForm';
import PredictionResult from '@/components/PredictionResult';
import { predictRent } from '@/data/rentData';
import heroImage from '@/assets/hero-house.jpg';

interface PropertyData {
  state: string;
  city: string;
  location: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  images: File[];
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'form' | 'result'>('home');
  const [predictionData, setPredictionData] = useState<{
    rent: number;
    property: PropertyData;
  } | null>(null);

  const handleStartPrediction = () => {
    setCurrentView('form');
  };

  const handleFormSubmit = (data: PropertyData) => {
    const predictedRent = predictRent(
      data.state,
      data.city,
      data.size,
      data.bedrooms,
      data.bathrooms,
      data.parking
    );
    
    setPredictionData({
      rent: predictedRent,
      property: data
    });
    setCurrentView('result');
  };

  const handleNewPrediction = () => {
    setCurrentView('form');
    setPredictionData(null);
  };

  if (currentView === 'form') {
    return (
      <div className="min-h-screen bg-real-estate-light py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('home')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-real-estate-navy mb-2">
              Predict Your Property Rent
            </h1>
            <p className="text-gray-600">
              Fill in the details below to get an accurate rent prediction
            </p>
          </div>
          <PropertyForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  }

  if (currentView === 'result' && predictionData) {
    return (
      <div className="min-h-screen bg-real-estate-light py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('home')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
          </div>
          <PredictionResult
            predictedRent={predictionData.rent}
            propertyDetails={predictionData.property}
            onNewPrediction={handleNewPrediction}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <TrendingUp className="h-4 w-4 mr-2" />
              AI-Powered Rent Prediction
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Predict Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Property Rent
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Get instant, accurate rent predictions using machine learning and comprehensive market data across India
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                onClick={handleStartPrediction}
              >
                Start Prediction
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-real-estate-navy mb-4">
              Why Choose Our Prediction Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced machine learning algorithms combined with comprehensive market data to deliver accurate rent predictions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-real-estate-navy mb-4">
                  AI-Powered Analysis
                </h3>
                <p className="text-gray-600">
                  Advanced machine learning algorithms analyze property features, location data, and market trends for accurate predictions
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-real-estate-navy mb-4">
                  Comprehensive Coverage
                </h3>
                <p className="text-gray-600">
                  Covers major cities across all Indian states with extensive property data and local market insights
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-real-estate-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-real-estate-navy mb-4">
                  Instant Results
                </h3>
                <p className="text-gray-600">
                  Get immediate rent predictions with detailed market analysis and price breakdowns in seconds
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-real-estate-light">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-real-estate-blue mb-2">25+</div>
              <div className="text-gray-600">States Covered</div>
            </div>
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-real-estate-teal mb-2">50+</div>
              <div className="text-gray-600">Cities Analyzed</div>
            </div>
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-real-estate-navy mb-2">1000+</div>
              <div className="text-gray-600">Properties Evaluated</div>
            </div>
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-real-estate-gold mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Predict Your Property Rent?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of property owners and investors who trust our AI-powered predictions
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
            onClick={handleStartPrediction}
          >
            <Home className="h-5 w-5 mr-2" />
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
