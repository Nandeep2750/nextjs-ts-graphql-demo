# Graphql Code Generator

URL - https://www.graphql-code-generator.com

Steps to follow for installation - [graphql-code-generator installation guide](https://www.graphql-code-generator.com/docs/getting-started/installation)

```bash
npm install graphql
npm install @graphql-codegen/cli

npm run graphql-codegen init # Or use (npx graphql-codegen init)
npm run install
```

### After that these are the steps you have to follow...

```bash

    Welcome to GraphQL Code Generator!
    Answer few questions and we will setup everything for you.
  
? What type of application are you building? Application built with React
? Where is your schema?: (path or url) http://192.168.3.7:5000
? Where are your operations and fragments?: graphql/**/*.graphql
? Pick plugins: TypeScript (required by other typescript plugins), TypeScript Operations (operations and fragments), TypeScript React Apollo (typed 
components and HOCs)
? Where to write the output: graphql/generated/index.tsx
? Do you want to generate an introspection file? No
? How to name the config file? codegen.yml
? What script in package.json should run the codegen? codegen
Fetching latest versions of selected plugins...

    Config file generated at codegen.yml
    
      $ npm install

    To install the plugins.

      $ npm run codegen

    To run GraphQL Code Generator.
```

- This will generate `codegen.yml` file.
- Also it will add command in `package.json` file to run command to run generator.

------------------------------------
## How to use generated Hooks 

- In this demo project here is the file path in that generated hooks are available. 
- `graphql/generated/index.tsx`
- To use of any Hooks like queries or mutation here is one example...

```
import { useLoginMutation } from '../graphql/generated';

const [loginMutation, { data: loginMutationData, loading: loginMutationLoading, error: loginMutationError }] = useLoginMutation();

loginMutation({
  variables: {
    ...values
  },
  onCompleted(data) {
    // Do some process after Completed.
  },
  onError(error) {
    // Do some process on Error occure.
  }
})
```