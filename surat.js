// Confetti library
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);

function lihatSurat() {
  const namaInput = document.getElementById('nameInput').value.trim();
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      // Pencocokan nama tanpa case sensitive
      const nama = Object.keys(data).find(n => n.toLowerCase() === namaInput.toLowerCase());
      if (nama && data[nama].isi) {
        const isiSurat = data[nama].isi;
        const penutup = data[nama].penutup || "";

        document.getElementById('nama').innerText = nama;
        document.getElementById('isiSurat').innerText = isiSurat;
        document.getElementById('penutupCustom').innerText = penutup;

        document.getElementById('suratContainer').classList.remove('hidden');
        document.getElementById('formContainer').classList.add('hidden');

        // Musik
        const musik = document.getElementById('musik');
        musik.volume = 0.5;
        musik.play().catch(() => {});

        // Tampilkan confettiMore actions
        setTimeout(() => {
          // Mainkan efek suara confetti
          const confettiSound = document.getElementById('suaraConfetti');More actions
          confettiSound.play().catch(e => console.log("Suara confetti gagal: ", e));

          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
        }, 500);

      } else {
        alert("Nama tidak ditemukan. Pastikan kamu mengetik dengan benar.");
      }
    });
}




function kembali() {
  // Sembunyikan surat dan tampilkan input
  document.getElementById("suratContainer").classList.add("hidden");
  document.getElementById("formContainer").classList.remove("hidden");
  document.getElementById('nameInput').value = '';

  // Reset musik
  const musik = document.getElementById("musikLatar");
  musik.pause();
  musik.currentTime = 0;
  musik.play();
}

