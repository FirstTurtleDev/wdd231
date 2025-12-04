const courses = [
  { code: 'WDD101', title:'Intro to Web Dev', credits:3, dept:'WDD', completed:false },
  { code: 'WDD131', title:'Visual Design', credits:3, dept:'WDD', completed:false },
  { code: 'WDD231', title:'Intermediate Web Dev', credits:3, dept:'WDD', completed:false },
  { code: 'CSE121', title:'Intro to Computer Science', credits:4, dept:'CSE', completed:false },
  { code: 'CSE210', title:'Data Structures', credits:4, dept:'CSE', completed:false }
];

function renderCourses(list) {
  const container = document.getElementById('coursesContainer');
  const creditsEl = document.getElementById('creditsCount');
  if (!container) return;
  container.innerHTML = '';

  list.forEach(c => {
    const card = document.createElement('article');
    card.className = 'card' + (c.completed ? ' completed' : '');
    card.innerHTML = `
      <h3>${c.code} — ${c.title}</h3>
      <p>Dept: ${c.dept} • Credits: ${c.credits}</p>
      <p>Status: ${c.completed ? 'Completed' : 'Not completed'}</p>
    `;
    container.appendChild(card);
  });

  const total = list.reduce((sum, item) => sum + (item.credits || 0), 0);
  if (creditsEl) creditsEl.textContent = total;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCourses(courses);
  document.getElementById('showAll').addEventListener('click', () => renderCourses(courses));
  document.getElementById('showWDD').addEventListener('click', () => renderCourses(courses.filter(c => c.dept === 'WDD')));
  document.getElementById('showCSE').addEventListener('click', () => renderCourses(courses.filter(c => c.dept === 'CSE')));
});
