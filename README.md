# JungleGym - Meesterproef

[![Production CI](https://github.com/iSirThijs/jungle-gym/actions/workflows/production.yaml/badge.svg)](https://github.com/iSirThijs/jungle-gym/actions/workflows/production.yaml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a39c7939-ea9a-421b-8709-ef60d8e56621/deploy-status)](https://app.netlify.com/sites/jungle-gym/deploys)

[![Development CI](https://github.com/iSirThijs/jungle-gym/actions/workflows/development.yaml/badge.svg)](https://github.com/iSirThijs/jungle-gym/actions/workflows/development.yaml)

**[Live link](https://jungle-gym.netlify.app/)**

API repo can be found **[here](https://github.com/iSirThijs/jungle-gym-api)**

CMS repo can be found **[here](https://github.com/jochemvogel/jungle-gym-cms)**

_[Insert JungleGym project description]_

## Table of Contents

<table>
    <tr>
        <td align="center"><a href="#nerd_face-usage">🤓 Course <a></td>
        <td align="center"><a href="#eyeglasses-overview"> 👓 Overview <a></td>
        <td align="center"><a href="#gear-installation">⚙️ Installation<a></td>
        <td align="center"><a href="#open_file_folder-folder-structure">🗂 Folder Structure<a></td>
        <td align="center"><a href="#anger-others">💢 Others<a></td>
    </tr>
</table>

## :nerd_face: Course

The **Meesterproef** is the final client-project of the half year minor programme about Web Design and Development in Amsterdam. Bachelor Communication and Multimedia Design, Amsterdam University of Applied Science.

## :eyeglasses: Overview

### Screenshot

<details>

<summary>Homepagina</summary>

![Homepagina](https://i.ibb.co/pn4dK5d/Screenshot-2021-06-11-at-11-34-45.png)

<details>

<details>

<summary>Overzichtspagina</summary>

![Overzichtspagina](https://i.ibb.co/2sMJyKj/Screenshot-2021-06-11-at-11-34-30.png)

</details>

## :gear: Installation

### Prerequisites

- Redis database for session storage
  <!-- These links will link to a wiki page -->
  - [What is a session storage?]()
  - [Local session storage with docker]()

### Developing

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

### Environment Variables

Copy the `.env.example` and rename it to `.env`.

### Husky

[Husky](https://github.com/typicode/husky) is used to format your code (automatically) on commit.

In order to use Husky you have to install it with `npm run prepare`. This will install Husky for your project.

The next time you commit, Husky will automatically format it for you.

## :open_file_folder: Folder Structure

```
# GitHub files
|.github

# Broncode van het project
|-src

	# Library met eigen components
	|-lib

	# Alle (file-based) routes
	|-routes

# Alle static files
|-static
```

We zijn het er nog niet helemaal over eens of we het zo willen gaan doen. Wellicht dat we dit in de Design Rationale gooien. Heeft niet echt een toegevoegde waarde in de README.

## :anger: Others

_Design Rationale (will be added later)_

Als we de documentatie een eind af hebben, komen hier ook andere links. Zo leggen wij uit waarom er een CMS is. Wat daar gedaan wordt. Hoe de API werkt etc. Dit hebben wij nog niet af, dus daarom is dat nog niet toegevoegd.
