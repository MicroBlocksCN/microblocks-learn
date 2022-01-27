# Writing an Activity

## File System Structure

Copy the "sample" directory, renaming it to something similar to your activity
title, changing spaces for dashes and removing other special characters.

## Metadata

Edit the `meta.json` file and add all the metadata. Below is an explanation of
all the fields:

* **draft:**            Set to true to have the site builder ignore this
                        activity at compile time. Remove or set to false while
                        testing and when deploying.

* **author:**           Who wrote the activity.

* **level:**            Either "Beginner" or "Experienced" 

* **boards:**           An array of board codenames for which this activity has
                        been designed. You can see and modify the list of boards
                        and their codenames in data/json/boards.json

* **time:**             Lower and upper boundary for how many minutes it should
                        take to complete the activity, in an array.
                        (i.e. `[ 90, 120 ]` will become `90 to 120 minutes`.)

* **topics:**           An array of topics that match this activity.
                        (i.e. Art, Sustainability, Music, Physics)

* **components:**       An array of component keys. These keys can be found and
                        added at data/json/components.json.  

## Files

Add all the files that the activity needs (that is, all the images, libraries,
projects, etc) into the `files` directory.

## Locales

Create directories for all your available languages inside of the `locales`
folder. These should be named after the two-letter ISO-631 code for each locale.

Provided with the sample activity is an `en` folder, for the English locale,
that you can also copy and rename for your other locales.

### Activity Contents

The actual activity content for each locale is read from the `index.md` file,
and is formatted in MarkDown.

Our particular implementation of MarkDown has an additional feature that lets us
define _fun facts_, _tips_, _notes_ and _safety notes_. Here's how to use it:

```
[[fact]]
Write your concept note here
[[/fact]]

[[tip]]
Write your tip here
[[/tip]]

[[note]]
Write your generic note here
[[/note]]

[[safety]]
Write your safety note here
[[/safety]]
```

#### Teacher's Guide

If your activity has a teacher's guide, please write it also in MarkDown on the
`teachers-guide.md` file.

#### Activity Card

Your activity could additionally have an activity card to hand to your students.

Please write it in MarkDown on the `activity-card.md` file.

### Metadata

Modify the `meta.json` file in your locale and add all the necessary metadata.

You can also override fields from the top-level `meta.json` file, in case your
locale needs to.

The only required field that this file needs to have is:

* **title:**            The localized title of this activity.

### Locale Specific Files

You can create a `files` folder inside your locale folder. These files can
replace the ones at the top level `files` folder, if they share the same file
name.

