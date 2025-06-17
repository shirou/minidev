export const chmodCalculatorId = {
  tools: {
    chmodCalculator: {
      title: "Kalkulator Chmod",
      description: "Hitung perizinan berkas Unix dengan antarmuka visual dan konversi oktal/simbolik",
      visualMode: "Mode Visual",
      inputMode: "Mode Input",
      permissions: "Perizinan",
      owner: "Pemilik",
      group: "Grup", 
      others: "Lainnya",
      read: "Baca",
      write: "Tulis",
      execute: "Eksekusi",
      specialBits: "Bit Khusus",
      setuid: "Setuid",
      setgid: "Setgid", 
      sticky: "Sticky Bit",
      directInput: "Input Langsung",
      octalInput: "Oktal (contoh: 755)",
      symbolicInput: "Simbolik (contoh: rwxr-xr-x)",
      presets: "Preset Umum",
      results: "Hasil",
      octal: "Oktal",
      symbolic: "Simbolik",
      resultDescription: "Deskripsi",
      securityWarnings: "Peringatan Keamanan",
      permissionGuide: "Panduan Perizinan",
      // Permission explanations
      readExplanation: "Lihat isi berkas atau daftar isi direktori",
      writeExplanation: "Ubah isi berkas atau buat/hapus berkas dalam direktori",
      executeExplanation: "Jalankan berkas sebagai program atau akses direktori",
      setuidExplanation: "Jalankan dengan hak akses pemilik berkas (berkas eksekusi)",
      setgidExplanation: "Jalankan dengan hak akses grup berkas atau warisi grup (direktori)",
      stickyExplanation: "Hanya pemilik berkas dapat menghapus berkas dalam direktori (biasanya /tmp)",
      // Security warnings
      worldWritableWarning: "Dapat ditulis semua orang: Siapa saja dapat mengubah berkas ini (risiko keamanan)",
      fullPermissionsWarning: "Perizinan penuh untuk semua orang (777): Sangat berbahaya",
      setuidWorldWritableWarning: "Setuid + dapat ditulis semua orang: Kerentanan keamanan kritis",
      noOwnerPermissionsWarning: "Pemilik tidak memiliki perizinan: Berkas mungkin tidak dapat diakses"
    }
  }
}