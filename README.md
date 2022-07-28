# WordPress Theme Skeleton

### Description

[Innocode](https://innocode.com/) starter code for a WordPress theme.

### Install

**Recommended**

Run `wp scaffold theme`. See details
[innocode-digital/wp-cli-scaffold-theme-command](https://github.com/innocode-digital/wp-cli-scaffold-theme-command).

Run `npm install` in generated theme directory.

**Not recommended**

Clone this repo to `wp-content/themes/`:

~~~
cd wp-content/themes/
git clone git@github.com:innocode-digital/wp-theme-skeleton.git <slug>
~~~

Remove `.git/` directory:

~~~
cd <slug>/
rm -Rf .git/
~~~

Find all `@TODO: ...` in code and replace with needed settings.
Also fill right data in `composer.json` and `package.json`.

Run `npm install` in generated theme directory.

---

See [WordPress Project Skeleton](https://github.com/innocode-digital/wp-project-skeleton) for more info.
