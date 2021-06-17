# JungleGym - Meesterproef

**[Live link](https://jungle-gym.netlify.app/)**

![Mockup](https://user-images.githubusercontent.com/34123512/122357810-57130980-cf54-11eb-9413-24f03e0f6b7d.jpg)

JungleGym is a simple, user-friendly app for group teachers who have little or no expertise in physical education and have little material at their disposal.

The app contains a list of all the different games that could be used during gym class. The teachers in Suriname can filter on different parts: the materials they have at their disposal, the number of students, the form of the game and the age category (group).

[![Production CI](https://github.com/iSirThijs/jungle-gym/actions/workflows/production.yaml/badge.svg)](https://github.com/iSirThijs/jungle-gym/actions/workflows/production.yaml) [![Development CI](https://github.com/iSirThijs/jungle-gym/actions/workflows/development.yaml/badge.svg)](https://github.com/iSirThijs/jungle-gym/actions/workflows/development.yaml) [![Netlify Status](https://api.netlify.com/api/v1/badges/a39c7939-ea9a-421b-8709-ef60d8e56621/deploy-status)](https://app.netlify.com/sites/jungle-gym/deploys)

![GitHub issues](https://img.shields.io/github/issues-raw/iSirThijs/jungle-gym) ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/iSirThijs/jungle-gym) ![GitHub last commit](https://img.shields.io/github/last-commit/iSirThijs/jungle-gym)

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/iSirThijs/jungle-gym) ![GitHub repo size](https://img.shields.io/github/repo-size/isirthijs/jungle-gym)

## Table of Contents

<table>
    <tr>
				<td align="center"><a href="#nerd_face-course">🤓 Course <a></td>
				<td align="center"><a href="#link-links">🔗 Links <a></td>
        <td align="center"><a href="#gear-installation">⚙️ Installation<a></td>
    </tr>
</table>

## :nerd_face: Course

The **[Meesterproef](https://github.com/cmda-minor-web/meesterproef-2021)** is the final client-project of the half year minor programme about Web Design and Development in Amsterdam. Bachelor Communication and Multimedia Design, Amsterdam University of Applied Science.

With the Meesterproef you show what you have learned during the minor. The final project is assessed on a Design rationale, a Product biography and a reflection on one's own level.

## :link: Links

### CMS

The content (games) of the app are managed in a headless CMS (Strapi). The [CMS repo](https://github.com/jochemvogel/jungle-gym-cms) contains all the code of this Content Management System.

### API

The CMS API is patched by our own API. In this API are all the endpoints and is the authentication being managed. The [API repo](https://github.com/iSirThijs/jungle-gym-api) contains all the code of this API.

### Design Rationale

The [Design Rationale](https://junglegym.gitbook.io/junglegym-documentation/) is an explicit documentation of the reasons behind the decisions we made. Besides that, it also contains the overall documentation about the app, like the tech stack and the user manual.

### Product Biography

The individual Product Biographies can be found in the [Wiki](https://github.com/iSirThijs/jungle-gym/wiki). In the Product Biography everyone keeps track of what they have done per week. You write about the process, the iterations, the working method and the planning.

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
