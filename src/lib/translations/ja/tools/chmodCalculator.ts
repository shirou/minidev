export const chmodCalculatorJa = {
  tools: {
    chmodCalculator: {
      title: "Chmod 計算機",
      description: "視覚的インターフェースとoctal/symbolic変換でUnixファイル権限を計算",
      visualMode: "視覚モード",
      inputMode: "入力モード", 
      permissions: "権限",
      owner: "所有者",
      group: "グループ",
      others: "その他",
      read: "読み取り",
      write: "書き込み",
      execute: "実行",
      specialBits: "特殊ビット",
      setuid: "Setuid",
      setgid: "Setgid",
      sticky: "スティッキービット",
      directInput: "直接入力",
      octalInput: "8進数 (例: 755)",
      symbolicInput: "シンボリック (例: rwxr-xr-x)",
      presets: "一般的なプリセット",
      results: "結果",
      octal: "8進数",
      symbolic: "シンボリック",
      resultDescription: "説明",
      securityWarnings: "セキュリティ警告",
      permissionGuide: "権限ガイド",
      // Permission explanations
      readExplanation: "ファイル内容の表示またはディレクトリ内容の一覧表示",
      writeExplanation: "ファイル内容の変更またはディレクトリ内でのファイル作成・削除",
      executeExplanation: "ファイルをプログラムとして実行またはディレクトリへのアクセス",
      setuidExplanation: "ファイル所有者の権限で実行（実行可能ファイル）",
      setgidExplanation: "ファイルグループの権限で実行またはグループ継承（ディレクトリ）",
      stickyExplanation: "ファイル所有者のみがファイルを削除可能（通常/tmp）",
      // Security warnings
      worldWritableWarning: "誰でも書き込み可能：誰でもこのファイルを変更できます（セキュリティリスク）",
      fullPermissionsWarning: "すべての人にフル権限（777）：非常に危険",
      setuidWorldWritableWarning: "Setuid + 誰でも書き込み可能：重大なセキュリティ脆弱性",
      noOwnerPermissionsWarning: "所有者に権限がありません：ファイルがアクセス不能になる可能性"
    }
  }
}