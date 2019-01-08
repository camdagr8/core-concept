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

## 6. Run Core

```
$ cd /YOUR/CORE/DIRECTORY
$ npm run local
```

# Docker Compose

# 1. Configure

Edit **docker/env.json** and **docker/mongo.txt** to reflect your desired mongo password.

# 2. Build and start

To build and start the app as docker containers.

```
$ cd /YOUR/CORE/DIRECTORY
$ docker-compose build
$ docker-compose up
```
# 3. Add adapter user

Connect to mongo container, and connect to mongo.

```
$ docker exec -it core-concept_mongo_1 bash # connect to running mongo container
$ mongo mongodb://actinium:PASSWORDFROM_MONGO_TXT@localhost # connect to mongo from container
use actinium
db.createUser({user:"actinium", pwd:"PASSWORDFROM_MONGO_TXT", roles:["readWrite"]})
quit()
$ exit
```
