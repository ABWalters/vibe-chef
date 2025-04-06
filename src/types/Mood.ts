/**
 * Represents a vibe option for recipe selection
 */
export interface VibeOption {
  id: string;
  title: string;
  description: string;
}

/**
 * Type for accessing a specific vibe from the vibes data
 */
export type Vibe = VibeOption;
