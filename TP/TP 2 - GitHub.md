# Github Public API

GitHub est un service d'hébergement de code en ligne se basant sur le CVS Git.

Utilisez la [documentation](https://developer.github.com/v3/) en ligne de l'API GitHub pour effectuer les différentes requêtes ci-dessous.

La première partie du TP peut être effectuée depuis un navigateur (requêtes GET simples) mais les parties suivantes nécessitent l'utilisation d'un client HTTP avancé permettant de spécifier des headers HTTP.

## GET simples

- Récupérer les informations de l'utilisateur `smart-rest`
--> https://api.github.com/users/smart-rest

- Récupérer les repositories de l'utilisateur `smart-rest`
--> https://api.github.com/users/smart-rest/repos

- Récupérer les issues du repository `service-web-tp`
--> https://api.github.com/repos/smart-rest/service-web/issues

## Authentification

Les étapes suivantes devront être faites en étant authentifié. Utiliser les Bearer Token `95bfe24a04e78dde78e7c5a314949b1e08348d81`
> astuce: Utilisez le header HTTP *Authorization* avec la valeur *Bearer 95bfe24a04e78dde78e7c5a314949b1e08348d81* ou renseigner l'onglet *Authorization* avec le type *Bearer Token* et la valeur du Token.

- Récupérer les informations de l'utilisateur courant. Quel est son login ?
--> https://api.github.com/user avec Authorization: Bearer 95bfe24a04e78dde78e7c5a314949b1e08348d81

- Modifer la localisation de l'utilisateur courant
--> PATCH https://api.github.com/user avec Authorization: Bearer 4c1300674d486639d305b73e2785d1238830d36a
 et raw data {"location":"bretagne"}

- Créer une nouvelle *issue* sur le projet `service-web-tp`
--> POST https://api.github.com/repos/smart-rest/service-web/issues avec l'authorization
{
  "title": "Found a bug",
  "body": "I'm having a problem with this.",
  "assignees": [
    "octocat"
  ],
  "milestone": 1,
  "labels": [
    "bug"
  ]
}


## Media types

> astuce: *Accept* header

- Récupérer tous les commentaires de la première *issue* du projet `service-web-tp`
--> GET https://api.github.com/repos/smart-rest/service-web-tp/issues/1/comments

- Récupérer tous les commentaires de la première *issue* du projet `service-web-tp` au format `full`
--> GET https://api.github.com/repos/smart-rest/service-web-tp/issues/1/comments avec Accept header à application/vnd.github.v3.full+json