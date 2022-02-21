var activities = null,
    boards = null,
    currentPage = 1,
    totalPages = 1,
    pageSize = 12,
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
    var listDiv = document.querySelector('#activity-grid'),
        countDiv = document.querySelector('.v_home__activity-count'),
        filtered = filteredActivities();

    totalPages = Math.ceil(filtered.length / pageSize);
    listDiv.innerHTML = '';
    countDiv.innerHTML = filtered.length > 1 ?
        localize('result-count', filtered.length) :
        (filtered.length === 0 ?
            localize('result-count-zero') :
            localize('result-count-one')
        );
    filtered.splice((currentPage - 1) * pageSize, pageSize).forEach( 
        (activity) => {
            listDiv.insertAdjacentHTML('beforeend', activityDiv(activity));
        }
    );
    updatePages();
};

function activityDiv (activity) {
    var title           = activity.title,
        link            = `activities/${activity.slug}`,
        thumb           = `activities/${activity.slug}/thumbnail.png`,
        boards          = '',
        components      = '';
        
    // create lists out of specs arrays
    function buildList (arrayOfSpecs) {
        let list = '';

        // if (arrayOfSpecs.length == 0) {
        //     list = 'None.'
        // }

        arrayOfSpecs.forEach( (element, index, array) => {
            list += localize(element);
            if (index < (array.length - 1) ){
                list += ', ';
            } else {
                list += '.';
            }
        });
        
        return list;
    };

    boards = buildList(activity.boards);
    components = buildList(activity.components);

    var div = `
        <a href="${ link }" title="${ title }" class="c_activity-card">
            <div class="c_activity-card__thumb">
                <img src="${ thumb }" alt="${ title }">
            </div>
            <div class="c_activity-card__content">
                <h4 class="c_activity-card__title">${ title }</h4>
                <div class="c_activity-card__specs">
                    <div class="c_activity-card__list">
                        <div class="c_activity-card__list-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <title>Boards</title>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.75 6.875V8.125H16.25V11.875H18.75V13.125H16.25V15C16.25 15.6904 15.6904 16.25 15 16.25H13.125V18.75H11.875V16.25H8.125V18.75H6.875V16.25H5C4.30964 16.25 3.75 15.6904 3.75 15V13.125H1.25V11.875H3.75V8.125H1.25V6.875H3.75V5C3.75 4.30964 4.30964 3.75 5 3.75H6.875V1.25H8.125V3.75H11.875V1.25H13.125V3.75H15C15.6904 3.75 16.25 4.30964 16.25 5V6.875H18.75ZM5 15H15V5H5V15ZM6.875 6.875V13.125H13.125V6.875H6.875ZM8.125 11.875H11.875V8.125H8.125V11.875Z" fill="#B6519D"/>
                            </svg>
                        </div>
                        <div class="c_activity-card__list-elements">${
                            boards
                        }</div>
                    </div>
                    <div class="c_activity-card__list ${
                        components ?
                            '' :
                            'c_activity-card__components--is-empty'
                    }">
                        <div class="c_activity-card__list-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <title>Component/s</title>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 15H13.125V16.25H6.875V15ZM8.125 17.5H11.875V18.75H8.125V17.5ZM10 1.25C6.54822 1.25 3.75 4.04822 3.75 7.5C3.66426 9.34265 4.46873 11.1144 5.9125 12.2625C6.5375 12.8438 6.875 13.175 6.875 13.75H8.125C8.125 12.6 7.43125 11.9562 6.75625 11.3375C5.57011 10.4292 4.9121 8.99139 5 7.5C5 4.73858 7.23857 2.5 10 2.5C12.7614 2.5 15 4.73858 15 7.5C15.0864 8.99252 14.426 10.4305 13.2375 11.3375C12.5687 11.9625 11.875 12.5875 11.875 13.75H13.125C13.125 13.175 13.4562 12.8438 14.0875 12.2563C15.5303 11.1101 16.3347 9.34069 16.25 7.5C16.25 5.8424 15.5915 4.25269 14.4194 3.08058C13.2473 1.90848 11.6576 1.25 10 1.25Z" fill="#B6519D"/>
                            </svg>
                        </div>
                        <div class="c_activity-card__list-elements">${
                            components ?
                                components :
                                localize('no-components')
                        }</div>
                    </div>
                </div>
            </div>
        </a>
    `;

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
        },
        atomText = function (selector, value) {
            if (selector === 'level') {
                return localize('lvl_' + value);
            } else if (selector === 'locale') {
                return languages[value];
            }
            return value;
        }

    activities.forEach((activity) => {
        Object.keys(activity).forEach((selector) => {
            selectElements.filter((element) => {
                return element.classList.contains(selector)
            }).forEach((element) => {
                var value = activity[selector];
                if (Array.isArray(value)) {
                    // i.e. boards: [ 'micro:bit', 'ed1' ]
                    value.forEach((value) => {
                        addOption(element, value, localize(value));
                    });
                } else {
                    // atom, i.e. 1, "en"
                    addOption(element, value, atomText(selector, value));
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

function resetFilters () {
    document.querySelectorAll('.activity-filter').forEach((select) => {
        select.value = '';
    });
    document.querySelectorAll('.activity-toggle').forEach((check) => {
        check.checked = false;
    });
    filters = {};
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
                // other atoms, i.e. 2
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
        return `<div class="c_pagination__item
            ${currentPage === pageNum ?  ' c_pagination__item--active' : ''}"
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
        return `<div class="c_pagination__item
            ${disabled ? ' c_pagination__item--disabled' : ''}"
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
    document.querySelector('.c_pagination').innerHTML = html;
};



/**
 * UI Responsive functionalities
 * To refactor (add inline, or keep here, or separated JS file)
 * 
 * MC: Bernat, what you think?
 * 
 * BR: Looks fine to me here. Feel free to delete this comment :)
 */

function filtersResponsiveness() {
    const windowWidth = window.innerWidth;
    const activityFilters = document.querySelector('.c_filters');
    const activityFiltersToggle =
        document.querySelector('.v_home__filters-button');
    const activityFiltersClose =
        document.querySelector('.c_filters__mobile-close');

    if ( windowWidth < '768' ) {
        activityFilters.setAttribute('tabindex', '0');
    };

    activityFiltersToggle.addEventListener('click', () => {
        activityFilters.classList.add('c_filters--is-visible');
        activityFilters.setAttribute('tabindex', '1');
    });

    activityFiltersClose.addEventListener('click', () => {
        activityFilters.classList.remove('c_filters--is-visible');
        activityFilters.setAttribute('tabindex', '0');
    });
};


/**
 * TODO:
 * Robots.txt to sort out that JS content generation
 * won't provide search engines a readable structure
 */
