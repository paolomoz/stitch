export default function decorate(block) {
  const [headingRow, descriptionRow, ...featureRows] = [...block.children];

  // Extract header content
  const heading = headingRow?.querySelector('div:nth-child(2)')?.textContent.trim();
  const description = descriptionRow?.querySelector('div:nth-child(2)')?.textContent.trim();

  // Build new structure
  block.innerHTML = '';

  // Header section
  if (heading || description) {
    const header = document.createElement('div');
    header.className = 'features-header';

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
  }

  // Features grid
  const grid = document.createElement('div');
  grid.className = 'features-grid';

  featureRows.forEach((row) => {
    const cols = row.querySelectorAll('div');
    if (cols.length >= 3) {
      const icon = cols[0]?.textContent.trim();
      const title = cols[1]?.textContent.trim();
      const desc = cols[2]?.textContent.trim();

      const card = document.createElement('div');
      card.className = 'feature-card';

      if (icon) {
        // Map emoji/text to Material Symbol icon names
        const iconMap = {
          '⚡': 'bolt',
          '⏱️': 'timer',
          '🌿': 'spa'
        };

        const iconDiv = document.createElement('div');
        iconDiv.className = 'feature-icon';

        // Use Material Symbol if mapped, otherwise use original text
        const materialIcon = iconMap[icon];
        if (materialIcon) {
          const iconSpan = document.createElement('span');
          iconSpan.className = 'material-symbols-outlined';
          iconSpan.textContent = materialIcon;
          iconDiv.appendChild(iconSpan);
        } else {
          iconDiv.textContent = icon;
        }

        card.appendChild(iconDiv);
      }

      const content = document.createElement('div');
      content.className = 'feature-content';

      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title;
        content.appendChild(h3);
      }

      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc;
        content.appendChild(p);
      }

      card.appendChild(content);
      grid.appendChild(card);
    }
  });

  block.appendChild(grid);
}
