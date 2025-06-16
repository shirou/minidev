export const chmodCalculatorEn = {
  tools: {
    chmodCalculator: {
      title: "Chmod Calculator",
      description: "Calculate Unix file permissions with visual interface and octal/symbolic conversion",
      visualMode: "Visual Mode",
      inputMode: "Input Mode",
      permissions: "Permissions",
      owner: "Owner",
      group: "Group", 
      others: "Others",
      read: "Read",
      write: "Write",
      execute: "Execute",
      specialBits: "Special Bits",
      setuid: "Setuid",
      setgid: "Setgid", 
      sticky: "Sticky Bit",
      directInput: "Direct Input",
      octalInput: "Octal (e.g., 755)",
      symbolicInput: "Symbolic (e.g., rwxr-xr-x)",
      presets: "Common Presets",
      results: "Results",
      octal: "Octal",
      symbolic: "Symbolic",
      resultDescription: "Description",
      securityWarnings: "Security Warnings",
      permissionGuide: "Permission Guide",
      // Permission explanations
      readExplanation: "View file contents or list directory contents",
      writeExplanation: "Modify file contents or create/delete files in directory",
      executeExplanation: "Run file as program or access directory",
      setuidExplanation: "Run with file owner's privileges (executable files)",
      setgidExplanation: "Run with file group's privileges or inherit group (directories)",
      stickyExplanation: "Only file owner can delete files in directory (typically /tmp)",
      // Security warnings
      worldWritableWarning: "World-writable: Anyone can modify this file (security risk)",
      fullPermissionsWarning: "Full permissions for everyone (777): Highly dangerous",
      setuidWorldWritableWarning: "Setuid + world-writable: Critical security vulnerability",
      noOwnerPermissionsWarning: "Owner has no permissions: File may become inaccessible"
    }
  }
}