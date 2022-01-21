var activities = null,
    boards = null,
    filters = {};

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

function updateActivityList () {
    var listDiv = document.querySelector('div#activity-list'),
        countDiv = document.querySelector('span#activity-count'),
        filtered = filteredActivities();
    listDiv.innerHTML = '';
    countDiv.innerHTML = filtered.length + ' results.';
    filtered.forEach((activity) => {
        listDiv.appendChild(activityDiv(activity));
    });
};

function activityDiv (activity) {
    var div = document.createElement('div'),
        link = document.createElement('a');
    link.innerText = activity.title;
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
                'div#activity-filters'
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

function applyFilter (selector, value) {
    filters[selector] = value;
    updateActivityList();
}; 

function filteredActivities() {
    var filtered = [];
    if (filters.boards) {
        filtered = activities.filter(
            (activity) => {
                return activity.boards.includes(filters.boards);
            }
        );
    } else {
        Object.assign(filtered, activities);
    }

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

    return filtered.filter((activity) => {
        return Object.keys(filters).every((selector) => {
            if (Array.isArray(activity[selector])) {
                // i.e. topics: [ 'art', 'music' ]
                return (filters[selector] === '') || (selector === 'boards') ||
                    activity[selector].includes(filters[selector]);
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
