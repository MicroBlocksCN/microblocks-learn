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
    var listDiv = document.querySelector('div#activity-list');
    listDiv.innerHTML = '';
    filteredActivities().forEach((activity) => {
        listDiv.appendChild(activityDiv(activity));
    });
};

function activityDiv (activity) {
    var div = document.createElement('div'),
        title = document.createElement('span');
    title.innerText = activity.title;
    div.appendChild(title);
    return div;
};

function populateFilters () {
    // matches activity descriptor keys and <select> element class names to
    // populate the <select> elements with all possible values in the activity
    // descriptors

    var filterElements = Array.from(
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
            filterElements.filter((element) => {
                return element.classList.contains(selector)
            }).forEach((element) => {
                var value = activity[selector];
                if (Array.isArray(value)) {
                    // i.e. boards: [ 'micro:bit', 'ed1' ]
                    value.forEach((value) => {
                        addOption(element, value, value);
                    });
                } else if (typeof value === 'object') {
                    // i.e. locales: en: { ... }, ca: { ... }
                    Object.keys(value).forEach((key) => {
                        addOption(
                            element,
                            key,
                            value[key].label,
                            value[key]
                        );
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
    document.querySelector('select.locales.activity-filter').value =
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
            } else if (typeof value === 'object') {
                // i.e. locales: en: { label: 'English', ... }, ca: { ... }
                return filters[selector] === '' ||
                    activity[selector].map(each => each.label).includes(
                        filters[selector]
                    );
            } else {
                // atom, i.e. "beginner"
                return filters[selector] === '' ||
                    activity[selector] === filters[selector];
            }
        });
    });
};
