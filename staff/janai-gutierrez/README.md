# Janai Directory

## Comandos bash:

- Listar carpetas (abreviatura de "lista"):

```sh
ls
```
- Cambiar de carpeta (abreviatura de "Change Directory"):

    - Para entrar en una carpeta:

```sh
cd <nombre carpeta>
```

- Para salir de una carpeta:

```sh
cd ..
```

- Para crear una carpeta (abreviatura en inglés de "make directory"):

```sh
mkdir <nombre carpeta>
```
- Para recibir información sobre el estado actual:

```sh
git status
```
- Para introducir los cambios hechos en nuestro código:

    - `git add <ruta-del-archivo-modificado>`
    - `git commit -m "add commit message #issueNumber"`
    - `git push`

- Para moverte entre ramas:
    - `git checkout <nombre>`: "git, muéveme a la rama <nombre> (ya existente)"
- Para crear una rama nueva:
    - `git checkout -b <nombre> `: "git, múeveme a la nueva rama <nombre>"
- Para eliminar una rama:
    - `git branch -d <nombre>`: "git, elimina la rama <nombre>"
- Para comprobar qué ramas hay:
    - `git branch`: "git, ¿qué ramas hay en mi local?"
