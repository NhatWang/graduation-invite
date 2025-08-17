const targetDate = new Date("2025-08-28T07:30:00").getTime();

function countdown() {
  const now = Date.now();
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
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      message: form.message.value,
      attending: form.attendance.value,
    };

    try {
      const res = await fetch('https://graduation-invite-jnuv.onrender.com/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Lỗi gửi dữ liệu");

      showToast('🎉 Gửi thành công!');
      form.reset();

      // 🔒 Xóa query trên URL nếu có
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      console.error(err);
      showToast('❌ Gửi thất bại!', 'error');
    }
  });
});

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "error" : ""}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add("exit"), 2000);  // Exit sau 2s
  setTimeout(() => toast.remove(), 3000);               // Remove sau 3s
}
