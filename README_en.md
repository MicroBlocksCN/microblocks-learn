# MicroBlocks Learning Site

## Submitting Activities

We welcome high-quality activity submissions from the MicroBlocks community.
See [submitting activities](SUBMITTING_ACTIVITIES.md) for more information.

The rest of this README is for developers who want build, test, debug, or extend the website.

## Installation

Install NodeJS (v16 recommended) and npm for your operating system,
then clone this repository and run:

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

