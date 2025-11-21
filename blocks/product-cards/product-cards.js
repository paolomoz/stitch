export default function decorate(block) {
  const rows = [...block.children];
  
  // Extract header
  const headingRow = rows[0];
  const heading = headingRow?.querySelector('div:nth-child(2)')?.textContent.trim();

  // Extract product cards (remaining rows)
  const productRows = rows.slice(1);

  // Build new structure
  block.innerHTML = '';

  // Header
  if (heading) {
    const header = document.createElement('div');
    header.className = 'product-cards-header';
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    header.appendChild(h2);
    block.appendChild(header);
  }

  // Product grid
  const grid = document.createElement('div');
  grid.className = 'product-grid';

  productRows.forEach((row) => {
    const cols = row.querySelectorAll('div');
    if (cols.length >= 5) {
      const picture = cols[0]?.querySelector('picture');
      const badge = cols[1]?.textContent.trim();
      const title = cols[2]?.textContent.trim();
      const description = cols[3]?.textContent.trim();
      const price = cols[4]?.textContent.trim();
      const ctaText = cols[5]?.querySelector('a')?.textContent.trim();
      const ctaLink = cols[5]?.querySelector('a')?.href;

      const card = document.createElement('div');
      card.className = 'product-card';
      
      // Add featured class if badge exists
      if (badge) {
        card.classList.add('featured');
        const badgeDiv = document.createElement('div');
        badgeDiv.className = 'product-badge';
        badgeDiv.textContent = badge;
        card.appendChild(badgeDiv);
      }

      if (picture) {
        card.appendChild(picture);
      }

      const content = document.createElement('div');
      content.className = 'product-content';

      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title;
        content.appendChild(h3);
      }

      if (description) {
        const p = document.createElement('p');
        p.textContent = description;
        content.appendChild(p);
      }

      if (price) {
        const priceP = document.createElement('p');
        priceP.className = 'product-price';
        priceP.textContent = price;
        content.appendChild(priceP);
      }

      card.appendChild(content);

      if (ctaText && ctaLink) {
        const button = document.createElement('a');
        button.href = ctaLink;
        button.className = 'button primary';
        button.textContent = ctaText;
        card.appendChild(button);
      }

      grid.appendChild(card);
    }
  });

  block.appendChild(grid);
}
