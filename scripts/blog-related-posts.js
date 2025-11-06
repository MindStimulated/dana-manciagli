/**
 * Blog Related Posts Loader
 *
 * Dynamically loads and displays related posts based on category
 */

(function() {
  'use strict';

  // Get current post data from the article element
  const article = document.querySelector('.blog-post');
  if (!article) return;

  const currentPostId = parseInt(article.dataset.postId);
  const currentCategory = article.dataset.category;

  // Load search index
  fetch('blog-search-index.json')
    .then(response => response.json())
    .then(searchIndex => {
      // Find related posts in the same category
      const relatedPosts = searchIndex
        .filter(post => {
          // Exclude current post and match category
          return post.id !== currentPostId &&
                 post.categorySlug === currentCategory;
        })
        .slice(0, 3); // Show up to 3 related posts

      // Display related posts
      if (relatedPosts.length > 0) {
        displayRelatedPosts(relatedPosts);
      } else {
        // If no posts in same category, show random recent posts
        const randomPosts = searchIndex
          .filter(post => post.id !== currentPostId)
          .slice(0, 3);
        displayRelatedPosts(randomPosts);
      }
    })
    .catch(error => {
      console.error('Error loading related posts:', error);
      // Hide related posts section if there's an error
      const relatedSection = document.getElementById('related-posts');
      if (relatedSection) {
        relatedSection.style.display = 'none';
      }
    });

  function displayRelatedPosts(posts) {
    const grid = document.getElementById('related-posts-grid');
    if (!grid) return;

    grid.innerHTML = posts.map(post => `
      <article class="related-post-card">
        ${post.image ? `
          <div class="related-post-card__image">
            <img src="${post.image}" alt="${escapeHtml(post.title)}" loading="lazy" />
          </div>
        ` : ''}
        <div class="related-post-card__content">
          <span class="related-post-card__category">${post.category}</span>
          <h4 class="related-post-card__title">
            <a href="${post.url}">${post.title}</a>
          </h4>
          <p class="related-post-card__excerpt">${post.excerpt.substring(0, 100)}...</p>
          <div class="related-post-card__meta">
            <span class="related-post-card__date">${post.formattedDate}</span>
            <span class="related-post-card__reading-time">${post.readingTime} min read</span>
          </div>
        </div>
      </article>
    `).join('');

    // Make related post cards clickable
    makeRelatedCardsClickable();
  }

  function makeRelatedCardsClickable() {
    const relatedCards = document.querySelectorAll('.related-post-card');
    relatedCards.forEach(card => {
      // Add cursor pointer style
      card.style.cursor = 'pointer';

      // Add click handler
      card.addEventListener('click', function(e) {
        // Don't trigger if clicking on a link
        if (e.target.tagName === 'A' || e.target.closest('a')) {
          return;
        }

        // Find the main link in the card
        const link = this.querySelector('.related-post-card__title a');
        if (link) {
          window.location.href = link.getAttribute('href');
        }
      });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
