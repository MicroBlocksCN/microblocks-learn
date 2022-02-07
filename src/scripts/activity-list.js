var activities = null,
    boards = null,
    currentPage = 1,
    totalPages = 1,
    pageSize = 15,
    filters = {};

// ==== FETCHING DATA ====

function fetchJSON (fileName, onsuccess) {
    // only request the JSON file the first time
    if (!window[fileName]) {
        var req = new XMLHttpRequest();
        req.open(
            'GET',
            `/${fileName}.json?random=${Math.floor(Math.random()*99999)}`,
            false
        );
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200 || req.status == 0) {
                    window[fileName] = JSON.parse(req.responseText);
                    if (onsuccess) { onsuccess.call(this); }
                }
            }
        };
        req.send(null);
    }
};

function fetchActivities () {
    fetchJSON('activities',
        () => {
            fetchJSON('boards');
            updateActivityList();
            populateFilters();
        }
    );
};

// ==== HTML COMPOSING ====

function updateActivityList () {
    var listDiv = document.querySelector('div.activity-list'),
        countDiv = document.querySelector('span.activity-count'),
        filtered = filteredActivities();
    totalPages = Math.floor(filtered.length / pageSize);
    listDiv.innerHTML = '';
    countDiv.innerHTML = filtered.length + ' results.';
    filtered.splice((currentPage - 1) * pageSize, pageSize).forEach(
        (activity) => { listDiv.appendChild(activityDiv(activity));
    });
    updatePages();
};

function activityDiv (activity) {
    var div = document.createElement('div'),
        thumb = document.createElement('img'),
        title = document.createElement('span'),
        link = document.createElement('a');
    thumb.src = `activities/${activity.slug}/thumbnail.png`;
    title.innerText = activity.title;
    link.appendChild(thumb);
    link.appendChild(title);
    link.href = `activities/${activity.slug}`;
    div.appendChild(link);
    return div;
};

function populateFilters () {
    // matches activity descriptor keys and <select> element class names to
    // populate the <select> elements with all possible values in the activity
    // descriptors

    var selectElements = Array.from(
            document.querySelector(
                '#activity-filters'
            ).querySelectorAll('.activity-filter')
        ),
        addOption = function (element, selector, text, meta) {
            if (!element.namedItem(selector)) {
                var option = new Option(text, selector);
                option.id = selector;
                if (meta) { option.dataset['meta'] = JSON.stringify(meta); }
                element.appendChild(option);
            }
        };

    activities.forEach((activity) => {
        Object.keys(activity).forEach((selector) => {
            selectElements.filter((element) => {
                return element.classList.contains(selector)
            }).forEach((element) => {
                var value = activity[selector];
                if (Array.isArray(value)) {
                    // i.e. boards: [ 'micro:bit', 'ed1' ]
                    value.forEach((value) => {
                        addOption(element, value, value);
                    });
                } else {
                    // atom, i.e. "beginner"
                    addOption(element, value, value);
                }
            });
        });
    });

    // Set the language filter to the page locale, by default, and apply the
    // filter
    document.querySelector('select.locale.activity-filter').value =
        document.documentElement.lang;
    applyFilter('locale', document.documentElement.lang);
};

// ==== FILTERING ====

function applyFilter (selector, value) {
    filters[selector] = value;
    updateActivityList();
}; 

function filteredActivities() {
    var filtered = [];

    // filter by boards
    if (filters.boards) {
        filtered = activities.filter(
            (activity) => {
                return activity.boards.includes(filters.boards);
            }
        );
    } else {
        Object.assign(filtered, activities);
    }

    // then, add compatible boards, if needed
    if (filters.boards && filters.compatible) {
        activities.forEach((activity) => {
            if (!filtered.includes(activity) &&
                boards[filters.boards].compatible.some(
                    (board) => {
                        return activity.boards.includes(board)
                    }
                )
            ) {
                filtered.push(activity);
            }
        });
    }

    // now filter by all the rest
    return filtered.filter((activity) => {
        return Object.keys(filters).every((selector) => {
            if (Array.isArray(activity[selector])) {
                // i.e. topics: [ 'art', 'music' ]
                return (filters[selector] === '') || (selector === 'boards') ||
                    activity[selector].includes(filters[selector]) ||
                    ((filters[selector] === 'none') &&
                        (activity[selector].length === 0));
            } else if (typeof filters[selector] === 'boolean') {
                // only "true" triggers filters in checkboxes
                return (selector === 'compatible') ||
                    (filters[selector] && activity[selector]) ||
                    !filters[selector]
            } else {
                // other atoms, i.e. "beginner", 5
                return filters[selector] === '' ||
                    activity[selector] === filters[selector];
            }
        })
    });
};

// ==== PAGINATION ====

function nextPage () {
    if (currentPage < totalPages) {
        currentPage ++;
        updateActivityList();
    }
};

function previousPage () {
    if (currentPage > 1) {
        currentPage --;
        updateActivityList();
    }
};

function pageElementHtml (pageNum) {
    if (typeof pageNum === 'number') {
        return `<div class="pagination__item
            ${currentPage === pageNum ?  ' pagination__item--active' : ''}"
            onclick="currentPage = ${pageNum}; updateActivityList();"
            role="button" tabindex="0" aria-label="Go to page ${pageNum}"
            ${currentPage === pageNum ? ' aria-current="true"' : ''}>
            ${pageNum}</div>`;
    } else {
        // pageNum is either "<" or ">"
        var disabled = (currentPage === 1 && pageNum === '<') ||
            (totalPages === 0 || currentPage === totalPages && pageNum === '>');
        // Yep, tomorrow I'll have a hard time understanding this code.
        // Nope, sorry. I'm not documenting this. I'll just rewrite it from
        // scratch if need be.
        return `<div class="pagination__item
            ${disabled ? ' pagination__item--disabled' : ''}"
            onclick="${['previous','next'][['<','>'].indexOf(pageNum)]}Page();"
            role="button" tabindex="0" ${pageNum === '<' ?
                    ' aria-label="Previous Page"' : ' aria-label="Next Page"' }
            ${disabled ? ' aria-disabled="true"' : ''}
            >&${['lt','gt'][['<','>'].indexOf(pageNum)]};</div>`
    }
};

function updatePages () {
    var html;
    if (totalPages < 2) {
        html = '';
    } else {
        html = pageElementHtml('<');
        for (var pageNum = 1; pageNum <= totalPages; pageNum ++) {
            html += pageElementHtml(pageNum);
        }
        html += pageElementHtml('>');
    }
    document.querySelector(
        '.page-activities__pagination.pagination').innerHTML = html;
};

