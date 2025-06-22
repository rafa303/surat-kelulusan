function bukaSurat() {
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
