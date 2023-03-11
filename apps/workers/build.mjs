import { build } from 'esbuild'
import glob from 'glob'
import { copy } from 'esbuild-plugin-copy'

const input = glob.sync('src/**/*.ts')

build({
  entryPoints: input,
  outdir: 'dist',
  format: 'esm',
  bundle: true,
  minify: false,
  platform: 'node',
  target: 'node18',
  tsconfig: 'tsconfig.json',
  plugins: [
    copy({
      assets: [
        {
          from: ['./src/**/*.{json,toml}'],
          to: ['./'],
        },
      ],
    }),
  ],
}).catch((error) => {
  console.error(error)
  process.exit(1)
})
