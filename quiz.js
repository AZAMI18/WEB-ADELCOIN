const quizData = [
  { tgl: '2025-05-16', soal: 'Apa warna favorit Adel?', opsi: ['Merah', 'Pink', 'Hitam', 'Biru'], jawab: 'Pink' },
  { tgl: '2025-05-17', soal: 'Siapa oshi kamu di JKT48?', opsi: ['Adel', 'Freya', 'Gracia', 'Christy'], jawab: 'Adel' },
  // Tambah 28 soal lagi sesuai tanggal
];

const today = new Date().toISOString().slice(0, 10);
const q = quizData.find(q => q.tgl === today);
const box = document.getElementById('quiz-box');

if (!q) {
  box.innerHTML = '<p>Tidak ada pertanyaan hari ini!</p>';
} else {
  // Cek apakah sudah jawab hari ini
  const sudahJawab = localStorage.getItem("jawab_" + today);
  
  if (sudahJawab) {
    box.innerHTML = `<h2>${q.soal}</h2><p>Kamu sudah menjawab soal ini. Jawabanmu: <b>${sudahJawab}</b></p>`;
  } else {
    box.innerHTML = `<h2>${q.soal}</h2>` + q.opsi.map(o => `<button class="btn-jawab" onclick="jawab('${o}', this)">${o}</button>`).join('');
  }
}

function jawab(pilihan, btn) {
  // Cek jika sudah pernah jawab, prevent dobel
  const sudahJawab = localStorage.getItem("jawab_" + today);
  if (sudahJawab) {
    alert("Kamu sudah menjawab pertanyaan ini!");
    return;
  }
  
  if (pilihan === q.jawab) {
    const poinSekarang = parseInt(localStorage.getItem("poin") || 0);
    localStorage.setItem("poin", poinSekarang + 50);
    alert("Benar! +50 poin");
  } else {
    alert("Salah!");
  }
  
  // Simpan jawaban supaya gak bisa jawab ulang
  localStorage.setItem("jawab_" + today, pilihan);
  
  // Disable semua tombol setelah jawab
  const semuaBtn = document.querySelectorAll(".btn-jawab");
  semuaBtn.forEach(b => b.disabled = true);
  
  // Beri tanda jawaban yang dipilih
  btn.style.backgroundColor = "#aaa";
  
  // Redirect setelah delay 1 detik supaya user bisa lihat alert dulu
  setTimeout(() => {
    window.location.href = "beranda.html";
  }, 1000);
}