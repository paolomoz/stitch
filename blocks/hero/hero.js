export default function decorate(block) {
  // Extract content from block table structure
  const rows = [...block.children];

  // Get the background image from first row
  const picture = rows[0]?.querySelector('picture');
  const backgroundImg = picture?.querySelector('img');

  // Get heading from first row, second cell
  const headingCell = rows[0]?.querySelectorAll('div')[1];
  const headingText = headingCell?.textContent.trim();

  // Get subheading from second row, second cell
  const subheadingCell = rows[1]?.querySelectorAll('div')[1];
  const subheadingText = subheadingCell?.textContent.trim();

  // Get CTA from third row
  const ctaLink = rows[2]?.querySelector('a');

  // Clear the block
  block.innerHTML = '';

  // Create hero container
  const heroContainer = document.createElement('div');
  heroContainer.className = 'hero-container';

  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'hero-content';

  // Create text wrapper
  const textWrapper = document.createElement('div');
  textWrapper.className = 'hero-text';

  // Add heading
  if (headingText) {
    const h1 = document.createElement('h1');
    h1.className = 'hero-heading';
    h1.textContent = headingText;
    textWrapper.appendChild(h1);
  }

  // Add subheading
  if (subheadingText) {
    const h2 = document.createElement('h2');
    h2.className = 'hero-subheading';
    h2.textContent = subheadingText;
    textWrapper.appendChild(h2);
  }

  contentWrapper.appendChild(textWrapper);

  // Add CTA button
  if (ctaLink) {
    const button = document.createElement('a');
    button.href = ctaLink.href;
    button.className = 'hero-cta button primary';
    button.textContent = ctaLink.textContent;
    contentWrapper.appendChild(button);
  }

  heroContainer.appendChild(contentWrapper);
  block.appendChild(heroContainer);

  // Apply background image with gradient overlay
  if (backgroundImg) {
    block.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url(${backgroundImg.src})`;
  }
}
