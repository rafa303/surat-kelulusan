// Confetti library
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);

async function lihatSurat() {
  const nama = document.getElementById('nameInput').value.trim();
  const response = await fetch('data.json');
  const data = await response.json();

  const isiSurat = data[nama];
  if (isiSurat) {
    document.getElementById('nama').innerText = nama;
    document.getElementById('isiSurat').innerText = isiSurat;
    document.getElementById('suratContainer').classList.remove('hidden');

    // Mainkan musik
    const musik = document.getElementById('musik');
    musik.play();

    // Tampilkan confetti
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);

  } else {
    alert("Nama tidak ditemukan. Pastikan kamu mengetik dengan benar.");
  }
}


function kembali() {
  document.getElementById('suratContainer').classList.add('hidden');
  document.getElementById('nameInput').value = '';
}
