export interface Race {
  id: number;
  title: string;
  place: string;
  country: string;
  countryCode: string;
  date: Date;
  text: string;
  imgUrls: string[];
  podium: boolean;
}
