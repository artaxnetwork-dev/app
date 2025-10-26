/**
 * Central Type Index
 * Re-exports all types for easier access and cleaner imports.
 */

// ============================================================================
// ALL TYPES FROM SIMPLE
// ============================================================================

export * from './simple'

// ============================================================================
// TYPE UTILITIES
// ============================================================================

import { Json, UUID, Timestamp } from './simple'

/**
 * Utility type to convert database JSON to typed objects
 */
export type JsonToTyped<T> = T extends Json 
  ? T extends (infer U)[] 
    ? U extends Json ? JsonToTyped<U>[] : T 
    : T extends { [key: string]: Json | undefined } 
      ? { [K in keyof T]: JsonToTyped<T[K]> } 
      : T 
  : T;

/**
 * Standardized API response structure
 */
export interface ApiResult<T> {
  data: T | null
  error: string | null
  success: boolean
}

// Add other utility types here as needed