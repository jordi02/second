
# Lista de comandos requeridos por el desafio




## Argumentos

-p | -port Define el puerto que se utilizara

-m | -modo Define el modo que se utilizara (fork o cluster)

## Node

Node en modo Fork

```bash
node start main.js
```

Node en modo Cluster

```bash
node main.js -m cluster
```

## Forever

Forever en Fork sin watch
```bash
forever start main.js
```

Forver con Watch
```bash
forever -w start main.js
```

Forever en modo cluster 
```bash
forever start main.js -m cluster
```

## PM2

PM2 en modo Fork
```bash
pm2 start main.js --name="Fork"
```

PM2 en modo Cluster
```bash
pm2 start main.js -i <numero de instancias>
```

PM2 en otro puerto
```bash
pm2 start main.js --name="Fork" -- --port=8081
```