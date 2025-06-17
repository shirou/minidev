export const chmodCalculatorZhCN = {
  tools: {
    chmodCalculator: {
      title: "Chmod 计算器",
      description: "使用可视化界面计算 Unix 文件权限，支持八进制和符号转换",
      visualMode: "可视模式",
      inputMode: "输入模式",
      permissions: "权限",
      owner: "所有者",
      group: "组", 
      others: "其他人",
      read: "读取",
      write: "写入",
      execute: "执行",
      specialBits: "特殊位",
      setuid: "Setuid",
      setgid: "Setgid", 
      sticky: "粘滞位",
      directInput: "直接输入",
      octalInput: "八进制（例如：755）",
      symbolicInput: "符号（例如：rwxr-xr-x）",
      presets: "常用预设",
      results: "结果",
      octal: "八进制",
      symbolic: "符号",
      resultDescription: "描述",
      securityWarnings: "安全警告",
      permissionGuide: "权限指南",
      // Permission explanations
      readExplanation: "查看文件内容或列出目录内容",
      writeExplanation: "修改文件内容或在目录中创建/删除文件",
      executeExplanation: "运行文件作为程序或访问目录",
      setuidExplanation: "以文件所有者的权限运行（可执行文件）",
      setgidExplanation: "以文件组的权限运行或继承组（目录）",
      stickyExplanation: "只有文件所有者可以删除目录中的文件（通常用于 /tmp）",
      // Security warnings
      worldWritableWarning: "全局可写：任何人都可以修改此文件（安全风险）",
      fullPermissionsWarning: "所有人完全权限（777）：高度危险",
      setuidWorldWritableWarning: "Setuid + 全局可写：严重安全漏洞",
      noOwnerPermissionsWarning: "所有者没有权限：文件可能无法访问"
    }
  }
}