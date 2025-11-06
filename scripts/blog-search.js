/**
 * Blog Search Functionality
 *
 * Client-side search implementation using the generated search index.
 * Fast, lightweight, and SEO-friendly.
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    searchIndexPath: 'blog-search-index.json',
    searchInputId: 'blog-search-input',
    resultsContainerId: 'blog-grid',
    minSearchLength: 2,
    debounceDelay: 300
  };

  // State
  let searchIndex = [];
  let allPosts = [];
  let searchTimeout = null;

  /**
   * Initialize search functionality
   */
  function init() {
    loadSearchIndex();
    setupEventListeners();
  }

  /**
   * Load search index from JSON file
   */
  async function loadSearchIndex() {
    try {
      const response = await fetch(config.searchIndexPath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      searchIndex = await response.json();
      allPosts = [...searchIndex];

      console.log(`✓ Search index loaded: ${searchIndex.length} posts`);
    } catch (error) {
      console.error('Error loading search index:', error);
      // Gracefully degrade - search will just not work
    }
  }

  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    const searchInput = document.getElementById(config.searchInputId);
    if (!searchInput) return;

    // Search input
    searchInput.addEventListener('input', (e) => {
      handleSearchInput(e.target.value);
    });

    // Clear search on Escape key
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        clearSearch();
      }
    });

    // Category filter links (if they exist)
    setupCategoryFilters();

    // Tag filter links (if they exist)
    setupTagFilters();
  }

  /**
   * Handle search input with debouncing
   */
  function handleSearchInput(query) {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      if (query.length === 0) {
        showAllPosts();
      } else if (query.length >= config.minSearchLength) {
        performSearch(query);
      }
    }, config.debounceDelay);
  }

  /**
   * Perform search across posts
   */
  function performSearch(query) {
    const lowerQuery = query.toLowerCase().trim();
    const terms = lowerQuery.split(/\s+/);

    const results = searchIndex.filter(post => {
      let score = 0;

      // Search in title (highest weight)
      if (post.title.toLowerCase().includes(lowerQuery)) {
        score += 100;
      }
      terms.forEach(term => {
        if (post.title.toLowerCase().includes(term)) {
          score += 50;
        }
      });

      // Search in excerpt (medium weight)
      if (post.excerpt.toLowerCase().includes(lowerQuery)) {
        score += 50;
      }
      terms.forEach(term => {
        if (post.excerpt.toLowerCase().includes(term)) {
          score += 25;
        }
      });

      // Search in content (medium weight)
      if (post.content.toLowerCase().includes(lowerQuery)) {
        score += 40;
      }
      terms.forEach(term => {
        if (post.content.toLowerCase().includes(term)) {
          score += 20;
        }
      });

      // Search in keywords (high weight)
      post.keywords.forEach(keyword => {
        if (keyword.includes(lowerQuery)) {
          score += 60;
        }
        terms.forEach(term => {
          if (keyword.includes(term)) {
            score += 30;
          }
        });
      });

      // Search in category
      if (post.category.toLowerCase().includes(lowerQuery)) {
        score += 30;
      }

      // Search in tags
      post.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowerQuery)) {
          score += 20;
        }
      });

      // Only include if score > 0
      post.searchScore = score;
      return score > 0;
    });

    // Sort by relevance score (highest first)
    results.sort((a, b) => b.searchScore - a.searchScore);

    displayResults(results, query);
  }

  /**
   * Display search results
   */
  function displayResults(results, query) {
    const container = document.getElementById(config.resultsContainerId);
    if (!container) return;

    // Show results count
    showResultsMessage(results.length, query);

    if (results.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <h3>No results found for "${escapeHtml(query)}"</h3>
          <p>Try different keywords or browse all posts below.</p>
        </div>
      `;
      return;
    }

    // Generate HTML for results
    const cardsHtml = results.map(post => generateBlogCard(post, query)).join('');
    container.innerHTML = cardsHtml;

    // Make cards clickable
    makeCardsClickable();

    // Update URL with search query (optional)
    updateURLWithQuery(query);
  }

  /**
   * Generate blog card HTML
   */
  function generateBlogCard(post, highlightQuery = null) {
    const title = highlightQuery ? highlightText(post.title, highlightQuery) : post.title;
    const excerpt = highlightQuery ? highlightText(post.excerpt, highlightQuery) : post.excerpt;

    const imageTag = post.image
      ? `<img src="${post.image}" alt="${escapeHtml(post.title)}" loading="lazy" />`
      : `<div class="placeholder-image">No Image Available</div>`;

    return `
      <article class="blog-card" data-category="${post.categorySlug}" data-tags="${post.tagSlugs.join(',')}">
        <div class="blog-card__image">
          ${imageTag}
          <span class="blog-card__category-badge">${post.category}</span>
        </div>
        <div class="blog-card__content">
          <div class="blog-card__meta">
            <span class="blog-card__date">${post.formattedDate}</span>
            <span class="blog-card__reading-time">${post.readingTime} min read</span>
          </div>
          <h2 class="blog-card__title">
            <a href="${post.url}">${title}</a>
          </h2>
          <p class="blog-card__excerpt">
            ${excerpt}
          </p>
          <div class="blog-card__footer">
            <div class="blog-card__author">
              <div class="blog-card__author-avatar">DM</div>
              <span>Dana Manciagli</span>
            </div>
            <a href="${post.url}" class="blog-card__link">Read →</a>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Show all posts (clear search)
   */
  function showAllPosts() {
    const container = document.getElementById(config.resultsContainerId);
    if (!container) return;

    // Remove results message
    const resultsMessage = document.querySelector('.search-results-message');
    if (resultsMessage) {
      resultsMessage.remove();
    }

    // Show all posts
    const cardsHtml = allPosts.map(post => generateBlogCard(post)).join('');
    container.innerHTML = cardsHtml;

    // Make cards clickable
    makeCardsClickable();

    // Clear URL query
    updateURLWithQuery('');
  }

  /**
   * Clear search input and results
   */
  function clearSearch() {
    const searchInput = document.getElementById(config.searchInputId);
    if (searchInput) {
      searchInput.value = '';
    }
    showAllPosts();
  }

  /**
   * Show search results message
   */
  function showResultsMessage(count, query) {
    // Remove existing message
    const existing = document.querySelector('.search-results-message');
    if (existing) {
      existing.remove();
    }

    // Add new message
    const container = document.getElementById(config.resultsContainerId);
    if (!container) return;

    const message = document.createElement('div');
    message.className = 'search-results-message';
    message.innerHTML = `
      <p>Found <strong>${count}</strong> result${count !== 1 ? 's' : ''} for "<strong>${escapeHtml(query)}</strong>"</p>
      <button type="button" class="clear-search-button" onclick="window.blogSearch.clearSearch()">Clear search</button>
    `;

    container.parentElement.insertBefore(message, container);
  }

  /**
   * Setup category filter links
   */
  function setupCategoryFilters() {
    const categoryLinks = document.querySelectorAll('[data-category-filter]');

    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category-filter');
        filterByCategory(category);
      });
    });
  }

  /**
   * Filter posts by category
   */
  function filterByCategory(categorySlug) {
    const results = searchIndex.filter(post => post.categorySlug === categorySlug);
    displayResults(results, `Category: ${categorySlug}`);
  }

  /**
   * Setup tag filter links
   */
  function setupTagFilters() {
    // Check for tag in URL
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');

    if (tag) {
      filterByTag(tag);
    }

    // Setup click handlers
    const tagLinks = document.querySelectorAll('a[href*="?tag="]');
    tagLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = new URL(link.href);
        const tag = url.searchParams.get('tag');
        if (tag) {
          filterByTag(tag);
        }
      });
    });
  }

  /**
   * Filter posts by tag
   */
  function filterByTag(tagSlug) {
    const results = searchIndex.filter(post =>
      post.tagSlugs.includes(tagSlug)
    );

    const tagName = results.length > 0
      ? results[0].tags[results[0].tagSlugs.indexOf(tagSlug)]
      : tagSlug;

    displayResults(results, `Tag: ${tagName}`);
  }

  /**
   * Highlight search terms in text
   */
  function highlightText(text, query) {
    const terms = query.toLowerCase().split(/\s+/);
    let highlighted = text;

    terms.forEach(term => {
      if (term.length < 2) return;

      const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });

    return highlighted;
  }

  /**
   * Escape HTML for safe display
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Escape regex special characters
   */
  function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Update URL with search query (without page reload)
   */
  function updateURLWithQuery(query) {
    if (!window.history || !window.history.pushState) return;

    const url = new URL(window.location);

    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
      url.searchParams.delete('tag');
    }

    window.history.pushState({}, '', url);
  }

  /**
   * Load search query from URL on page load
   */
  function loadSearchFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (query) {
      const searchInput = document.getElementById(config.searchInputId);
      if (searchInput) {
        searchInput.value = query;
        performSearch(query);
      }
    }
  }

  /**
   * Make blog cards fully clickable
   */
  function makeCardsClickable() {
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
      // Remove any existing click handlers to prevent duplicates
      const newCard = card.cloneNode(true);
      card.parentNode.replaceChild(newCard, card);

      // Add cursor pointer style
      newCard.style.cursor = 'pointer';

      // Add click handler
      newCard.addEventListener('click', function(e) {
        // Don't trigger if clicking directly on a link or button
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
            e.target.closest('a') || e.target.closest('button')) {
          return;
        }

        // Find the main link in the card
        const link = this.querySelector('.blog-card__title a') || this.querySelector('.blog-card__link');
        if (link) {
          // Prevent default to avoid any conflicts
          e.preventDefault();
          e.stopPropagation();
          // Navigate to the link
          window.location.href = link.getAttribute('href');
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      setTimeout(loadSearchFromURL, 100);
      makeCardsClickable();
    });
  } else {
    init();
    setTimeout(loadSearchFromURL, 100);
    makeCardsClickable();
  }

  // Expose public API
  window.blogSearch = {
    search: performSearch,
    clearSearch: clearSearch,
    filterByCategory: filterByCategory,
    filterByTag: filterByTag,
    showAllPosts: showAllPosts,
    makeCardsClickable: makeCardsClickable
  };

})();
