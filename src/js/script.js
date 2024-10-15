document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");

  let currentInput = "";
  let previousInput = "";
  let operator = "";

  const buttons = document.querySelectorAll(".button");

  // Event listener untuk setiap tombol
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.value;

      if (value === "C") {
        clearDisplay();
      } else if (value === "=") {
        calculate();
      } else if (["+", "-", "*", "/"].includes(value)) {
        handleOperator(value);
      } else {
        appendNumber(value);
      }
    });
  });

  // Fungsi untuk menambahkan angka ke input
  function appendNumber(number) {
    // Cek agar titik desimal tidak bisa ditambahkan lebih dari satu kali
    if (number === "." && currentInput.includes(".")) return;

    currentInput += number;
    updateDisplay(currentInput);
  }

  // Fungsi untuk menangani operator
  function handleOperator(op) {
    if (currentInput === "") return; // Tidak lakukan apapun jika input kosong

    if (previousInput !== "") {
      calculate(); // Hitung jika ada input sebelumnya
    }

    operator = op;
    previousInput = currentInput; // Simpan input saat ini sebagai angka sebelumnya
    currentInput = ""; // Kosongkan input saat ini
  }

  // Fungsi untuk menghitung hasil
  function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // Jika input tidak valid, tidak lakukan apapun
    if (isNaN(prev) || isNaN(current)) return;

    // Hitung berdasarkan operator
    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
      default:
        return;
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
    updateDisplay(currentInput);
  }

  // Fungsi untuk membersihkan input dan display
  function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("0"); // Tampilkan 0 saat kalkulator di-reset
  }

  // Fungsi untuk memperbarui display
  function updateDisplay(value) {
    display.value = value;
  }

  // Inisialisasi display dengan nilai 0
  updateDisplay("0");
});
