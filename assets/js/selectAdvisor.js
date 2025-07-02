const datos = {
  1: { correo: "ol@reinvestarcg.com", telefono: "1 (201) 410-6098" },
  2: { correo: "oljr@reinvestarcg.com", telefono: "1 (201) 560-6938" },
  3: { correo: "ch@reinvestarcg.com", telefono: "1 (201) 554-3430" },
  4: { correo: "fd@reinvestarcg.com", telefono: "1 (407) 690-9635" },
  5: { correo: "pc@reinvestarcg.com", telefono: "1 (407) 242-2629" },
  6: { correo: "mo@reinvestarcg.com", telefono: "1 (551) 305-9050" },
  7: { correo: "simone@reinvestarcg.com", telefono: "1 (407) 496-2205" },
  8: { correo: "carlos@reinvestarcg.com", telefono: "1 (908) 267-8117" },
  9: { correo: "lf@reinvestarcg.com", telefono: "1 (754) 707-3746" },
  10: { correo: "ac@reinvestarcg.com", telefono: "1 (813) 904-1630" },
  11: { correo: "sc@reinvestarcg.com", telefono: "1 (908) 348-3716" },
  12: { correo: "gd@reinvestarcg.com", telefono: "1 (440) 991-7712" },
  13: { correo: "au@reinvestarcg.com", telefono: "1 (407) 502-9711" },
  14: { correo: "vpg@reinvestarcg.com", telefono: "1 (407) 502-9711" },
  15: { correo: "moa@reinvestarcg.com", telefono: "1 (407) 502-9711" },
  16: { correo: "cb@reinvestarcg.com", telefono: "1 (980) 403-7102" },
  17: { correo: "juliolbroker@gmail.com", telefono: "1 (407) 467-9411" },
  18: { correo: "ja@reinvestarcg.com", telefono: "1 (407) 946-0160" },
  19: { correo: "Pb@reinvestarcg.com", telefono: "1 (407) 990-7657" }
};

const contacto = document.getElementById("advisor");
const correo = document.getElementById("email");
const telefono = document.getElementById("phone");

function actualizarDatos() {
  const id = contacto.value;
  if (datos[id]) {
    correo.textContent = datos[id].correo;
    correo.href = "mailto:" + datos[id].correo;
    telefono.textContent = datos[id].telefono;
    telefono.href = "tel:" + datos[id].telefono.replace(/[^0-9]/g, '');
    const advisorName = contacto.options[contacto.selectedIndex].textContent.trim();
    document.getElementById('advisorId').value = id;
    document.getElementById('advisorFullName').value = advisorName;
    document.getElementById('advisor_email').value = datos[id].correo;
    document.getElementById('advisor_phone').value = datos[id].telefono;
  } else {
    correo.textContent = "-";
    correo.href = "#";
    telefono.textContent = "-";
    telefono.href = "#";
    document.getElementById('advisorId').value = "";
    document.getElementById('advisorFullName').value = "";
    document.getElementById('advisor_email').value = "";
    document.getElementById('advisor_phone').value = "";
  }
}

// Asignar el evento también por JS para compatibilidad
contacto.addEventListener("change", actualizarDatos);