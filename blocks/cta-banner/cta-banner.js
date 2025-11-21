export default function decorate(block) {
  const [headingRow, descriptionRow, ctaRow] = [...block.children];

  // Extract content
  const heading = headingRow?.querySelector('div:nth-child(2)')?.textContent.trim();
  const description = descriptionRow?.querySelector('div:nth-child(2)')?.textContent.trim();
  const ctaText = ctaRow?.querySelector('a')?.textContent.trim();
  const ctaLink = ctaRow?.querySelector('a')?.href;

  // Build new structure
  block.innerHTML = '';

  const textContent = document.createElement('div');
  textContent.className = 'cta-text';

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    textContent.appendChild(h2);
  }

  if (description) {
    const p = document.createElement('p');
    p.textContent = description;
    textContent.appendChild(p);
  }

  block.appendChild(textContent);

  if (ctaText && ctaLink) {
    const ctaButton = document.createElement('a');
    ctaButton.href = ctaLink;
    ctaButton.className = 'button accent';
    ctaButton.textContent = ctaText;
    block.appendChild(ctaButton);
  }
}
