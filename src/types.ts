export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string; // التحدي
  solution: string; // الحل
  thumbnailUrl: string;
  galleryImages: string[];
  behanceUrl: string;
  tags: string[];
  role: string; // دور المصمم
  duration: string; // مدة العمل
}

export interface StatItem {
  label: string;
  value: string;
  sub: string;
}

export interface MethodologyStep {
  number: string;
  title: string;
  description: string;
  iconName: string; // name of Lucide icon to use
}
