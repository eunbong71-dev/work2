// script.js – 간단 로컬 저장소 기반 신청 폼

// 저장된 신청자 목록을 로드하거나 초기화
function loadRegistrations() {
  const data = localStorage.getItem('registrations');
  return data ? JSON.parse(data) : [];
}

function saveRegistrations(list) {
  localStorage.setItem('registrations', JSON.stringify(list));
}

function renderList() {
  const list = loadRegistrations();
  const ul = document.getElementById('registrationsList');
  ul.innerHTML = '';
  list.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = `${item.studentId} – ${item.name}`;
    const btn = document.createElement('button');
    btn.textContent = '취소';
    btn.className = 'cancel-btn';
    btn.dataset.index = idx;
    btn.addEventListener('click', onCancel);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const studentId = form.studentId.value.trim();
  const name = form.name.value.trim();
  if (!studentId || !name) return;
  const list = loadRegistrations();
  list.push({ studentId, name });
  saveRegistrations(list);
  renderList();
  form.reset();
  document.querySelector('.thanks').hidden = false;
  setTimeout(() => (document.querySelector('.thanks').hidden = true), 3000);
}

function onCancel(e) {
  const idx = Number(e.target.dataset.index);
  const list = loadRegistrations();
  list.splice(idx, 1);
  saveRegistrations(list);
  renderList();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvpForm');
  form.addEventListener('submit', onSubmit);
  renderList();
});
// Admin: reset all registrations
function resetAll() {
  if (confirm('정말 모든 신청을 초기화하시겠습니까?')) {
    localStorage.removeItem('registrations');
    renderList();
  }
}

document.getElementById('resetAllBtn')?.addEventListener('click', resetAll);
