export const qrcodeZhTW = {
  tools: {
    qrcode: {
      title: "QR Code 產生器",
      description: "為 WiFi 網路、網址、聯絡人等產生 QR Code",
      
      qrCodeType: "QR Code 類型",
      settings: "設定",
      clearAll: "全部清除",
      
      types: {
        wifi: "WiFi 網路",
        url: "網站網址", 
        email: "電子郵件",
        phone: "電話號碼",
        sms: "簡訊訊息",
        contact: "聯絡人名片",
        text: "純文字"
      },
      
      wifi: {
        networkName: "網路名稱 (SSID)",
        networkPlaceholder: "輸入 WiFi 網路名稱...",
        securityType: "安全類型",
        wpa: "WPA/WPA2",
        wep: "WEP", 
        noPassword: "無密碼（開放）",
        password: "密碼",
        passwordPlaceholder: "輸入 WiFi 密碼...",
        hiddenNetwork: "隱藏網路"
      },
      
      url: {
        websiteUrl: "網站網址",
        placeholder: "https://example.com"
      },
      
      email: {
        address: "電子郵件地址",
        addressPlaceholder: "user@example.com",
        subject: "主旨",
        subjectPlaceholder: "郵件主旨...",
        message: "訊息",
        messagePlaceholder: "郵件訊息..."
      },
      
      phone: {
        phoneNumber: "電話號碼",
        placeholder: "+886-2-1234-5678"
      },
      
      sms: {
        message: "訊息",
        messagePlaceholder: "簡訊訊息..."
      },
      
      contact: {
        firstName: "名字",
        firstNamePlaceholder: "John",
        lastName: "姓氏",
        lastNamePlaceholder: "Doe",
        organization: "組織",
        organizationPlaceholder: "公司名稱",
        phone: "電話",
        phonePlaceholder: "+886-2-1234-5678",
        email: "電子郵件",
        emailPlaceholder: "john@example.com",
        website: "網站",
        websitePlaceholder: "https://example.com",
        address: "地址",
        addressPlaceholder: "123 主要街道，城市，州，郵遞區號"
      },
      
      text: {
        content: "文字內容",
        placeholder: "輸入要編碼的任何文字...",
        charactersCount: "{{count}} 個字元"
      },
      
      options: {
        title: "QR Code 選項",
        errorCorrection: "錯誤修正",
        low: "低 (7%)",
        medium: "中 (15%)",
        quartile: "四分之一 (25%)",
        high: "高 (30%)",
        size: "大小 (px)",
        margin: "邊距",
        darkColor: "深色",
        lightColor: "淺色"
      },
      
      output: {
        title: "QR Code",
        generationError: "產生錯誤",
        generating: "正在產生 QR Code...",
        altText: "產生的 QR Code",
        fillFields: "填寫必要欄位以產生 QR Code"
      },
      
      errors: {
        generationFailed: "QR Code 產生失敗",
        unknownError: "未知錯誤",
        invalidType: "無效的 QR 類型"
      },
      
      howToUse: {
        title: "使用方法：",
        wifi: {
          step1: "1. 輸入您的 WiFi 網路名稱 (SSID)",
          step2: "2. 選擇安全類型並輸入密碼（如需要）",
          step3: "3. 分享 QR Code 以便快速連接 WiFi",
          step4: "4. 使用者可以用相機應用程式掃描來連接"
        },
        url: {
          step1: "1. 輸入網站網址",
          step2: "2. 掃描 QR Code 時將開啟該網址",
          step3: "3. 適用於任何現代 QR 掃描器或相機應用程式"
        },
        email: {
          step1: "1. 輸入電子郵件地址和選擇性的主旨/訊息",
          step2: "2. 掃描後會開啟郵件應用程式並預填內容",
          step3: "3. 便於發送回饋或聯絡表單"
        },
        phone: {
          step1: "1. 輸入含國碼的電話號碼",
          step2: "2. 掃描後將提示撥打該號碼",
          step3: "3. 與大多數智慧型手機相容"
        },
        sms: {
          step2: "2. 新增選擇性的訊息文字"
        },
        contact: {
          step1: "1. 填寫聯絡人資訊",
          step2: "2. 掃描後會將聯絡人新增到通訊錄",
          step3: "3. 使用標準 vCard 格式"
        },
        text: {
          step1: "1. 輸入任何文字內容",
          step2: "2. 掃描後會顯示文字",
          step3: "3. 適合分享筆記、代碼或訊息"
        }
      }
    }
  }
}