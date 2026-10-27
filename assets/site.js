const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
});

const search = document.querySelector('#paper-search');
if (search) {
  let category = 'all';
  const filters = [...document.querySelectorAll('[data-filter]')];
  const sections = [...document.querySelectorAll('.research-section')];
  function filterPapers() {
    const query = search.value.trim().toLocaleLowerCase();
    let total = 0;
    sections.forEach(section => {
      const selected = category === 'all' || section.dataset.section === category;
      let sectionTotal = 0;
      section.querySelectorAll('.paper-year').forEach(year => {
        let yearTotal = 0;
        year.querySelectorAll('.paper').forEach(paper => {
          const visible = selected && paper.textContent.toLocaleLowerCase().includes(query);
          paper.hidden = !visible;
          if (visible) yearTotal++;
        });
        year.hidden = yearTotal === 0;
        sectionTotal += yearTotal;
      });
      section.hidden = sectionTotal === 0;
      total += sectionTotal;
    });
    document.querySelector('#search-count').textContent = query ? `${total} ${total === 1 ? 'paper' : 'papers'} found` : '';
    document.querySelector('.empty-results').hidden = total !== 0;
  }
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    filterPapers();
  }));
  search.addEventListener('input', filterPapers);
}
