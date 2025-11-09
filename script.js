const $ = s => document.querySelector(s);
const form = $('#payment-form');
const cardInput = $('#card');
const nameInput = $('#name');
const expiryInput = $('#expiry');
const cvcInput = $('#cvc');
const amountInput = $('#amount');
const payBtn = $('#pay-btn');

const vNumber = $('#visual-number');
const vName = $('#visual-name');
const vExp = $('#visual-exp');
const vAmount = $('#visual-amount');

function formatCardNumber(value) {
  return value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
}

function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\s+/g,'');
  let sum = 0; let toggle = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits.charAt(i), 10);
    if (toggle) { d *= 2; if (d > 9) d -= 9; }
    sum += d; toggle = !toggle;
  }
  return digits.length >= 12 && (sum % 10) === 0;
}

function formatExpiry(v) {
  const digits = v.replace(/\D/g,'').slice(0,4);
  if (digits.length < 3) return digits;
  return digits.slice(0,2) + '/' + digits.slice(2);
}

cardInput.addEventListener('input', e => {
  const formatted = formatCardNumber(e.target.value);
  e.target.value = formatted;
  vNumber.textContent = formatted || '•••• •••• •••• ••••';
  $('#card-error').textContent = '';
});

nameInput.addEventListener('input', e => {
  vName.textContent = e.target.value.toUpperCase() || 'NOM TITULAIRE';
  $('#name-error').textContent = '';
});

expiryInput.addEventListener('input', e => {
  e.target.value = formatExpiry(e.target.value);
  vExp.textContent = e.target.value || 'MM/AA';
  $('#expiry-error').textContent = '';
});

amountInput.addEventListener('input', e => {
  vAmount.textContent = parseFloat(e.target.value || 0).toFixed(2) + ' EUR';
});

function clearErrors() {
  ['#name-error','#card-error','#expiry-error','#cvc-error','#email-error','#global-error']
    .forEach(id => $(id).textContent = '');
}

form.addEventListener('submit', async ev => {
  ev.preventDefault(); clearErrors();
  let valid = true;

  if (!nameInput.value.trim()) {
    $('#name-error').textContent = 'Le nom est requis.'; valid = false;
  }
  const cardVal = cardInput.value.replace(/\s/g,'');
  if (!luhnCheck(cardVal)) {
    $('#card-error').textContent = 'Numéro de carte invalide.'; valid = false;
  }
  const exp = expiryInput.value.split('/');
  if (exp.length !== 2 || exp[0].length !== 2 || exp[1].length !== 2) {
    $('#expiry-error').textContent = 'Format MM/AA requis.'; valid = false;
  }
  const cvc = cvcInput.value.replace(/\D/g,'');
  if (cvc.length < 3 || cvc.length > 4) {
    $('#cvc-error').textContent = 'CVC invalide.'; valid = false;
  }
  const amount = parseFloat(amountInput.value || 0);
  if (amount <= 0) {
    $('#global-error').textContent = 'Le montant doit être supérieur à zéro.'; valid = false;
  }

  if (!valid) return;

  payBtn.setAttribute('aria-busy','true');
  payBtn.textContent = 'Traitement...';

  await new Promise(r => setTimeout(r, 1200)); // simulate API call

  $('#modal').classList.add('open');
  $('#modal-amount').textContent = amount.toFixed(2) + ' EUR';

  payBtn.removeAttribute('aria-busy');
  payBtn.textContent = 'Payer →';
});

$('#close-modal').addEventListener('click', () => {
  $('#modal').classList.remove('open');
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') $('#modal').classList.remove('open');
});

vAmount.textContent = parseFloat(amountInput.value || 0).toFixed(2) + ' EUR';
