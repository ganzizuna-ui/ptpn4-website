import { Leaf, TreePine, Factory, Users, Globe2, Sprout, type LucideIcon } from "lucide-react";

/**
 * Peta nama icon (string, disimpan di data JSON) ke komponen Lucide.
 * Tambahkan icon baru di sini jika admin butuh pilihan icon lain.
 */
export const iconMap: Record<string, LucideIcon> = {
  Leaf,
  TreePine,
  Factory,
  Users,
  Globe2,
  Sprout,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Leaf;
}

export const availableIcons = Object.keys(iconMap);
