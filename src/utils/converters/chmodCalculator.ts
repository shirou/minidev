export interface Permission {
  read: boolean
  write: boolean
  execute: boolean
}

export interface UnixPermissions {
  owner: Permission
  group: Permission
  others: Permission
  specialBits?: {
    sticky: boolean
    setuid: boolean
    setgid: boolean
  }
}

export interface ChmodResult {
  octal: string
  symbolic: string
  description: string
  command: string
  permissions: UnixPermissions
}

// Common permission presets
export const PERMISSION_PRESETS = {
  '755': { name: 'Standard executable', description: 'Owner: read/write/execute, Group & Others: read/execute' },
  '644': { name: 'Standard file', description: 'Owner: read/write, Group & Others: read only' },
  '600': { name: 'Private file', description: 'Owner: read/write, Group & Others: no access' },
  '700': { name: 'Private executable', description: 'Owner: read/write/execute, Group & Others: no access' },
  '777': { name: 'Full access (dangerous)', description: 'Everyone: read/write/execute' },
  '666': { name: 'World writable', description: 'Everyone: read/write (no execute)' },
  '555': { name: 'Read-only executable', description: 'Everyone: read/execute (no write)' },
  '444': { name: 'Read-only', description: 'Everyone: read only' },
  '000': { name: 'No permissions', description: 'No access for anyone' }
}

// Convert octal string to permissions object
export function octalToPermissions(octal: string): UnixPermissions {
  // Handle 4-digit octal (with special bits)
  const cleanOctal = octal.padStart(4, '0')
  const specialBits = parseInt(cleanOctal[0], 8)
  const ownerBits = parseInt(cleanOctal[1], 8)
  const groupBits = parseInt(cleanOctal[2], 8)
  const othersBits = parseInt(cleanOctal[3], 8)
  
  return {
    owner: bitsToPermission(ownerBits),
    group: bitsToPermission(groupBits),
    others: bitsToPermission(othersBits),
    specialBits: {
      sticky: (specialBits & 1) !== 0,
      setgid: (specialBits & 2) !== 0,
      setuid: (specialBits & 4) !== 0
    }
  }
}

// Convert permissions object to octal string
export function permissionsToOctal(permissions: UnixPermissions): string {
  const ownerOctal = permissionToBits(permissions.owner)
  const groupOctal = permissionToBits(permissions.group)
  const othersOctal = permissionToBits(permissions.others)
  
  let specialBits = 0
  if (permissions.specialBits) {
    if (permissions.specialBits.sticky) specialBits |= 1
    if (permissions.specialBits.setgid) specialBits |= 2
    if (permissions.specialBits.setuid) specialBits |= 4
  }
  
  if (specialBits > 0) {
    return `${specialBits}${ownerOctal}${groupOctal}${othersOctal}`
  }
  
  return `${ownerOctal}${groupOctal}${othersOctal}`
}

// Convert permissions object to symbolic string (rwxrwxrwx)
export function permissionsToSymbolic(permissions: UnixPermissions): string {
  const owner = permissionToSymbolic(permissions.owner, 'owner', permissions.specialBits)
  const group = permissionToSymbolic(permissions.group, 'group', permissions.specialBits)
  const others = permissionToSymbolic(permissions.others, 'others', permissions.specialBits)
  
  return owner + group + others
}

// Convert symbolic string to permissions object
export function symbolicToPermissions(symbolic: string): UnixPermissions {
  if (symbolic.length !== 9 && symbolic.length !== 10) {
    throw new Error('Invalid symbolic format. Expected format: rwxrwxrwx')
  }
  
  const chars = symbolic.split('')
  
  const owner = symbolicToPermission(chars.slice(0, 3))
  const group = symbolicToPermission(chars.slice(3, 6))
  const others = symbolicToPermission(chars.slice(6, 9))
  
  // Detect special bits from symbolic representation
  const specialBits = {
    setuid: chars[2] === 's' || chars[2] === 'S',
    setgid: chars[5] === 's' || chars[5] === 'S',
    sticky: chars[8] === 't' || chars[8] === 'T'
  }
  
  return {
    owner,
    group,
    others,
    specialBits
  }
}

