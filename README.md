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

### Caveats

**Install premium extensions from metabox.io**

See documentation [metabox.io](https://docs.metabox.io/extensions/composer/) on how to do it in general. 
Keep in mind that storing of the API Key in project `composer.json` is not a good idea, since 
there is possible situation that project will be taken by someone else, so the API Key may be accidentally
shared. To add private source to `repositories`, you can add it in global config with the following command 
`composer config repositories.metabox\.io composer https://packages.metabox.io/<API Key> --global` or edit 
`$HOME/.composer/config.json` manually:

~~~
{
    "config": {},
    "repositories": {
        "metabox.io": {
            "type": "composer",
            "url": "https://packages.metabox.io/<API Key>"
        }
    }
}
~~~

Then it should be possible to add extensions to project:

~~~
composer require meta-box/meta-box-group:dev-master
~~~
