const triggerKata = {
  
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
      alert("⚠️ Bahaya! Mengandung Bawang!");

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

      // Tampilkan gambar dinamis sesuai kata kunci
      const dimunculkan = new Set();
      let gambarIndex = 0;

      Object.keys(triggerKata).forEach(kunci => {
        if (isi.includes(kunci) && !dimunculkan.has(kunci)) {
          const img = document.createElement("img");
          img.src = triggerKata[kunci];
          img.classList.add("gambar-konten");

          const surat = document.querySelector('.surat');
          const arah = Math.random() > 0.5 ? "left" : "right";
          const jarakPinggir = -80;
          const topPos = 100 + gambarIndex * 120;

          if (arah === "left") {
            img.style.left = `${jarakPinggir}px`;
          } else {
            img.style.right = `${jarakPinggir}px`;
          }
          img.style.top = `${topPos}px`;

          const derajat = Math.floor(Math.random() * 31) - 15;
          img.style.transform = `rotate(${derajat}deg)`;

          img.onclick = () => {
            img.classList.toggle("zoomed");
          };

          surat.appendChild(img);
          dimunculkan.add(kunci);
          gambarIndex++;
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
  // Sembunyikan tombol saat render
  const tombolSementara = document.querySelectorAll('.non-printable');
  tombolSementara.forEach(el => el.style.display = "none");

  // Simpan style asli surat
  const originalStyles = {
    background: surat.style.background,
    color: surat.style.color
  };

  // Simpan style semua elemen teks di dalam surat
  const allChildren = surat.querySelectorAll("*");
  const originalTextColors = [];

  allChildren.forEach(el => {
    originalTextColors.push(el.style.color);
    el.style.color = "#000"; // ubah semua teks jadi hitam
    el.style.background = "transparent"; // hilangkan transparansi
  });

  // Gambar-gambar dekorasi disembunyikan
  const dekoratif = surat.querySelectorAll('.gambar-konten');
  dekoratif.forEach(img => {
    img.style.display = "none";
  });

  // Ubah background jadi putih solid
  surat.style.background = "#ffffff";
  surat.style.color = "#000000";

  // Render dan simpan
  html2canvas(surat, { scale: 2 }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'surat-kelulusan.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Kembalikan semua style
    surat.style.background = originalStyles.background;
    surat.style.color = originalStyles.color;
    tombolSementara.forEach(el => el.style.display = "");

    allChildren.forEach((el, i) => {
      el.style.color = originalTextColors[i];
      el.style.background = "";
    });

    dekoratif.forEach(img => {
      img.style.display = "";
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
