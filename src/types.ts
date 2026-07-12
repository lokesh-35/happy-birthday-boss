export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
}

export interface FavoriteThing {
  id: string;
  title: string;
  description: string;
  iconName: string;
  gradient: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  caption: string;
}

export type ThemeMode = 'light' | 'dark';
