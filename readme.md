# Getting Started

## 1. Install MongoDB

If you don't already have it, get MongoDB up and running:

> You can install MongoDB however you wish, I prefer Homebrew: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

```
$ brew install mongodb
$ brew services start mongodb
```

### 2. Create Default Databases

If this is your first time running MongoDB locally, you'll need to create the admin user account as well as your application database and user.

Root Admin:

```
$ mongo
$ use admin
$ db.createUser({user:"admin", pwd:"PASSWORD", roles:[{role:"root", db:"admin"}]})
```

Application User:

```
$ use actinium
$ db.createUser({user:"actinium", pwd:"PASSWORD", roles:["readWrite"]})
$ exit
```

> Be sure to replace PASSWORD with the actual password you wish to use.

### 2.1 Update Adapter Config

You'll need to update the `/adapter/src/env.json` file `DATABASE_URI` with your database connection string:

```
...
"DATABASE_URI": "mongodb://actinium:PASSWORD_FROM_PREVIOUS_STEP@localhost:27017/actinium",
...
```

## 3. Globally Install Gulp

Before running Core you need to globally install Gulp:

```
$ npm install -g gulp
```

Now install the local node modules:

```
$ cd /YOUR/CORE/DIRECTORY
$ npm install
```

## 4. Run Core

```
$ cd /YOUR/CORE/DIRECTORY
$ npm run local
```
