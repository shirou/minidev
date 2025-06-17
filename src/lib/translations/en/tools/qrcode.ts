export const qrcodeEn = {
  tools: {
    qrcode: {
      title: "QR Code Generator",
      description: "Generate QR codes for WiFi networks, URLs, contacts, and more",
      
      qrCodeType: "QR Code Type",
      settings: "Settings",
      clearAll: "Clear All",
      
      types: {
        wifi: "WiFi Network",
        url: "Website URL", 
        email: "Email",
        phone: "Phone Number",
        sms: "SMS Message",
        contact: "Contact Card",
        text: "Plain Text"
      },
      
      wifi: {
        networkName: "Network Name (SSID)",
        networkPlaceholder: "Enter WiFi network name...",
        securityType: "Security Type",
        wpa: "WPA/WPA2",
        wep: "WEP", 
        noPassword: "No Password (Open)",
        password: "Password",
        passwordPlaceholder: "Enter WiFi password...",
        hiddenNetwork: "Hidden network"
      },
      
      url: {
        websiteUrl: "Website URL",
        placeholder: "https://example.com"
      },
      
      email: {
        address: "Email Address",
        addressPlaceholder: "user@example.com",
        subject: "Subject",
        subjectPlaceholder: "Email subject...",
        message: "Message",
        messagePlaceholder: "Email message..."
      },
      
      phone: {
        phoneNumber: "Phone Number",
        placeholder: "+1-555-123-4567"
      },
      
      sms: {
        message: "Message",
        messagePlaceholder: "SMS message..."
      },
      
      contact: {
        firstName: "First Name",
        firstNamePlaceholder: "John",
        lastName: "Last Name",
        lastNamePlaceholder: "Doe",
        organization: "Organization",
        organizationPlaceholder: "Company Name",
        phone: "Phone",
        phonePlaceholder: "+1-555-123-4567",
        email: "Email",
        emailPlaceholder: "john@example.com",
        website: "Website",
        websitePlaceholder: "https://example.com",
        address: "Address",
        addressPlaceholder: "123 Main St, City, State, ZIP"
      },
      
      text: {
        content: "Text Content",
        placeholder: "Enter any text to encode...",
        charactersCount: "{{count}} characters"
      },
      
      options: {
        title: "QR Code Options",
        errorCorrection: "Error Correction",
        low: "Low (7%)",
        medium: "Medium (15%)",
        quartile: "Quartile (25%)",
        high: "High (30%)",
        size: "Size (px)",
        margin: "Margin",
        darkColor: "Dark Color",
        lightColor: "Light Color"
      },
      
      output: {
        title: "QR Code",
        generationError: "Generation Error",
        generating: "Generating QR Code...",
        altText: "Generated QR Code",
        fillFields: "Fill in the required fields to generate QR code"
      },
      
      errors: {
        generationFailed: "QR Code generation failed",
        unknownError: "Unknown error",
        invalidType: "Invalid QR type"
      },
      
      howToUse: {
        title: "How to use:",
        wifi: {
          step1: "1. Enter your WiFi network name (SSID)",
          step2: "2. Select the security type and enter password if needed",
          step3: "3. Share the QR code for easy WiFi connection",
          step4: "4. Users can scan with their camera app to connect"
        },
        url: {
          step1: "1. Enter the website URL",
          step2: "2. The QR code will open the URL when scanned",
          step3: "3. Works with any modern QR scanner or camera app"
        },
        email: {
          step1: "1. Enter email address and optional subject/message",
          step2: "2. Scanning opens email app with pre-filled content",
          step3: "3. Makes it easy to send feedback or contact forms"
        },
        phone: {
          step1: "1. Enter phone number with country code",
          step2: "2. Scanning will prompt to call the number",
          step3: "3. Compatible with most smartphones"
        },
        sms: {
          step2: "2. Add optional message text"
        },
        contact: {
          step1: "1. Fill in contact information",
          step2: "2. Scanning adds contact to address book",
          step3: "3. Uses standard vCard format"
        },
        text: {
          step1: "1. Enter any text content",
          step2: "2. Scanning displays the text",
          step3: "3. Good for sharing notes, codes, or messages"
        }
      }
    }
  }
}