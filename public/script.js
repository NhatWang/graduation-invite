const targetDate = new Date("2025-08-28T07:30:00").getTime();

  function countdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML = "🎓 Đã đến lúc!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
  }

  setInterval(countdown, 1000);
  countdown();
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvpForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value,
        message: form.message.value,
        attending: form.attendance.value,
      };

      await fetch('https://graduation-invite-jnuv.onrender.com/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      showToast('🎉 Gửi thành công!');
      form.reset();
    });
  }
});
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "error" : ""}`;
  toast.textContent = message;

  container.appendChild(toast);

   // Sau 3s, thêm class .exit để trượt ra phải
  setTimeout(() => {
    toast.classList.add("exit");
  }, 3000);

  // Sau 2s, xoá khỏi DOM
  setTimeout(() => {
    toast.remove();
  }, 2000);
}