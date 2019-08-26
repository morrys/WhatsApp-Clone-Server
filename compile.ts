//import { makeExecutableSchema } from 'graphql-tools';
import 'reflect-metadata';
import { GraphQLModule } from '@graphql-modules/core';
import { printSchema } from 'graphql';
import usersModule from './modules/users';
import chatsModule from './modules/chats';
import mkdirp = require('mkdirp')

import * as fs from 'fs'
import * as path from 'path'

const rootModule = new GraphQLModule({
  name: 'root',
  imports: [usersModule, chatsModule],
});

const schema = printSchema(rootModule.schema);
console.log("schema", schema)
const result = printToFile('dist', schema);
console.log("result", result)


function printToFile(
  dist: string,
  schema: string,
) {
  try {
    const dir = path.resolve(process.cwd(), dist)

    const output = path.resolve(dir, "graphql.schema")
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
    fs.writeFileSync(output, schema)
    return { status: 'ok', path: output }
  } catch (err) {
    console.error(err, err);
    return { status: 'err', message: err.message }
  }
}
