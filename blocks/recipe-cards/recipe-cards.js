export default function decorate(block) {
  const rows = [...block.children];
  
  // Extract header (first 2 rows)
  const headingRow = rows[0];
  const descriptionRow = rows[1];
  const heading = headingRow?.querySelector('div:nth-child(2)')?.textContent.trim();
  const description = descriptionRow?.querySelector('div:nth-child(2)')?.textContent.trim();

  // Extract categories (row 3)
  const categoriesRow = rows[2];
  const categoriesText = categoriesRow?.querySelector('div:nth-child(2)')?.textContent.trim();
  const categories = categoriesText ? categoriesText.split(',').map(c => c.trim()) : [];

  // Extract recipe cards (remaining rows)
  const recipeRows = rows.slice(3);

  // Build new structure
  block.innerHTML = '';

  // Header section
  const header = document.createElement('div');
  header.className = 'recipe-cards-header';

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    header.appendChild(h2);
  }

  if (description) {
    const p = document.createElement('p');
    p.textContent = description;
    header.appendChild(p);
  }

  block.appendChild(header);

  // Category filters
  if (categories.length > 0) {
    const filters = document.createElement('div');
    filters.className = 'recipe-filters';

    categories.forEach((category, index) => {
      const button = document.createElement('button');
      button.textContent = category;
      button.className = index === 0 ? 'active' : '';
      button.addEventListener('click', () => {
        filters.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
      });
      filters.appendChild(button);
    });

    block.appendChild(filters);
  }

  // Recipe grid
  const grid = document.createElement('div');
  grid.className = 'recipe-grid';

  recipeRows.forEach((row) => {
    const cols = row.querySelectorAll('div');
    if (cols.length >= 3) {
      const picture = cols[0]?.querySelector('picture');
      const title = cols[1]?.textContent.trim();
      const ingredients = cols[2]?.textContent.trim();

      const card = document.createElement('div');
      card.className = 'recipe-card';

      if (picture) {
        card.appendChild(picture);
      }

      const content = document.createElement('div');
      content.className = 'recipe-content';

      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title;
        content.appendChild(h3);
      }

      if (ingredients) {
        const p = document.createElement('p');
        p.textContent = ingredients;
        content.appendChild(p);
      }

      card.appendChild(content);
      grid.appendChild(card);
    }
  });

  block.appendChild(grid);
}
