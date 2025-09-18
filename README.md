[![banner1](bggit.png)](https://temanhire.com/)


# TemanHire.com
Selesaikan Proses hiring hanya dalam 1 Platform Terintegrasi. Dapatkan kandidat terbaik dengan teknologi AI kami! TemanHire.com merupakan platform web yang memudahkan proses rekrutmen dari awal hingga akhir. Dengan produk AI canggih seperti AI Instant Interview, AI Based Hiring Prediction, dan AI Based Consult, TemanHire.com membantu Anda dalam mempercepat proses hiring.

Repository ini berisi kode untuk web TemanHire.com, yang dibangun menggunakan Next.js, TypeScript, dan Tailwind CSS.

## Features
Aplikasi ini mencakup fitur-fitur berikut:
- Halaman Beranda yang menarik
- Halaman Tentang Kami
- Halaman Layanan
- Halaman Kontak
- Halaman News Feed
- Integrasi dengan API external (Hiring Prediction, DeepSeek, Guardian)
- Responsif dan dioptimalkan untuk berbagai perangkat


## Local Setup

first, clone the repository:

```bash
git clone https://github.com/4Kings-Rakamin/TemanHire.com
cd TemanHire.com
```
Then, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Contact Agung for API Keys
Please reach out to "github/AgungHari" for the necessary API keys to access the external services integrated into this project.

## Create .env.local
After that create a `.env.local` file in the root directory of the project and add the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL= <Contact_Agung>
NEXT_PUBLIC_SUPABASE_ANON_KEY= <Contact_Agung>

AI_API_URL= <Contact_Agung>
OPENROUTER_API_KEY= <Contact_Agung>
GUARDIAN_API_KEY= <Contact_Agung>

```

## Getting Started

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Done

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.