# rapidsl-codegen
Code generator from RAPIDSL to swagger, Open API, GraphQL, etc.

WARNING : This is an ALPHA release - not for production use.

We are still developing the DSL and we want to release this version to get your feedback.

## Installation

Use the package manager [npm](https://www.npmjs.com) to install rapidsl-codegen.

```bash
git clone https://github.com/jantoniucci/rapidsl-codegen.git
cd rapidsl-codegen/
npm install -g .
```

## Usage
This is a command line interface and provides an appropiate --help param.

Basic usage:
```bash
rapidsl-codegen generate 
```

If you want to generate a zalando compliance API let:
```bash
rapidsl-codegen generate zalando
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)