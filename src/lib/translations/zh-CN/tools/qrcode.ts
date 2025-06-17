export const qrcodeZhCN = {
  tools: {
    qrcode: {
      title: "二维码生成器",
      description: "为 WiFi 网络、URL、联系人等生成二维码",
      
      qrCodeType: "二维码类型",
      settings: "设置",
      clearAll: "全部清除",
      
      types: {
        wifi: "WiFi 网络",
        url: "网站 URL", 
        email: "电子邮件",
        phone: "电话号码",
        sms: "短信消息",
        contact: "联系人名片",
        text: "纯文本"
      },
      
      wifi: {
        networkName: "网络名称 (SSID)",
        networkPlaceholder: "输入 WiFi 网络名称...",
        securityType: "安全类型",
        wpa: "WPA/WPA2",
        wep: "WEP", 
        noPassword: "无密码（开放）",
        password: "密码",
        passwordPlaceholder: "输入 WiFi 密码...",
        hiddenNetwork: "隐藏网络"
      },
      
      url: {
        websiteUrl: "网站 URL",
        placeholder: "https://example.com"
      },
      
      email: {
        address: "电子邮件地址",
        addressPlaceholder: "user@example.com",
        subject: "主题",
        subjectPlaceholder: "邮件主题...",
        message: "消息",
        messagePlaceholder: "邮件消息..."
      },
      
      phone: {
        phoneNumber: "电话号码",
        placeholder: "+86-138-1234-5678"
      },
      
      sms: {
        message: "消息",
        messagePlaceholder: "短信消息..."
      },
      
      contact: {
        firstName: "名",
        firstNamePlaceholder: "小明",
        lastName: "姓",
        lastNamePlaceholder: "张",
        organization: "组织",
        organizationPlaceholder: "公司名称",
        phone: "电话",
        phonePlaceholder: "+86-138-1234-5678",
        email: "电子邮件",
        emailPlaceholder: "zhang@example.com",
        website: "网站",
        websitePlaceholder: "https://example.com",
        address: "地址",
        addressPlaceholder: "北京市朝阳区建国路123号"
      },
      
      text: {
        content: "文本内容",
        placeholder: "输入任何要编码的文本...",
        charactersCount: "{{count}} 个字符"
      },
      
      options: {
        title: "二维码选项",
        errorCorrection: "纠错级别",
        low: "低 (7%)",
        medium: "中 (15%)",
        quartile: "四分之一 (25%)",
        high: "高 (30%)",
        size: "大小 (px)",
        margin: "边距",
        darkColor: "深色",
        lightColor: "浅色"
      },
      
      output: {
        title: "二维码",
        generationError: "生成错误",
        generating: "正在生成二维码...",
        altText: "生成的二维码",
        fillFields: "填写必填字段以生成二维码"
      },
      
      errors: {
        generationFailed: "二维码生成失败",
        unknownError: "未知错误",
        invalidType: "无效的二维码类型"
      },
      
      howToUse: {
        title: "使用方法：",
        wifi: {
          step1: "1. 输入您的 WiFi 网络名称 (SSID)",
          step2: "2. 选择安全类型并在需要时输入密码",
          step3: "3. 分享二维码以便轻松连接 WiFi",
          step4: "4. 用户可以使用相机应用扫描以连接"
        },
        url: {
          step1: "1. 输入网站 URL",
          step2: "2. 扫描二维码将打开 URL",
          step3: "3. 兼容任何现代二维码扫描器或相机应用"
        },
        email: {
          step1: "1. 输入电子邮件地址和可选的主题/消息",
          step2: "2. 扫描将打开电子邮件应用并预填内容",
          step3: "3. 便于发送反馈或联系表单"
        },
        phone: {
          step1: "1. 输入带国家代码的电话号码",
          step2: "2. 扫描将提示拨打号码",
          step3: "3. 兼容大多数智能手机"
        },
        sms: {
          step2: "2. 添加可选的消息文本"
        },
        contact: {
          step1: "1. 填写联系信息",
          step2: "2. 扫描将联系人添加到地址簿",
          step3: "3. 使用标准 vCard 格式"
        },
        text: {
          step1: "1. 输入任何文本内容",
          step2: "2. 扫描显示文本",
          step3: "3. 适合分享笔记、代码或消息"
        }
      }
    }
  }
}