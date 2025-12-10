// order-modal.js
document.addEventListener('DOMContentLoaded', function() {

  // Seleccionar TODOS los botones con la clase 'btn-pedir'
  const openButtons = document.querySelectorAll('.btn-pedir');
  const modal = document.getElementById('order-modal');
  const closeBtn = document.getElementById('order-modal-close');
  const backdrop = document.getElementById('order-modal-backdrop');
  const form = document.getElementById('order-form');
  const msgBox = document.getElementById('order-form-msg');

  function showModal() {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    // focus primer input
    const first = modal.querySelector('input');
    if(first) first.focus();
  }

  function hideModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    msgBox.textContent = '';
  }

  // Abrir modal desde TODOS los botones
  openButtons.forEach(button => {
    button.addEventListener('click', showModal);
  });

  // Cerrar modal
  if(closeBtn) closeBtn.addEventListener('click', hideModal);
  if(backdrop) backdrop.addEventListener('click', hideModal);

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.classList.contains('show')) hideModal();
  });

  // ---------- ENVÍO A PHP ----------
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    msgBox.innerText = "";
    const btn = document.getElementById("submit-order");
    btn.disabled = true;
    btn.innerText = "Enviando...";

    const formData = new FormData(form);

    try {
      const response = await fetch("guardar_pedido.php", {
        method: "POST",
        body: formData
      });

      const result = await response.text();

      if (result.trim() === "success") {
        msgBox.style.color = "#064e3b";
        msgBox.innerText = "Pedido enviado correctamente ✔";
        form.reset();

        // cerrar modal luego de 2 segundos
        setTimeout(hideModal, 1800);

      } else {
        msgBox.style.color = "#b91c1c";
        msgBox.innerText = "Error al enviar el pedido ❌";
      }

    } catch (error) {
      msgBox.style.color = "#b91c1c";
      msgBox.innerText = "Error de conexión ❌";
      console.error(error);
    }

    btn.disabled = false;
    btn.innerText = "Pedir Contra entrega";
  });

});
