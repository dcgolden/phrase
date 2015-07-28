# Phrase

##About Phrase

Phrase is an annotation product for teachers, classrooms, and students.


## Usage

###For Development
```
cd tnw
npm install
npm run dev
```

Runs on http://localhost:9966

###For Production
```
cd tnw
npm run build
npm run start
```
Runs on http://localhost:3000
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


## Linting

```
npm run lint
```

