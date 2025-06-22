async function lihatSurat() {
  const nama = document.getElementById('nameInput').value.trim();
  const response = await fetch('data.json');
  const data = await response.json();

  const isiSurat = data[nama];
  if (isiSurat) {
    document.getElementById('nama').innerText = nama;
    document.getElementById('isiSurat').innerText = isiSurat;
    document.getElementById('suratContainer').classList.remove('hidden');
  } else {
    alert("Nama tidak ditemukan. Pastikan kamu mengetik dengan benar.");
  }
}

function kembali() {
  document.getElementById('suratContainer').classList.add('hidden');
  document.getElementById('nameInput').value = '';
}
