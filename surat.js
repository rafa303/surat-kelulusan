const triggerKata = {
  "IPSA": "ipsa.jpg",
  "Bu Rofiqoh": "rofiqoh.jpg",
  "kelas 9": "kelas9.png",
  "hafalan": "alquran.png",
  "doa": "doa.png",
  "ustadz": "ustadz.png",
  "bismillah": "bismillah.png"
};

function buka() {
  const input = document.getElementById("nameInput").value.trim().toLowerCase();
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const namaDitemukan = Object.keys(data).find(n => n.toLowerCase() === input);
      if (!namaDitemukan) return alert("Nama tidak ditemukan.");

      const { isi, penutup } = data[namaDitemukan];
      document.getElementById("nama").innerText = namaDitemukan;
      document.getElementById("isiSurat").innerText = isi;
      document.getElementById("penutupCustom").innerText = penutup;

      document.getElementById("formContainer").classList.add("hidden");
      document.getElementById("suratContainer").classList.remove("hidden");

      const musik = document.getElementById("musikLatar");
      musik.currentTime = 0;
      musik.play();

      setTimeout(() => {
        const sfx = document.getElementById("suaraConfetti");
        sfx.play().catch(() => {});
        jalankanConfetti();
      }, 500);

      // Hapus gambar sebelumnya
      document.querySelectorAll('.gambar-konten').forEach(el => el.remove());

      // Cek dan tampilkan gambar sesuai isi surat
      const dimunculkan = new Set();
      Object.keys(triggerKata).forEach(kunci => {
        if (isi.includes(kunci) && !dimunculkan.has(kunci)) {
          const img = document.createElement("img");
          img.src = triggerKata[kunci];
          img.classList.add("gambar-konten");

          const posisi = ["left", "right", "top-left", "bottom-right"];
          const posisiTerpilih = posisi[Math.floor(Math.random() * posisi.length)];
          img.classList.add(`pos-${posisiTerpilih}`);

          const derajat = Math.floor(Math.random() * 31) - 15;
          img.style.transform = `rotate(${derajat}deg)`;

          document.querySelector(".surat").appendChild(img);
          dimunculkan.add(kunci);
        }
      });
    });
}

function kembali() {
  document.getElementById("suratContainer").classList.add("hidden");
  document.getElementById("formContainer").classList.remove("hidden");
  document.getElementById("nameInput").value = "";

  const musik = document.getElementById("musikLatar");
  musik.pause();
  musik.currentTime = 0;
}

function cetakSebagaiGambar() {
  const surat = document.querySelector('.surat');

  // Simpan style asli
  const originalStyle = {
    background: surat.style.background,
    color: surat.style.color
  };

  // Buat solid agar html2canvas tangkap jelas
  surat.style.background = "#fff";
  surat.style.color = "#000";

  // Tambahkan background white & teks hitam untuk semua anak
  surat.querySelectorAll("*").forEach(el => {
    el.style.color = "#000";
    el.style.background = "transparent";
  });

  html2canvas(surat).then(canvas => {
    const link = document.createElement('a');
    link.download = 'surat-kelulusan.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Kembalikan style semula
    surat.style.background = originalStyle.background;
    surat.style.color = originalStyle.color;
    surat.querySelectorAll("*").forEach(el => {
      el.style.color = "";
      el.style.background = "";
    });
  });
}

function jalankanConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  (function frame() {
    confetti(Object.assign({}, defaults, {
      particleCount: 5,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    }));
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
