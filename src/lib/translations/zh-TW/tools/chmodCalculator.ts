export const chmodCalculatorZhTW = {
  tools: {
    chmodCalculator: {
      title: "Chmod 計算器",
      description: "使用視覺化介面計算 Unix 檔案權限，支援八進制和符號轉換",
      visualMode: "視覺模式",
      inputMode: "輸入模式",
      permissions: "權限",
      owner: "擁有者",
      group: "群組", 
      others: "其他",
      read: "讀取",
      write: "寫入",
      execute: "執行",
      specialBits: "特殊位元",
      setuid: "Setuid",
      setgid: "Setgid", 
      sticky: "Sticky 位元",
      directInput: "直接輸入",
      octalInput: "八進制（例如：755）",
      symbolicInput: "符號（例如：rwxr-xr-x）",
      presets: "常用預設",
      results: "結果",
      octal: "八進制",
      symbolic: "符號",
      resultDescription: "描述",
      securityWarnings: "安全警告",
      permissionGuide: "權限指南",
      // Permission explanations
      readExplanation: "檢視檔案內容或列出目錄內容",
      writeExplanation: "修改檔案內容或在目錄中建立/刪除檔案",
      executeExplanation: "將檔案作為程式執行或存取目錄",
      setuidExplanation: "以檔案擁有者的權限執行（可執行檔案）",
      setgidExplanation: "以檔案群組的權限執行或繼承群組（目錄）",
      stickyExplanation: "只有檔案擁有者可以刪除目錄中的檔案（通常用於 /tmp）",
      // Security warnings
      worldWritableWarning: "全域可寫：任何人都可以修改此檔案（安全風險）",
      fullPermissionsWarning: "所有人都有完整權限（777）：高度危險",
      setuidWorldWritableWarning: "Setuid + 全域可寫：重大安全漏洞",
      noOwnerPermissionsWarning: "擁有者沒有權限：檔案可能無法存取"
    }
  }
}