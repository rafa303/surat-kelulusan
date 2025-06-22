// Confetti library
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);

function lihatSurat() {
  const nama = document.getElementById('nameInput').value.trim();
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      const isiSurat = data[nama];
      if (isiSurat) {
        document.getElementById('nama').innerText = nama;
        document.getElementById('isiSurat').innerText = isiSurat;
        document.getElementById('suratContainer').classList.remove('hidden');

        // Mainkan musik hanya setelah klik (ini dianggap interaksi sah)
        const musik = document.getElementById('musik');
        musik.volume = 0.5; // setel volume
        musik.play().catch(e => {
          console.log("Autoplay diblokir, klik diperlukan: ", e);
        });

        // Tampilkan confetti
        setTimeout(() => {
          // Mainkan efek suara confetti
          const confettiSound = document.getElementById('suaraConfetti');
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
  document.getElementById('suratContainer').classList.add('hidden');
  document.getElementById('nameInput').value = '';
}
