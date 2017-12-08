![image](http://www.ottiger.org/optinomic_logo/optinomic_logo_small.png)

# Optinomic Applications

You need to have [Optinomic](http://www.optinomic.com) to run the applications.

This repository contains apps from Optinomic and is in the default configuration
of your installation. All apps contained here will automatically be available
for you to install on your server.

# For developers

**WARNING:** Changes should be made in the branch `develop`.

## Generating the apps

With stack installed, you can compile the preprocessor with

```
$ stack build
```

Once, the preprocessor is ready, you can generate the apps simply by typing:

```
$ ./gen.sh
```

For an app defined in `some_name/base.opapp`, it will generate a file like
`some-name-2.12.opapp` where the version is stored in `some_name/VERSION`.

Versions are always as such: `M.m` where M is the major version changing with
non-retrocompatible modifications and m for minor changes.

All .opapp files must be versioned in order to be available on servers. Older
versions must stay in the repo.

## Creating a new app

A new directory named after the app containing a file called `base.opapp` is
enough to have a new app generated.

## Preprocessor

Some functions are provided by the preprocessor:

* `__opapp_identifier()` is replaced by the current module's identifier.
ALWAYS use this instead of typing it manually.
* `__opapp_version()` is replaced the current module's version.
ALWAYS use this instead of typing it manually.
* `__opapp_include(PATH)` is replaced by the contents of the file at `PATH`.
That file is itself preprocessed. Paths are relative to the module directory.
* `__opapp_include_as_js_string(PATH)` is replaced by a JavaScript string of the
contents of the file. For example, if `PATH` contains `SELECT * FROM "users";`,
it will be replaced by `"SELECT * FROM \"users\";"`.

# Contact

**Optinomic GmbH**
*Haldenstrasse 7*   |  *CH - 8942 Oberrieden*   |   +41(0)44 508 26 76*
*info@optinomic.com*  |  [www.optinomic.com](http://www.optinomic.com)*
