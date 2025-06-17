export const qrcodeId = {
  tools: {
    qrcode: {
      title: "Generator Kode QR",
      description: "Hasilkan kode QR untuk jaringan WiFi, URL, kontak, dan lainnya",
      
      qrCodeType: "Tipe Kode QR",
      settings: "Pengaturan",
      clearAll: "Hapus Semua",
      
      types: {
        wifi: "Jaringan WiFi",
        url: "URL Situs Web", 
        email: "Email",
        phone: "Nomor Telepon",
        sms: "Pesan SMS",
        contact: "Kartu Kontak",
        text: "Teks Biasa"
      },
      
      wifi: {
        networkName: "Nama Jaringan (SSID)",
        networkPlaceholder: "Masukkan nama jaringan WiFi...",
        securityType: "Tipe Keamanan",
        wpa: "WPA/WPA2",
        wep: "WEP", 
        noPassword: "Tanpa Kata Sandi (Terbuka)",
        password: "Kata Sandi",
        passwordPlaceholder: "Masukkan kata sandi WiFi...",
        hiddenNetwork: "Jaringan tersembunyi"
      },
      
      url: {
        websiteUrl: "URL Situs Web",
        placeholder: "https://contoh.com"
      },
      
      email: {
        address: "Alamat Email",
        addressPlaceholder: "pengguna@contoh.com",
        subject: "Subjek",
        subjectPlaceholder: "Subjek email...",
        message: "Pesan",
        messagePlaceholder: "Pesan email..."
      },
      
      phone: {
        phoneNumber: "Nomor Telepon",
        placeholder: "+62-812-3456-7890"
      },
      
      sms: {
        message: "Pesan",
        messagePlaceholder: "Pesan SMS..."
      },
      
      contact: {
        firstName: "Nama Depan",
        firstNamePlaceholder: "Budi",
        lastName: "Nama Belakang",
        lastNamePlaceholder: "Santoso",
        organization: "Organisasi",
        organizationPlaceholder: "Nama Perusahaan",
        phone: "Telepon",
        phonePlaceholder: "+62-812-3456-7890",
        email: "Email",
        emailPlaceholder: "budi@contoh.com",
        website: "Situs Web",
        websitePlaceholder: "https://contoh.com",
        address: "Alamat",
        addressPlaceholder: "Jl. Utama No. 123, Kota, Provinsi, Kode Pos"
      },
      
      text: {
        content: "Konten Teks",
        placeholder: "Masukkan teks apa pun untuk dienkode...",
        charactersCount: "{{count}} karakter"
      },
      
      options: {
        title: "Opsi Kode QR",
        errorCorrection: "Koreksi Kesalahan",
        low: "Rendah (7%)",
        medium: "Sedang (15%)",
        quartile: "Kuartil (25%)",
        high: "Tinggi (30%)",
        size: "Ukuran (px)",
        margin: "Margin",
        darkColor: "Warna Gelap",
        lightColor: "Warna Terang"
      },
      
      output: {
        title: "Kode QR",
        generationError: "Kesalahan Generasi",
        generating: "Menghasilkan Kode QR...",
        altText: "Kode QR Terhasilkan",
        fillFields: "Isi kolom yang diperlukan untuk menghasilkan kode QR"
      },
      
      errors: {
        generationFailed: "Generasi Kode QR gagal",
        unknownError: "Kesalahan tidak diketahui",
        invalidType: "Tipe QR tidak valid"
      },
      
      howToUse: {
        title: "Cara menggunakan:",
        wifi: {
          step1: "1. Masukkan nama jaringan WiFi Anda (SSID)",
          step2: "2. Pilih tipe keamanan dan masukkan kata sandi jika diperlukan",
          step3: "3. Bagikan kode QR untuk koneksi WiFi yang mudah",
          step4: "4. Pengguna dapat memindai dengan aplikasi kamera untuk terhubung"
        },
        url: {
          step1: "1. Masukkan URL situs web",
          step2: "2. Kode QR akan membuka URL saat dipindai",
          step3: "3. Bekerja dengan pemindai QR modern atau aplikasi kamera apa pun"
        },
        email: {
          step1: "1. Masukkan alamat email dan subjek/pesan opsional",
          step2: "2. Pemindaian membuka aplikasi email dengan konten yang sudah terisi",
          step3: "3. Memudahkan untuk mengirim umpan balik atau formulir kontak"
        },
        phone: {
          step1: "1. Masukkan nomor telepon dengan kode negara",
          step2: "2. Pemindaian akan meminta untuk menelepon nomor tersebut",
          step3: "3. Kompatibel dengan sebagian besar smartphone"
        },
        sms: {
          step2: "2. Tambahkan teks pesan opsional"
        },
        contact: {
          step1: "1. Isi informasi kontak",
          step2: "2. Pemindaian menambahkan kontak ke buku alamat",
          step3: "3. Menggunakan format vCard standar"
        },
        text: {
          step1: "1. Masukkan konten teks apa pun",
          step2: "2. Pemindaian menampilkan teks",
          step3: "3. Bagus untuk berbagi catatan, kode, atau pesan"
        }
      }
    }
  }
}