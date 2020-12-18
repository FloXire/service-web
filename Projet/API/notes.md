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


E : Sur la gestion des emprunts, on doit vérifier que la copie existe. Mais comment peut-on le vérifier sans l'id du livre ? On doit récupérer toutes les copies de tous les livres ?

P : soit tu vérifies effectivement parmi tous les livres (peu performant avec notre système de fausse base de donnée mais pas forcménet une problème dans l'absolu)
soit tu obliges à fournir également un bookId dans la requête pour simplifier cette vérification

E : Dans le second cas, il faut mettre un POST sur la route /loans/:bookId si je comprend bien mais du coup on aura aussi GET et DELETE sur /loans/:loanId non ? Le POST demanderait un bookId et GET et DELETE un loansId c'est pas gênant ?

P : Pardon je n'avais pas vu ton message. Dans la solution que je proposais, le 'bookId' était envoyé dans le body du POST (comme le copyId et userId)
donc le POST se fait bien sur l'URL /loans
POST sur /loans/:bookId est effectivement un peu bizarre


Séparation partie controller et partie repository : bonne pratique.  
Le controller gère la partie web et le repository la partie métier.  
Un peu comme un modèle MVC.


AE : à la place de ça
`_.filter(copies, ({ id }) => !_.some(loans, { copyId: id }));`
j'ai mis
`copies.filter(copy => !loanedCopies.includes(copy.id));`
et ça marche mieux


Projet à rendre en fin de semaine prochaine


Location d'un livre  
- bookId : 231ac800-da86-11e7-b11a-f1a3b541af38  
- copyId : c2da13d0-dabf-11e7-8fb4-b99f7664c177  
- userId : d7f65099-cb92-4457-965b-27d576bd184c  

Pour obtenir les livres empruntés par un utilisateur :
GET localhost:3000/users/d7f65099-cb92-4457-965b-27d576bd184c/loans
