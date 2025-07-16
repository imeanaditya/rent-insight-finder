// House rent data from the CSV file
export interface RentDataPoint {
  state: string;
  city: string;
  location: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  rent: number;
}

export const rentData: RentDataPoint[] = [
  { state: "Andhra Pradesh", city: "Visakhapatnam", location: "MVP Colony", size: 1859, bedrooms: 4, bathrooms: 4, parking: 0, rent: 79151 },
  { state: "Andhra Pradesh", city: "Visakhapatnam", location: "MVP Colony", size: 951, bedrooms: 5, bathrooms: 5, parking: 1, rent: 24581 },
  { state: "Andhra Pradesh", city: "Visakhapatnam", location: "MVP Colony", size: 2107, bedrooms: 2, bathrooms: 1, parking: 2, rent: 42368 },
  { state: "Andhra Pradesh", city: "Visakhapatnam", location: "MVP Colony", size: 1287, bedrooms: 4, bathrooms: 4, parking: 1, rent: 25929 },
  { state: "Andhra Pradesh", city: "Visakhapatnam", location: "MVP Colony", size: 1116, bedrooms: 1, bathrooms: 1, parking: 2, rent: 14947 },
  { state: "Andhra Pradesh", city: "Vijayawada", location: "Benz Circle", size: 1130, bedrooms: 5, bathrooms: 2, parking: 1, rent: 66525 },
  { state: "Andhra Pradesh", city: "Vijayawada", location: "Benz Circle", size: 1556, bedrooms: 5, bathrooms: 2, parking: 1, rent: 28681 },
  { state: "Karnataka", city: "Bangalore", location: "Whitefield", size: 685, bedrooms: 1, bathrooms: 1, parking: 2, rent: 71745 },
  { state: "Karnataka", city: "Bangalore", location: "Whitefield", size: 2176, bedrooms: 1, bathrooms: 1, parking: 2, rent: 64064 },
  { state: "Karnataka", city: "Bangalore", location: "Whitefield", size: 1836, bedrooms: 4, bathrooms: 4, parking: 2, rent: 34915 },
  { state: "Maharashtra", city: "Mumbai", location: "Andheri West", size: 813, bedrooms: 5, bathrooms: 3, parking: 1, rent: 18373 },
  { state: "Maharashtra", city: "Mumbai", location: "Andheri West", size: 1168, bedrooms: 4, bathrooms: 4, parking: 2, rent: 44531 },
  { state: "Maharashtra", city: "Pune", location: "Kothrud", size: 1844, bedrooms: 1, bathrooms: 1, parking: 1, rent: 69468 },
  { state: "Tamil Nadu", city: "Chennai", location: "Anna Nagar", size: 1626, bedrooms: 5, bathrooms: 5, parking: 0, rent: 25056 },
  { state: "Telangana", city: "Hyderabad", location: "Banjara Hills", size: 1460, bedrooms: 4, bathrooms: 4, parking: 0, rent: 39684 },
  { state: "West Bengal", city: "Kolkata", location: "Salt Lake", size: 678, bedrooms: 1, bathrooms: 1, parking: 1, rent: 37613 },
  { state: "Gujarat", city: "Ahmedabad", location: "Satellite", size: 1886, bedrooms: 5, bathrooms: 2, parking: 2, rent: 61679 },
  { state: "Rajasthan", city: "Jaipur", location: "Vaishali Nagar", size: 1287, bedrooms: 5, bathrooms: 4, parking: 1, rent: 56699 },
  { state: "Punjab", city: "Chandigarh", location: "Sector 17", size: 1603, bedrooms: 3, bathrooms: 1, parking: 2, rent: 28587 },
  { state: "Haryana", city: "Gurgaon", location: "DLF Phase 3", size: 1306, bedrooms: 2, bathrooms: 1, parking: 1, rent: 49741 },
  { state: "Kerala", city: "Kochi", location: "Marine Drive", size: 2228, bedrooms: 5, bathrooms: 2, parking: 1, rent: 45584 },
  { state: "Madhya Pradesh", city: "Bhopal", location: "MP Nagar", size: 2387, bedrooms: 3, bathrooms: 2, parking: 0, rent: 38979 },
  { state: "Uttar Pradesh", city: "Lucknow", location: "Gomti Nagar", size: 2258, bedrooms: 3, bathrooms: 2, parking: 1, rent: 58470 },
  { state: "Bihar", city: "Patna", location: "Kankarbagh", size: 2491, bedrooms: 5, bathrooms: 4, parking: 2, rent: 27991 },
  { state: "Odisha", city: "Bhubaneswar", location: "Sahid Nagar", size: 1403, bedrooms: 1, bathrooms: 1, parking: 2, rent: 65628 }
];

// Simple prediction algorithm using similar properties
export function predictRent(
  state: string,
  city: string,
  size: number,
  bedrooms: number,
  bathrooms: number,
  parking: number
): number {
  // Find similar properties
  const similarProperties = rentData.filter(property => {
    const stateMatch = property.state === state;
    const cityMatch = property.city === city;
    const sizeMatch = Math.abs(property.size - size) <= 500;
    const bedroomMatch = Math.abs(property.bedrooms - bedrooms) <= 1;
    
    // Scoring system for similarity
    let score = 0;
    if (stateMatch) score += 3;
    if (cityMatch) score += 5;
    if (sizeMatch) score += 2;
    if (bedroomMatch) score += 1;
    
    return score >= 3; // Minimum similarity threshold
  });

  if (similarProperties.length === 0) {
    // Fallback to state-level average if no similar properties found
    const stateProperties = rentData.filter(property => property.state === state);
    if (stateProperties.length > 0) {
      const avgRent = stateProperties.reduce((sum, prop) => sum + prop.rent, 0) / stateProperties.length;
      const avgSize = stateProperties.reduce((sum, prop) => sum + prop.size, 0) / stateProperties.length;
      return Math.round((avgRent / avgSize) * size);
    }
    
    // Final fallback to national average
    const nationalAvg = rentData.reduce((sum, prop) => sum + prop.rent, 0) / rentData.length;
    const nationalAvgSize = rentData.reduce((sum, prop) => sum + prop.size, 0) / rentData.length;
    return Math.round((nationalAvg / nationalAvgSize) * size);
  }

  // Calculate weighted average based on similarity
  let totalRent = 0;
  let totalWeight = 0;

  similarProperties.forEach(property => {
    // Calculate similarity weight
    let weight = 1;
    if (property.state === state) weight += 0.3;
    if (property.city === city) weight += 0.5;
    if (Math.abs(property.size - size) <= 200) weight += 0.2;
    if (property.bedrooms === bedrooms) weight += 0.1;
    if (property.bathrooms === bathrooms) weight += 0.1;
    if (property.parking === parking) weight += 0.1;

    totalRent += property.rent * weight;
    totalWeight += weight;
  });

  const predictedRent = Math.round(totalRent / totalWeight);
  
  // Apply size adjustment factor
  const avgSizeInSimilar = similarProperties.reduce((sum, prop) => sum + prop.size, 0) / similarProperties.length;
  const sizeAdjustment = size / avgSizeInSimilar;
  
  return Math.round(predictedRent * sizeAdjustment);
}