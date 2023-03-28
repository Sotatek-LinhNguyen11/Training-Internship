const knex = require("knex")({
    client: 'pg',
    connection: 'postgres://hocptit:A0qd5hQtsHcv@ep-steep-mud-893551.ap-southeast-1.aws.neon.tech/training?ssl=true'
  });

  module.exports = knex;
