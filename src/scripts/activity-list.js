var activities = null,
    filters = {};

function fetchActivities () {
    // only request the JSON file the first time
    if (!activities) {
        var req = new XMLHttpRequest();
        req.open(
            'GET',
            `/activities.json?random=${Math.floor(Math.random()*99999)}`,
            false
        );
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200 || req.status == 0) {
                    activities = JSON.parse(req.responseText);
                    updateActivityList();
                    populateFilters();
                }
            }
        };
        req.send(null);
    }
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
    return activities.filter((activity) => {
        return Object.keys(filters).every((selector) => {
            if (Array.isArray(activity[selector])) {
                // i.e. boards: [ 'micro:bit', 'ed1' ]
                return filters[selector] === '' ||
                    activity[selector].includes(filters[selector]);
            } else if (typeof filters[selector] === 'boolean') {
                // only "true" triggers filters in checkboxes
                return (filters[selector] && activity[selector]) ||
                            !filters[selector]
            } else {
                // other atoms, i.e. "beginner", 5
                return filters[selector] === '' ||
                    activity[selector] === filters[selector];
            }
        });
    });
};
