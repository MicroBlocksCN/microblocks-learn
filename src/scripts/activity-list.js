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
        );

    activities.forEach((activity) => {
        Object.keys(activity).forEach((selector) => {
            filterElements.filter((element) => {
                return element.classList.contains(selector)
            }).forEach((element) => {
                var value = activity[selector];
                if (!element.namedItem(value)) {
                    var option = new Option(value);
                    option.id = value;
                    element.appendChild(option);
                }
            });
        });
    });

    // Set the language filter to the page locale, by default
    document.querySelector('select.locale.activity-filter').value =
        document.documentElement.lang;
};

function applyFilter (selector, value) {
    filters[selector] = value;
    updateActivityList();
}; 

function filteredActivities() {
    return activities.filter((activity) => {
        return Object.keys(filters).every((selector) => {
            return activity[selector] === filters[selector];
        });
    });
};
