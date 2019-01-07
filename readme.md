# Getting Started

## 1. Install MongoDB

If you don't already have it, get MongoDB up and running.

#### Install Homebrew:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Install MongoDB:

```
$ brew install mongodb
$ brew services start mongodb
```

> You can install MongoDB however you wish, this is just my preference.

## 2. Create Databases

If this is your first time running MongoDB locally, you'll need to create the admin user account:

```
$ mongo
$ use admin
$ db.createUser({user:"admin", pwd:"PASSWORD", roles:[{role:"root", db:"admin"}]})
```

Now you'll need the application user:

```
$ use actinium
$ db.createUser({user:"actinium", pwd:"PASSWORD", roles:["readWrite"]})
$ exit
```

> Be sure to replace PASSWORD with the actual password you wish to use.

## 3. Update Adapter Config

You'll need to update the `/adapter/src/env.json` file's `DATABASE_URI` property with your database connection string:

```
...
"DATABASE_URI": "mongodb://actinium:PASSWORD_FROM_PREVIOUS_STEP@localhost:27017/actinium",
...
```

## 4. Globally Install Gulp

Before running Core you need to globally install Gulp:

```
$ npm install -g gulp
```

## 5. Install Node modules for Core

```
$ cd /YOUR/CORE/DIRECTORY
$ npm install
```

## 6. Install Node modules for the front-end

```
$ cd /YOUR/CORE/DIRECTORY/webapp
$ npm install
```

## 7. Install Node modules for back-end

```
$ cd /YOUR/CORE/DIRECTORY/adapter
$ npm install
```

## 8. Run Core

```
$ cd /YOUR/CORE/DIRECTORY
$ npm run local
```
