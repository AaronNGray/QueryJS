import typescript from 'rollup-plugin-typescript2';
//import typescript2 from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

export default [
  {
    input: 'src/QueryJS.ts',
    output: [
      {
        file: 'public/components/queryjs.js',
        format: 'esm',
        banner: '/* eslint-disable */',
      },
      { file: pkg.module, format: 'esm' },
    ],
    plugins: [
      typescript({
        "target": "ES2019",         /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
        "module": "ESNext",         /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
        "declaration": true,        /* Generates corresponding '.d.ts' file. */
        "declarationMap": true,     /* Generates a sourcemap for each corresponding '.d.ts' file. */
        "sourceMap": true,          /* Generates corresponding '.map' file. */
        "outDir": "./dist",         /* Redirect output structure to the directory. */
        "strict": true,             /* Enable all strict type-checking options. */
        "strictNullChecks": false,  /* Enable strict null checks. */
        "noUnusedLocals": false,    /* Report errors on unused locals. */
        "moduleResolution": "node", /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
        "esModuleInterop": true     /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
      })
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
  {
    input: 'src/QueryJS.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: "named"
      },
    ],
    plugins: [
      typescript({
        "target": "ES5",            /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
        "module": "commonjs",       /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
        "sourceMap": true,          /* Generates corresponding '.map' file. */
        "outDir": "./dist",         /* Redirect output structure to the directory. */
        "strict": true,             /* Enable all strict type-checking options. */
        "strictNullChecks": false,  /* Enable strict null checks. */
        "noUnusedLocals": false,    /* Report errors on unused locals. */
        "moduleResolution": "node", /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
        "esModuleInterop": true     /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
      })
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  }
];
