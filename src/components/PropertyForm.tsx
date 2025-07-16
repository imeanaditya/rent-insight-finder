import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, MapPin, Home, Bath, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface PropertyFormProps {
  onSubmit: (data: PropertyData) => void;
}

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const cities = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada'],
  'Arunachal Pradesh': ['Itanagar'],
  'Assam': ['Guwahati', 'Dibrugarh'],
  'Bihar': ['Patna', 'Gaya'],
  'Chhattisgarh': ['Raipur', 'Bilaspur'],
  'Goa': ['Panaji', 'Margao'],
  'Gujarat': ['Ahmedabad', 'Surat'],
  'Haryana': ['Gurgaon', 'Faridabad'],
  'Himachal Pradesh': ['Shimla', 'Manali'],
  'Jharkhand': ['Ranchi', 'Jamshedpur'],
  'Karnataka': ['Bangalore', 'Mysore'],
  'Kerala': ['Kochi', 'Thiruvananthapuram'],
  'Madhya Pradesh': ['Bhopal', 'Indore'],
  'Maharashtra': ['Mumbai', 'Pune'],
  'Manipur': ['Imphal'],
  'Meghalaya': ['Shillong'],
  'Mizoram': ['Aizawl'],
  'Nagaland': ['Kohima'],
  'Odisha': ['Bhubaneswar', 'Cuttack'],
  'Punjab': ['Chandigarh', 'Ludhiana'],
  'Rajasthan': ['Jaipur', 'Udaipur'],
  'Sikkim': ['Gangtok'],
  'Tamil Nadu': ['Chennai', 'Coimbatore'],
  'Telangana': ['Hyderabad', 'Warangal'],
  'Tripura': ['Agartala'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur'],
  'Uttarakhand': ['Dehradun', 'Haridwar'],
  'West Bengal': ['Kolkata', 'Durgapur']
};

export default function PropertyForm({ onSubmit }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyData>({
    state: '',
    city: '',
    location: '',
    size: 0,
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    images: []
  });
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof PropertyData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) {
      toast({
        title: "Too many images",
        description: "Please select maximum 5 images",
        variant: "destructive"
      });
      return;
    }
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 5) {
      toast({
        title: "Too many images",
        description: "Please select maximum 5 images",
        variant: "destructive"
      });
      return;
    }
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.state || !formData.city || !formData.size) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-medium">
      <CardHeader className="text-center bg-gradient-hero text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Property Details</CardTitle>
        <p className="text-blue-100">Enter your property information for rent prediction</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-real-estate-navy">
              <MapPin className="h-5 w-5" />
              Location Details
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Select 
                  value={formData.city} 
                  onValueChange={(value) => handleInputChange('city', value)}
                  disabled={!formData.state}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.state && cities[formData.state as keyof typeof cities]?.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Specific Location/Area</Label>
              <Input
                id="location"
                placeholder="e.g., Banjara Hills, Andheri West"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
          </div>

          {/* Property Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-real-estate-navy">
              <Home className="h-5 w-5" />
              Property Features
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size (sq ft) *</Label>
                <Input
                  id="size"
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.size || ''}
                  onChange={(e) => handleInputChange('size', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Select value={formData.bedrooms.toString()} onValueChange={(value) => handleInputChange('bedrooms', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Select value={formData.bathrooms.toString()} onValueChange={(value) => handleInputChange('bathrooms', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        <div className="flex items-center gap-2">
                          <Bath className="h-4 w-4" />
                          {num}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parking">Parking Spaces</Label>
                <Select value={formData.parking.toString()} onValueChange={(value) => handleInputChange('parking', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4" />
                          {num}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-real-estate-navy">
              <Upload className="h-5 w-5" />
              Property Images
            </div>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-primary bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop images here, or click to select</p>
              <p className="text-sm text-gray-500">Maximum 5 images, up to 10MB each</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button 
                type="button" 
                variant="outline" 
                className="mt-4"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                Choose Images
              </Button>
            </div>
            
            {formData.images.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected Images:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((file, index) => (
                    <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            Predict Rent Amount
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}