// Generate human-readable description
export function generateDescription(permissions: UnixPermissions): string {
  const descriptions = []
  
  // Owner permissions
  const ownerPerms = []
  if (permissions.owner.read) ownerPerms.push('read')
  if (permissions.owner.write) ownerPerms.push('write')
  if (permissions.owner.execute) ownerPerms.push('execute')
  descriptions.push(`Owner: ${ownerPerms.join(', ') || 'no permissions'}`)
  
  // Group permissions
  const groupPerms = []
  if (permissions.group.read) groupPerms.push('read')
  if (permissions.group.write) groupPerms.push('write')
  if (permissions.group.execute) groupPerms.push('execute')
  descriptions.push(`Group: ${groupPerms.join(', ') || 'no permissions'}`)
  
  // Others permissions
  const othersPerms = []
  if (permissions.others.read) othersPerms.push('read')
  if (permissions.others.write) othersPerms.push('write')
  if (permissions.others.execute) othersPerms.push('execute')
  descriptions.push(`Others: ${othersPerms.join(', ') || 'no permissions'}`)
  
  // Special bits
  if (permissions.specialBits) {
    const specialPerms = []
    if (permissions.specialBits.setuid) specialPerms.push('setuid')
    if (permissions.specialBits.setgid) specialPerms.push('setgid')
    if (permissions.specialBits.sticky) specialPerms.push('sticky bit')
    
    if (specialPerms.length > 0) {
      descriptions.push(`Special: ${specialPerms.join(', ')}`)
    }
  }
  
  return descriptions.join('; ')
}

// Generate chmod command
export function generateChmodCommand(permissions: UnixPermissions): string {
  const octal = permissionsToOctal(permissions)
  return `chmod ${octal}`
}

// Calculate chmod result from any input
export function calculateChmod(input: string | UnixPermissions): ChmodResult {
  let permissions: UnixPermissions
  
  if (typeof input === 'string') {
    // Try to parse as octal first
    if (/^\d{3,4}$/.test(input)) {
      permissions = octalToPermissions(input)
    } else if (/^[rwx-]{9}$/.test(input) || /^[rwxstST-]{9,10}$/.test(input)) {
      // Try to parse as symbolic
      permissions = symbolicToPermissions(input)
    } else {
      throw new Error('Invalid input format. Use octal (755) or symbolic (rwxr-xr-x)')
    }
  } else {
    permissions = input
  }
  
  const octal = permissionsToOctal(permissions)
  const symbolic = permissionsToSymbolic(permissions)
  const description = generateDescription(permissions)
  const command = generateChmodCommand(permissions)
  
  return {
    octal,
    symbolic,
    description,
    command,
    permissions
  }
}

// Helper functions
function bitsToPermission(bits: number): Permission {
  return {
    read: (bits & 4) !== 0,
    write: (bits & 2) !== 0,
    execute: (bits & 1) !== 0
  }
}

function permissionToBits(permission: Permission): number {
  let bits = 0
  if (permission.read) bits |= 4
  if (permission.write) bits |= 2
  if (permission.execute) bits |= 1
  return bits
}

function permissionToSymbolic(permission: Permission, type: 'owner' | 'group' | 'others', specialBits?: { sticky: boolean, setuid: boolean, setgid: boolean }): string {
  let result = ''
  
  // Read
  result += permission.read ? 'r' : '-'
  
  // Write
  result += permission.write ? 'w' : '-'
  
  // Execute (with special bits consideration)
  let executeChar = permission.execute ? 'x' : '-'
  
  if (specialBits) {
    if (type === 'owner' && specialBits.setuid) {
      executeChar = permission.execute ? 's' : 'S'
    } else if (type === 'group' && specialBits.setgid) {
      executeChar = permission.execute ? 's' : 'S'
    } else if (type === 'others' && specialBits.sticky) {
      executeChar = permission.execute ? 't' : 'T'
    }
  }
  
  result += executeChar
  
  return result
}

function symbolicToPermission(chars: string[]): Permission {
  return {
    read: chars[0] === 'r',
    write: chars[1] === 'w',
    execute: chars[2] === 'x' || chars[2] === 's' || chars[2] === 't'
  }
}

// Validate octal input
export function isValidOctal(input: string): boolean {
  return /^[0-7]{3,4}$/.test(input)
}

// Validate symbolic input
export function isValidSymbolic(input: string): boolean {
  return /^[rwx-]{9}$/.test(input) || /^[rwxstST-]{9,10}$/.test(input)
}

// Get security warnings for permissions (returns translation keys)
export function getSecurityWarnings(permissions: UnixPermissions): string[] {
  const warnings = []
  
  // Check for world-writable
  if (permissions.others.write) {
    warnings.push('worldWritableWarning')
  }
  
  // Check for 777 permissions
  const octal = permissionsToOctal(permissions)
  if (octal.endsWith('777')) {
    warnings.push('fullPermissionsWarning')
  }
  
  // Check for setuid on world-writable
  if (permissions.specialBits?.setuid && permissions.others.write) {
    warnings.push('setuidWorldWritableWarning')
  }
  
  // Check for no owner permissions
  if (!permissions.owner.read && !permissions.owner.write && !permissions.owner.execute) {
    warnings.push('noOwnerPermissionsWarning')
  }
  
  return warnings
}

// Get permission explanations (returns translation keys)
export function getPermissionExplanations(): { [key: string]: string } {
  return {
    read: 'readExplanation',
    write: 'writeExplanation',
    execute: 'executeExplanation',
    setuid: 'setuidExplanation',
    setgid: 'setgidExplanation',
    sticky: 'stickyExplanation'
  }
}