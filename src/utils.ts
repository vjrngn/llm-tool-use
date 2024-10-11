import { inspect } from 'node:util';

export function log(args: any) {
  console.log(
    inspect(args, {
      depth: null,
      colors: true,
    })
  )
}