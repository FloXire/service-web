- `express` sert à implémenter le serveur http responsable du traitement des requêtes des clients
- `node-json-db` simule une bd à partir d'un fichier JSON

Liste des livres : GET http://localhost:3000/books

Un livre spécifique : GET http://localhost:3000/books/231ac800-da86-11e7-b11a-f1a3b541af38

Modification d'un livre : PUT localhost:3000/books/6cbc92e0-da86-11e7-b397-fd0e15229f62 avec body JSON
```JSON
{
    "name": "La ferme des animaux",
    "author": "George Orwell",
    "id": "6cbc92e0-da86-11e7-b397-fd0e15229f62",
    "copies": []
}
```
--> change le fichier library.json (les changements sont donc persistants)

Insertion d'un livre : POST localhost:3000/books avec body JSON
```JSON
{
    "name": "Mon super livre",
    "author": "Florian Patérour",
    "id": "d9931488-3cd8-4d75-8671-7c5a6582a9b2",
    "copies": []
}
```

Suppression d'un livre : DELETE localhost:3000/books/d9931488-3cd8-4d75-8671-7c5a6582a9b2

Livre sans nom : POST localhost:3000/books
```JSON
{
    "author": "Florian Patérour"
}
```


Les controllers sont les objets qui sont responsables de traiter une requête HTTP et de renvoyer un réponse appropriée

Ajout d'un utilisateur : POST localhost:3000/users
```JSON
{
    "name": "Florian",
    "age": 21,
    "id": "f00aeabd-5dd6-48a9-8295-8b04f0c7cbfc"
}
```

Modification d'un utilisateur : PUT localhost:3000/users/f00aeabd-5dd6-48a9-8295-8b04f0c7cbfc
```JSON
{
    "name": "Florian Patérour",
    "age": 21,
    "id": "f00aeabd-5dd6-48a9-8295-8b04f0c7cbfc"
}
```

Suppression d'un utilisateur : DELETE localhost:3000/users/f00aeabd-5dd6-48a9-8295-8b04f0c7cbfc

book id requis avec loan id


Séparation partie controller et partie repository : bonne pratique.  
Le controller gère la partie web et le repository la partie métier.  
Un peu comme un modèle MVC.


Conseil : à la place de `_.filter(copies, ({ id }) => !_.some(loans, { copyId: id }));` mettre `copies.filter(copy => !loanedCopies.includes(copy.id));`


Location d'un livre  
- bookId : 231ac800-da86-11e7-b11a-f1a3b541af38  
- copyId : c2da13d0-dabf-11e7-8fb4-b99f7664c177  
- userId : d7f65099-cb92-4457-965b-27d576bd184c  

Pour obtenir les livres empruntés par un utilisateur :
GET localhost:3000/users/d7f65099-cb92-4457-965b-27d576bd184c/loans
