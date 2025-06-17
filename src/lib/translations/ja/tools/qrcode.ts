export const qrcodeJa = {
  tools: {
    qrcode: {
      title: "QRコード生成",
      description: "WiFi、URL、連絡先などのQRコードを生成",
      
      qrCodeType: "QRコードタイプ",
      settings: "設定",
      clearAll: "すべてクリア",
      
      types: {
        wifi: "WiFiネットワーク",
        url: "ウェブサイトURL", 
        email: "メール",
        phone: "電話番号",
        sms: "SMSメッセージ",
        contact: "連絡先カード",
        text: "プレーンテキスト"
      },
      
      wifi: {
        networkName: "ネットワーク名（SSID）",
        networkPlaceholder: "WiFiネットワーク名を入力...",
        securityType: "セキュリティタイプ",
        wpa: "WPA/WPA2",
        wep: "WEP", 
        noPassword: "パスワードなし（オープン）",
        password: "パスワード",
        passwordPlaceholder: "WiFiパスワードを入力...",
        hiddenNetwork: "隠されたネットワーク"
      },
      
      url: {
        websiteUrl: "ウェブサイトURL",
        placeholder: "https://example.com"
      },
      
      email: {
        address: "メールアドレス",
        addressPlaceholder: "user@example.com",
        subject: "件名",
        subjectPlaceholder: "メール件名...",
        message: "メッセージ",
        messagePlaceholder: "メールメッセージ..."
      },
      
      phone: {
        phoneNumber: "電話番号",
        placeholder: "+81-90-1234-5678"
      },
      
      sms: {
        message: "メッセージ",
        messagePlaceholder: "SMSメッセージ..."
      },
      
      contact: {
        firstName: "名",
        firstNamePlaceholder: "太郎",
        lastName: "姓",
        lastNamePlaceholder: "田中",
        organization: "組織",
        organizationPlaceholder: "会社名",
        phone: "電話",
        phonePlaceholder: "+81-90-1234-5678",
        email: "メール",
        emailPlaceholder: "tanaka@example.com",
        website: "ウェブサイト",
        websitePlaceholder: "https://example.com",
        address: "住所",
        addressPlaceholder: "東京都渋谷区..."
      },
      
      text: {
        content: "テキスト内容",
        placeholder: "エンコードするテキストを入力...",
        charactersCount: "{{count}} 文字"
      },
      
      options: {
        title: "QRコードオプション",
        errorCorrection: "エラー訂正",
        low: "低（7%）",
        medium: "中（15%）",
        quartile: "四分位（25%）",
        high: "高（30%）",
        size: "サイズ（px）",
        margin: "マージン",
        darkColor: "暗い色",
        lightColor: "明るい色"
      },
      
      output: {
        title: "QRコード",
        generationError: "生成エラー",
        generating: "QRコードを生成中...",
        altText: "生成されたQRコード",
        fillFields: "必須項目を入力してQRコードを生成してください"
      },
      
      errors: {
        generationFailed: "QRコード生成に失敗しました",
        unknownError: "不明なエラー",
        invalidType: "無効なQRタイプ"
      },
      
      howToUse: {
        title: "使い方:",
        wifi: {
          step1: "1. WiFiネットワーク名（SSID）を入力",
          step2: "2. セキュリティタイプを選択し、必要に応じてパスワードを入力",
          step3: "3. QRコードを共有して簡単にWiFi接続",
          step4: "4. ユーザーはカメラアプリでスキャンして接続可能"
        },
        url: {
          step1: "1. ウェブサイトのURLを入力",
          step2: "2. スキャンするとURLが開かれます",
          step3: "3. 最新のQRスキャナーやカメラアプリで動作"
        },
        email: {
          step1: "1. メールアドレスとオプションの件名/メッセージを入力",
          step2: "2. スキャンすると事前入力されたメールアプリが開きます",
          step3: "3. フィードバックやお問い合わせフォームに便利"
        },
        phone: {
          step1: "1. 国番号付きの電話番号を入力",
          step2: "2. スキャンすると通話の確認が表示されます",
          step3: "3. 大部分のスマートフォンで対応"
        },
        sms: {
          step2: "2. オプションのメッセージテキストを追加"
        },
        contact: {
          step1: "1. 連絡先情報を入力",
          step2: "2. スキャンするとアドレス帳に連絡先が追加されます",
          step3: "3. 標準的なvCard形式を使用"
        },
        text: {
          step1: "1. 任意のテキスト内容を入力",
          step2: "2. スキャンするとテキストが表示されます",
          step3: "3. メモ、コード、メッセージの共有に適している"
        }
      }
    }
  }
}