export const LEVEL_USER = ["Admin", "Kurir"] as const;

export type LevelUser = (typeof LEVEL_USER)[number];
