/**
 * Simplified type system for Artax Network
 * Clean, maintainable types without breaking existing functionality
 */

// ============================================================================
// COMMON TYPES
// ============================================================================

export type Json = 
  | string 
  | number 
  | boolean 
  | null 
  | { [key: string]: Json | undefined } 
  | Json[]

export type UUID = string
export type Timestamp = string

// ============================================================================
// ENUMS
// ============================================================================

export enum WorkflowStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  ARCHIVED = 'archived'
}

export enum WorkflowStepType {
  ACTION = 'action',
  CONDITION = 'condition',
  DELAY = 'delay',
  WEBHOOK = 'webhook',
  EMAIL = 'email',
  NOTIFICATION = 'notification'
}

export enum WorkflowTriggerType {
  WEBHOOK = 'webhook',
  SCHEDULE = 'schedule',
  EVENT = 'event',
  MANUAL = 'manual'
}

export enum OrganizationRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member'
}

// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface WorkflowStep {
  id: string
  type: WorkflowStepType
  name: string
  description?: string
  config: Record<string, any>
  order: number
  is_required: boolean
  timeout_seconds?: number
}

export interface WorkflowTrigger {
  id: string
  type: WorkflowTriggerType
  name: string
  config: Record<string, any>
  is_active: boolean
}

export interface Workflow {
  id: UUID
  name: string
  description: string | null
  status: WorkflowStatus
  steps: WorkflowStep[]
  triggers: WorkflowTrigger[]
  created_at: Timestamp
  updated_at: Timestamp
  user_id: UUID
  organization_id: UUID | null
  is_public: boolean
  tags: string[]
  version: number
  last_run_at: Timestamp | null
  run_count: number
  success_rate: number
}

export interface Organization {
  id: UUID
  name: string
  description: string | null
  created_at: Timestamp
  updated_at: Timestamp
}

export interface OrganizationMember {
  id: UUID
  organization_id: UUID
  user_id: UUID
  role: OrganizationRole
  created_at: Timestamp
}

// ============================================================================
// CREATE/UPDATE TYPES
// ============================================================================

export interface CreateWorkflowData {
  name: string
  description?: string
  steps: Omit<WorkflowStep, 'id'>[]
  triggers: Omit<WorkflowTrigger, 'id'>[]
  is_public?: boolean
  tags?: string[]
  organization_id?: UUID
}

export interface UpdateWorkflowData {
  name?: string
  description?: string
  status?: WorkflowStatus
  steps?: WorkflowStep[]
  triggers?: WorkflowTrigger[]
  is_public?: boolean
  tags?: string[]
}

export interface CreateOrganizationData {
  name: string
  description?: string
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T
  error: null
}

export interface ApiError {
  data: null
  error: {
    message: string
    code?: string
  }
}

export type ApiResult<T> = ApiResponse<T> | ApiError

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface WorkflowFilters {
  status?: WorkflowStatus[]
  is_public?: boolean
  organization_id?: string
  tags?: string[]
  search?: string
}

export interface WorkflowSortOptions {
  field: 'created_at' | 'updated_at' | 'name' | 'run_count' | 'success_rate'
  direction: 'asc' | 'desc'
}

export interface OrganizationFilters {
  search?: string
  role?: OrganizationRole[]
}

export interface OrganizationSortOptions {
  field: 'name' | 'created_at' | 'updated_at' | 'member_count'
  direction: 'asc' | 'desc'
}
