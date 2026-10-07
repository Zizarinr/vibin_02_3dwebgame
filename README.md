# Nature Exploration - 3D Web Game Prototype

Selamat datang di proyek **Nature Exploration**! 🌲✨

Proyek ini adalah eksperimen dan percobaan pertama saya dalam mempelajari **Three.js** untuk membuat dunia 3D interaktif di dalam web browser. Proyek ini dibangun secara interaktif menggunakan pendekatan *"vibe coding"* bersama **Antigravity by Google** (AI Coding Assistant).

## 🎮 Tentang Proyek Ini

Ini adalah *Minimum Viable Product* (MVP) untuk sebuah game web eksplorasi alam 3D. Proyek ini mengusung gaya visual **Comic / Toon Shading (Cel-shaded)** yang memberikan kesan seperti masuk ke dalam buku komik atau animasi kartun, alih-alih mencoba tampil serealistis mungkin.

### Fitur Utama Saat Ini:
- **Kamera First-Person (FPS):** Kamu bisa melihat dunia dari sudut pandang karakter menggunakan kontrol pergerakan klasik (W, A, S, D atau Panah) dan mengarahkan pandangan menggunakan *mouse* (menggunakan fitur `PointerLockAPI`).
- **Gaya Visual Kartun (Toon Shading):** Memanfaatkan `MeshToonMaterial` bawaan Three.js yang dipadukan dengan *custom gradient map* (pencahayaan berundak) serta *outline* hitam dasar (dengan teknik *Inverted Hull*) agar objek terlihat seperti digambar dengan tinta.
- **Dunia Prosedural Sederhana:** Daripada memuat model 3D yang berat di awal, proyek ini merender daratan (*terrain*) yang bergelombang dan ratusan pohon menggunakan `InstancedMesh` (demi performa yang sangat ringan) melalui rumus matematika langsung di dalam kode.
- **Sistem Fisika/Deteksi Dasar:** Kamera pemain secara otomatis bisa mendeteksi kontur naik-turunnya bukit daratan sehingga memberikan sensasi berjalan di atas tanah sungguhan.

## 🛠️ Teknologi yang Digunakan
- **HTML, CSS, dan JavaScript (Vanilla)**
- **[Three.js](https://threejs.org/):** Library 3D utama yang berjalan di atas WebGL.
- **[Vite](https://vitejs.dev/):** *Build tool* dan *dev server* yang modern dan super cepat.
- **Antigravity by Google:** AI Assistant yang menjadi teman *pair-programming* untuk merancang arsitektur, *troubleshooting*, dan melakukan proses *vibe coding*.

## 🚀 Cara Menjalankan Secara Lokal

Pastikan kamu sudah menginstal [Node.js](https://nodejs.org/) di komputermu.

1. Buka terminal di dalam folder proyek ini.
2. Instal semua *dependencies*:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan (*dev server*):
   ```bash
   npm run dev
   ```
4. Buka browser dan akses tautan yang tertera di terminal (biasanya `http://localhost:5173/`).

## 💡 Apa yang Bisa Dikembangkan Selanjutnya?

Karena proyek ini baru berupa "kanvas kosong" atau kerangka dasar, ada ruang tak terbatas untuk mengembangkannya. Berikut adalah beberapa ide yang bisa ditambahkan ke depannya:

1. **Menggunakan Aset 3D Kustom:** Mengganti bentuk dasar bawaan Three.js (tabung dan kerucut) dengan aset 3D betulan (format `.glb` atau `.gltf`) buatan sendiri menggunakan aplikasi seperti Blender (contoh: pohon beringin kartun, bebatuan, atau rumah kayu).
2. **Karakter & Kamera Third-Person:** Menambahkan model 3D untuk karakter utama yang dianimasikan, lalu memindahkan kamera agar mengikuti karakter dari belakang (*Third-Person*).
3. **Meningkatkan Suasana Lingkungan:**
   - Menambahkan *Skybox* (langit berupa kubus raksasa) bergaya lukisan dengan matahari dan awan.
   - Menambahkan efek daun-daun yang bergoyang tertiup angin menggunakan *custom vertex shaders*.
   - Menambahkan efek partikel kunang-kunang di malam hari.
4. **Menambahkan Gameplay Utama:** Memasukkan objek yang bisa berinteraksi, sistem skor (mengumpulkan koin/benda tersembunyi), atau papan petunjuk jalan yang bisa dibaca.
5. **Audio dan Sound Effect:** Memberikan *ambient sound* (suara jangkrik, burung hutan) dan efek suara langkah kaki di atas rumput.
6. **Penyempurnaan Post-Processing:** Mengganti *outline* sederhana dengan efek `OutlinePass` dari fitur *Post-processing* Three.js agar garis komiknya terlihat sempurna dan konsisten untuk semua bentuk objek 3D.

---
*Dibuat untuk belajar, bereksperimen, dan bersenang-senang di dunia WebGL.*
