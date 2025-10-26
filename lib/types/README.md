# Type System Documentation

This directory contains a comprehensive, well-organized type system for the Artax Network application, following TypeScript and Supabase best practices.

## 📁 File Structure

```
lib/types/
├── index.ts           # Central exports - import everything from here
├── base.ts            # Core types, enums, and common interfaces
├── database.ts        # Supabase database schema types
├── workflow.ts        # Workflow-specific types and utilities
├── organization.ts    # Organization-specific types and utilities
└── README.md          # This documentation
```

## 🚀 Quick Start

```typescript
// Import everything you need from the central index
import { 
  Workflow, 
  CreateWorkflowData, 
  Organization,
  WorkflowFilters,
  ApiResult 
} from '@/lib/types'

// Or import specific modules
import { Workflow, WorkflowStep } from '@/lib/types/workflow'
import { Organization, OrganizationMember } from '@/lib/types/organization'
```

## 📋 Type Categories

### 1. **Base Types** (`base.ts`)
- **Common Types**: `Json`, `UUID`, `Timestamp`
- **Enums**: `WorkflowStatus`, `WorkflowStepType`, `OrganizationRole`
- **Core Entities**: `Workflow`, `WorkflowStep`, `Organization`
- **Database Rows**: Raw Supabase types
- **Create/Update Types**: For API operations
- **Utility Types**: `WorkflowWithOrganization`, `ApiResult`

### 2. **Database Types** (`database.ts`)
- **Supabase Schema**: Complete database type definitions
- **Row Types**: Raw database row interfaces
- **Insert/Update Types**: For database operations
- **Relationships**: Foreign key relationships

### 3. **Workflow Types** (`workflow.ts`)
- **Re-exports**: All workflow-related base types
- **Filters**: `WorkflowFilters`, `WorkflowSortOptions`
- **Search**: `WorkflowSearchParams`
- **Stats**: `WorkflowStats`, `WorkflowRunResult`

### 4. **Organization Types** (`organization.ts`)
- **Re-exports**: All organization-related base types
- **Filters**: `OrganizationFilters`, `OrganizationSortOptions`
- **Search**: `OrganizationSearchParams`
- **Stats**: `OrganizationStats`, `OrganizationInvite`

## 🎯 Key Benefits

### ✅ **Clean & Maintainable**
- No more 200+ line type definitions
- Logical separation of concerns
- Easy to find and modify types

### ✅ **Type Safety**
- Full TypeScript support
- Compile-time error checking
- IntelliSense autocomplete

### ✅ **Reusable**
- Central type definitions
- Consistent across the application
- Easy to extend and modify

### ✅ **Documentation**
- Self-documenting code
- Clear naming conventions
- Comprehensive examples

## 🔧 Usage Examples

### Basic Entity Usage
```typescript
import { Workflow, WorkflowStatus } from '@/lib/types'

const workflow: Workflow = {
  id: 'uuid',
  name: 'My Workflow',
  status: WorkflowStatus.ACTIVE,
  // ... other properties
}
```

### API Operations
```typescript
import { CreateWorkflowData, UpdateWorkflowData } from '@/lib/types'

const newWorkflow: CreateWorkflowData = {
  name: 'New Workflow',
  description: 'A new workflow',
  steps: [],
  triggers: []
}

const updates: UpdateWorkflowData = {
  name: 'Updated Name',
  status: WorkflowStatus.ACTIVE
}
```

### Filtering & Search
```typescript
import { WorkflowFilters, WorkflowSearchParams } from '@/lib/types'

const filters: WorkflowFilters = {
  status: [WorkflowStatus.ACTIVE, WorkflowStatus.DRAFT],
  is_public: true,
  tags: ['automation', 'email']
}

const searchParams: WorkflowSearchParams = {
  query: 'email automation',
  filters,
  sort: { field: 'created_at', direction: 'desc' },
  pagination: { limit: 20, offset: 0 }
}
```

### Database Operations
```typescript
import { WorkflowRow, WorkflowInsert, WorkflowUpdate } from '@/lib/types'

// Raw database row (from Supabase)
const dbRow: WorkflowRow = {
  steps: { /* JSON data */ },
  triggers: { /* JSON data */ }
}

// Insert operation
const insertData: WorkflowInsert = {
  name: 'New Workflow',
  user_id: 'user-uuid'
}

// Update operation
const updateData: WorkflowUpdate = {
  name: 'Updated Name',
  status: WorkflowStatus.ACTIVE
}
```

## 🏗️ Architecture

### Type Hierarchy
```
base.ts (Core Types)
├── Common types (Json, UUID, Timestamp)
├── Enums (WorkflowStatus, OrganizationRole)
├── Core entities (Workflow, Organization)
└── Utility types (ApiResult, PaginatedResponse)

database.ts (Database Schema)
├── Supabase table definitions
├── Row/Insert/Update types
└── Relationship definitions

workflow.ts (Workflow Domain)
├── Re-exports from base
├── Workflow-specific filters
├── Search parameters
└── Statistics types

organization.ts (Organization Domain)
├── Re-exports from base
├── Organization-specific filters
├── Member management
└── Invitation system
```

### Import Strategy
```typescript
// ✅ Recommended: Import from central index
import { Workflow, CreateWorkflowData } from '@/lib/types'

// ✅ Also good: Import from specific modules
import { Workflow } from '@/lib/types/workflow'
import { Organization } from '@/lib/types/organization'

// ❌ Avoid: Direct imports from base
import { Workflow } from '@/lib/types/base'
```

## 🔄 Migration Guide

### From Old System
```typescript
// ❌ Old way
import { Workflow } from '../types/workflow'
import { CreateWorkflowData } from '../types/workflow'

// ✅ New way
import { Workflow, CreateWorkflowData } from '@/lib/types'
```

### Service Updates
```typescript
// ❌ Old imports
import { Workflow, CreateWorkflowData, UpdateWorkflowData } from '../types/workflow'

// ✅ New imports
import { 
  Workflow, 
  CreateWorkflowData, 
  UpdateWorkflowData,
  WorkflowFilters,
  WorkflowStats
} from '@/lib/types'
```

## 📚 Best Practices

### 1. **Use Central Imports**
```typescript
// ✅ Good
import { Workflow, Organization } from '@/lib/types'

// ❌ Avoid
import { Workflow } from '@/lib/types/workflow'
import { Organization } from '@/lib/types/organization'
```

### 2. **Leverage Utility Types**
```typescript
// ✅ Use built-in utilities
type PartialWorkflow = Partial<Workflow>
type WorkflowId = Pick<Workflow, 'id'>

// ❌ Don't redefine
interface PartialWorkflow {
  id?: string
  name?: string
  // ... all properties optional
}
```

### 3. **Use Enums for Constants**
```typescript
// ✅ Good
import { WorkflowStatus } from '@/lib/types'
const status = WorkflowStatus.ACTIVE

// ❌ Avoid
const status = 'active' as const
```

### 4. **Type Your API Responses**
```typescript
// ✅ Good
import { ApiResult, Workflow } from '@/lib/types'
const result: ApiResult<Workflow> = await fetchWorkflow(id)

// ❌ Avoid
const result: any = await fetchWorkflow(id)
```

## 🚀 Future Enhancements

- [ ] Add validation schemas with Zod
- [ ] Generate types from OpenAPI specs
- [ ] Add runtime type checking
- [ ] Create type-safe API client
- [ ] Add GraphQL type generation

## 📖 References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Supabase TypeScript Guide](https://supabase.com/docs/guides/api/generating-types)
- [Next.js TypeScript Guide](https://nextjs.org/docs/basic-features/typescript)
