/**
 * Represents a mood option for recipe selection
 */
export interface MoodOption {
  id: string;
  title: string;
  description: string;
}

/**
 * Type for accessing a specific mood from the moods data
 */
export type Mood = MoodOption;
