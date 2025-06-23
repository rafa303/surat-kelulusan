// Daftar kata/frasa yang akan memicu gambar
const triggerKata = {
  "IPSA": "ipsa.png",
  "Bu Rofiqoh": "rofiqoh.png",
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

      // 🔄 Hapus semua gambar yang pernah ditambahkan
      document.querySelectorAll('.gambar-konten').forEach(img => img.remove());

      // 🔍 Cek apakah isi mengandung trigger kata
      const dimunculkan = new Set();
      Object.keys(triggerKata).forEach(kunci => {
        if (isi.includes(kunci) && !dimunculkan.has(kunci)) {
          const img = document.createElement("img");
          img.src = triggerKata[kunci];
          img.classList.add("gambar-konten");

          // 🎲 Posisi acak
          const posisi = ["left", "right", "top-left", "bottom-right"];
          const posisiTerpilih = posisi[Math.floor(Math.random() * posisi.length)];
          img.classList.add(`pos-${posisiTerpilih}`);

          // 🎲 Rotasi miring acak
          const derajat = Math.floor(Math.random() * 31) - 15;
          img.style.transform = `rotate(${derajat}deg)`;

          // 🌫️ Fade-in
          img.style.opacity = "0";
          setTimeout(() => {
            img.style.opacity = "0.85";
          }, 100);

          // 🔍 Zoom saat diklik
          img.onclick = () => {
            img.classList.toggle("zoomed");
          };

          document.getElementById("suratContainer").appendChild(img);
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
