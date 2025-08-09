export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  followers: string;
  campaigns: string;
  rating: string;
  recentCampaign?: {
    title: string;
    description: string;
  };
}