//import { makeExecutableSchema } from 'graphql-tools';
import {rootModule} from './server';
import { printSchema } from 'graphql';
import mkdirp = require('mkdirp')
import * as fs from 'fs'
import * as path from 'path'

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
