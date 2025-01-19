import { promises as fs } from "fs"
import { tmpdir } from "os"
import path from "path"
import { transformCssVars } from "../transformers/transform-css-vars.js"
import { transformIcons } from "../transformers/transform-icons.js"
import { transformImport } from "../transformers/transform-import.js"
import { transformJsx } from "../transformers/transform-jsx.js"
import { transformRsc } from "../transformers/transform-rsc.js"
import { Project, ScriptKind } from "ts-morph"

import { transformTwPrefixes } from "./transform-tw-prefix.js"



const project = new Project({
  compilerOptions: {},
})

async function createTempSourceFile(filename) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "axionjs-"))
  return path.join(dir, filename)
}

export async function transform(
  opts,
  transformers = [
    transformImport,
    transformRsc,
    transformCssVars,
    transformTwPrefixes,
    transformIcons,
  ]
) {
  const tempFile = await createTempSourceFile(opts.filename)
  const sourceFile = project.createSourceFile(tempFile, opts.raw, {
    scriptKind: ScriptKind.TSX,
  })

  for (const transformer of transformers) {
    await transformer({ sourceFile, ...opts })
  }

  if (opts.transformJsx) {
    return await transformJsx({
      sourceFile,
      ...opts,
    })
  }

  return sourceFile.getText()
}
