# App Usage

## Development Mode

``` sh
npm install
npm run dev
```

## Production Setup

``` sh
npm run build
```

## Run in Production Mode

``` sh
npm start
```
#Setup Annotator Server

```
/elasticsearch/bin/elasticsearch
```
then
```
cd annotator-store
virtualenv pyenv
source pyenv/bin/activate
pip install -e .[flask]
cp annotator.cfg.example annotator.cfg
python run.py
```
see https://github.com/openannotation/annotator-store

This starts a server at the ip and port defined at the bottom of run.py
