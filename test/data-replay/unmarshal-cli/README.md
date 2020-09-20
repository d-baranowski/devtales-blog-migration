## Instalation

`npm install -g`

## Usage

```
aws dynamodb scan --table-name sameTable --endpoint-url http://localhost:8000 > sample.json
cat sample.json | unmarshal
```
