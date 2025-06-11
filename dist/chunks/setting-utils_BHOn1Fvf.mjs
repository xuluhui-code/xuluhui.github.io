import './content-utils_onHVu7ur.mjs';

function getDefaultHue() {
  const fallback = "250";
  const configCarrier = document.getElementById("config-carrier");
  return Number.parseInt(configCarrier?.dataset.hue || fallback);
}
function getHue() {
  const stored = localStorage.getItem("hue");
  return stored ? Number.parseInt(stored) : getDefaultHue();
}
function setHue(hue) {
  localStorage.setItem("hue", String(hue));
  const r = document.querySelector(":root");
  if (!r) {
    return;
  }
  r.style.setProperty("--hue", String(hue));
}

export { getDefaultHue, getHue, setHue };
