const Kegiatan = {
    init: function() {
        const searchInput = document.getElementById('search-kegiatan');
        const categoryFilters = document.querySelectorAll('.category-filter');
        const activeCategoryText = document.getElementById('active-category-text');
        const kategoriToggle = document.getElementById('kategoriToggle');
        
        const activityCards = document.querySelectorAll('.activity-card');
        const noResultsMsg = document.getElementById('no-results-msg');

        let currentSearchQuery = '';
        let currentCategory = 'Semua Kegiatan';

        // Event: Search Input
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearchQuery = e.target.value.toLowerCase();
                this.filterActivities(activityCards, currentSearchQuery, currentCategory, noResultsMsg);
            });
        }

        // Event: Category Filters
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get selected category
                currentCategory = e.target.getAttribute('data-category');
                
                // Update button text
                if (activeCategoryText) {
                    activeCategoryText.innerText = currentCategory;
                }
                
                // Close dropdown
                if (kategoriToggle) {
                    kategoriToggle.checked = false;
                }

                // Filter
                this.filterActivities(activityCards, currentSearchQuery, currentCategory, noResultsMsg);
            });
        });

    },

    filterActivities: function(cards, query, category, noResultsMsg) {
        let visibleCount = 0;

        cards.forEach(card => {
            // Get card title
            const titleElement = card.querySelector('h3');
            const title = titleElement ? titleElement.innerText.toLowerCase() : '';
            
            // Get card category (usually the last span with fa-tag)
            const tagIcon = card.querySelector('.fa-tag');
            let cardCategory = '';
            if (tagIcon && tagIcon.nextElementSibling) {
                cardCategory = tagIcon.nextElementSibling.innerText.trim();
            }

            // Check if matches query
            const matchesQuery = query === '' || title.includes(query) || cardCategory.toLowerCase().includes(query);
            
            // Check if matches category filter
            const matchesCategory = category === 'Semua Kegiatan' || cardCategory === category;

            // Apply visibility
            if (matchesQuery && matchesCategory) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Toggle 'No Results' message
        if (noResultsMsg) {
            if (visibleCount === 0) {
                noResultsMsg.style.display = 'block';
            } else {
                noResultsMsg.style.display = 'none';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Kegiatan.init();
});