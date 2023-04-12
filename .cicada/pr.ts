import { Job, Pipeline } from 'https://deno.land/x/cicada/lib.ts'

const job = new Job({
  name: 'My First Job',
  image: 'node:16-alpine',
  steps: [
    {
      name: 'Install PNPM',
      run: 'npm install -g pnpm@7',
    },
    {
      name: 'Install Dependencies',
      run: 'pnpm install',
    },
    {
      name: 'Run Lint',
      run: 'pnpm lint',
    },
  ],
})

export default new Pipeline([job])
