![image](http://www.ottiger.org/optinomic_logo/optinomic_logo_small.png)

# Optinomic Applications

You need to have [Optinomic](http://www.optinomic.com) to run the applications.

This repository contains apps from Optinomic and is in the default configuration
of your installation. All apps contained here will automatically be available
for you to install on your server.

# For developers

## Generating the apps

Apps are generated simply by typing:

$ ./gen.sh

For an app defined in `some_name/base.opapp.m4`, it will generate a file like
`some-name-2.12.opapp` where the version is stored in `some_name/VERSION`.

Versions are always as such: `M.m` where M is the major version changing with
non-retrocompatible modifications and m for minor changes.

All .opapp files must be versioned in order to be available on servers. Older
versions must stay in the repo.

## Creating a new app

A new directory named after the app containing a file called `base.opapp.m4` is
enough to have a new app generated. For more documentation about M4, see
http://www.gnu.org/software/m4/manual/.

# Contact

**Optinomic GmbH**
*Haldenstrasse 7*   |  *CH - 8942 Oberrieden*   |   +41(0)44 508 26 76*
*info@optinomic.com*  |  [www.optinomic.com](http://www.optinomic.com)*
