import React from 'react';
import { Shield, Eye, Lock, Database, Mail, AlertCircle } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Pengantar</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Kami menghargai kepercayaan Anda dan berkomitmen untuk melindungi privasi dan keamanan informasi pribadi Anda. 
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda 
              ketika menggunakan layanan kami.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Informasi yang Kami Kumpulkan</h2>
            </div>
            <div className="space-y-4">
              <div className=" -50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Informasi Pribadi</h3>
                <ul className="text-gray-700 space-y-1 list-disc list-inside">
                  <li>Nama lengkap dan informasi kontak</li>
                  <li>Alamat email dan nomor telepon</li>
                  <li>Alamat fisik (jika diperlukan)</li>
                  <li>Informasi pembayaran (jika berlaku)</li>
                </ul>
              </div>
              <div className=" -50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Informasi Teknis</h3>
                <ul className="text-gray-700 space-y-1 list-disc list-inside">
                  <li>Alamat IP dan lokasi geografis</li>
                  <li>Jenis browser dan sistem operasi</li>
                  <li>Data penggunaan dan aktivitas di situs web</li>
                  <li>Cookie dan teknologi pelacakan serupa</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Bagaimana Kami Menggunakan Informasi</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Tujuan Utama</h3>
                <ul className="text-blue-800 space-y-1 list-disc list-inside text-sm">
                  <li>Menyediakan dan meningkatkan layanan</li>
                  <li>Memproses transaksi dan pembayaran</li>
                  <li>Berkomunikasi dengan pengguna</li>
                  <li>Memberikan dukungan pelanggan</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Tujuan Sekunder</h3>
                <ul className="text-green-800 space-y-1 list-disc list-inside text-sm">
                  <li>Analisis dan penelitian</li>
                  <li>Pemasaran yang disesuaikan</li>
                  <li>Keamanan dan pencegahan penipuan</li>
                  <li>Kepatuhan hukum dan regulasi</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Pembagian Informasi</h2>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
              <p className="text-amber-800 font-medium mb-2">Kami tidak akan menjual informasi pribadi Anda kepada pihak ketiga.</p>
              <p className="text-amber-700 text-sm">
                Kami hanya membagikan informasi dalam situasi tertentu seperti:
              </p>
              <ul className="text-amber-700 text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Dengan persetujuan eksplisit Anda</li>
                <li>Untuk memenuhi kewajiban hukum</li>
                <li>Dengan penyedia layanan tepercaya yang membantu operasional kami</li>
                <li>Dalam kasus merger atau akuisisi bisnis</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Keamanan Data</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kami menerapkan langkah-langkah keamanan teknis, administratif, dan fisik yang sesuai 
              untuk melindungi informasi pribadi Anda dari akses yang tidak sah, penggunaan, atau pengungkapan.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4  -50 rounded-lg">
                <Lock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Enkripsi</h4>
                <p className="text-sm text-gray-600">SSL/TLS untuk transmisi data</p>
              </div>
              <div className="text-center p-4  -50 rounded-lg">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Akses Terbatas</h4>
                <p className="text-sm text-gray-600">Hanya karyawan yang berwenang</p>
              </div>
              <div className="text-center p-4  -50 rounded-lg">
                <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">Backup Aman</h4>
                <p className="text-sm text-gray-600">Pencadangan data yang terenkripsi</p>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hak Pengguna</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-blue-900 font-medium mb-3">Anda memiliki hak untuk:</p>
              <div className="grid md:grid-cols-2 gap-3">
                <ul className="text-blue-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Mengakses informasi pribadi yang kami simpan tentang Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Meminta koreksi data yang tidak akurat atau tidak lengkap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Meminta penghapusan informasi pribadi Anda</span>
                  </li>
                </ul>
                <ul className="text-blue-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Membatasi pemrosesan data pribadi Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Portabilitas data dalam format yang dapat dibaca</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">Menolak pemrosesan untuk tujuan pemasaran</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Penggunaan Cookie</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman Anda, 
              menganalisis penggunaan situs web, dan menyediakan konten yang dipersonalisasi.
            </p>
            <div className=" -50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Jenis Cookie yang Kami Gunakan:</h3>
              <ul className="text-gray-700 space-y-1 list-disc list-inside">
                <li><strong>Cookie Esensial:</strong> Diperlukan untuk fungsi dasar situs web</li>
                <li><strong>Cookie Analitik:</strong> Membantu kami memahami cara penggunaan situs web</li>
                <li><strong>Cookie Fungsional:</strong> Menyimpan preferensi dan pengaturan Anda</li>
                <li><strong>Cookie Pemasaran:</strong> Digunakan untuk menampilkan iklan yang relevan</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Hubungi Kami</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda, 
                silakan hubungi kami:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> privacy@company.com</p>
                <p><strong>Telepon:</strong> +62 21 1234 5678</p>
                <p><strong>Alamat:</strong> Jl. Contoh No. 123, Jakarta 12345, Indonesia</p>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pembaruan Kebijakan</h2>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan 
                perubahan dalam praktik kami atau untuk alasan operasional, hukum, atau regulasi lainnya. 
                Kami akan memberitahu Anda tentang perubahan material melalui email atau pemberitahuan 
                yang mencolok di situs web kami.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            © 2025 TemanHire. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;