# MicroBlocks Learning Site

## Submitting Materials

### Activity Content

Please send us a [Markdown](https://www.markdownguide.org/basic-syntax/) file containing your full activity at interest (at) microblocks (dot) fun.

Here are some pointers on the format we expect for your Markdown file:

#### Titles

Titles should use level 3 headings (i.e. `### Introduction`). Section subtitles should use level 4 headings (i.e. `#### Step 1`).

#### Images

Always use relative paths to your images (i.e. `![An Image](image.png)` rather than `![An Image](/some/directory/image.png)`.

##### Captions

If an image needs to have a footnote, use the Markdown title attribute, like that:

`![An Image](image.png "This is the caption and will show up as a footnote")

#### Notes, Tips and Warnings

Our markdown parser can render three types of notices. Here's how to use them:

```
[[fact]]
Write your fact here
[[/fact]]

[[note]]
Write your generic note or tip here
[[/note]]

[[safety]]
#### SAFETY NOTE
### Be careful with the batteries
Write your safety note here
[[/safety]]
```

Notice you can also use level 3 and 4 headings inside your notices. Level 4 is reseved for the notice type (i.e. FUN FACT), while level 3 is reserved for the notice title (i.e. Dealing With Electricity).

### Learning Card

If your activity has an associated learning card, please send it to us or include a URL to it, always in PDF.

### Teacher's Guide

If your activity comes with a teacher's guide, please also write it in Markdown, following the same directives above.

### Activity Data

This is the data we require of your activity:

#### Mandatory
* **Title:** The title of your activity, in the language the activity is written in.
* **Author:** The name of the author, be it a person or an organization.
* **Level:** Whether it's meant for total beginners or for already experienced users.
* **Boards:** Which board(s) is the activity meant for.
* **Components:** A list of external components the activity requires such as servos, LEDs, relays, etc.
* **Time:** A lower and upper estimation of how much time it can take for a student to complete the activity, i.e. 60 to 90 minutes.
* **Topics:** A list of topics the activity covers, such as art, music, history, cryptography, etc.

#### Optional
* **Activity card source:** If your activity includes an activity card and you want others to be able to translate it, please provide a URL to the sources. Those can be in a file repository online or in a service like Google Slides.

## Installation

Install NodeJS (v16 recommended) and npm for your operating system, then clone this repository and run:

```
npm install
```

In the root of the repository directory. This will install all dependencies for you.

## Building

### For developing

```
npm run dev
```

You can now access the live-reloading dev site at http://localhost:3000

### For deploying

```
npm run
```

## HandleBars additions

### MarkDown

You can render MarkDown inline using this helper:

```
{{#markdown}}
# Enter your markdown here
And I will *render* it for you :)
{{/markdown}}
```

Or fetch it from a markdown file under `data/markdown/` like this:

`{{#markdown fileName}}`

The file name goes without the extension.

### Boolean operators

We support the following:

```
(and arg1 arg2 ...)
(or arg1 arg2 ...)
```

Which you can call from inside other helpers like `#if` or `#unless`, as follows:

```
{{#if (and is-green is-big)}}
...
{{/if}}
```

### Localization

Localizing works by calling the `localize` helper, like this:

```
{{localize "button_ok"}}
```

Localize can also take arguments:

```
{{localize "greet" firstName}}
```

Please refer to `locales/README.md` for full documentation on localization.


### Join strings

You can join strings by using the `join` helper:

```
{{join "Welcome, " firstName}}
```

This can be used in a subexpression for, for example, localization:

```
{{localize (join "nav_" item)}}
```

