// This script will initialize a default database to then work with.
// Do not use in production.

db = db.getSiblingDB("admin");
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);

db = db.getSiblingDB("teloal");

db.createUser({
  user: "teloal",
  pwd: "teloal",
  roles: [
    {
      role: "readWrite",
      db: "teloal",
    },
  ],
});
