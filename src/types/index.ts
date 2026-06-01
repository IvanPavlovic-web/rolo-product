export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface GalleryImage {
  src: string;
  srcSet: string;
  webpSrcSet: string;
  width: number;
  height: number;
  aspectRatio: "16 / 9" | "1 / 1" | "3 / 4";
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: GalleryImage;
  aspectRatio: "16 / 9" | "1 / 1" | "3 / 4";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}
