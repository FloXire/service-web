# TAN public API

La TAN (Transport de l'Agglomération Nantaise) est le service de transport en commun de l'agglomération Nantaise. La TAN fournit une API publique qui est utilisée à la fois par ses application (mobile, site web) mais également mis à disposition pour des développeurs tier (ex: l'application mobile [Naonedbus](https://play.google.com/store/apps/details?id=net.naonedbus)).

Ouvrez la [documentation](https://nantesmetropole.opendatasoft.com//api/datasets/1.0/244400404_api-temps-reel-tan/attachments/version_3_de_la_documentation_de_l_api_pdf/) de l'API TAN et essayez d'obtenir les informations ci-dessous. Pour effectuer les requêtes HTTP, vous pouvez simplement entrer les URLs dans votre navigateur. Il est néanmoins préférable d'utiliser un client HTTP avancé type Postman ou Insomnia qui vous permettra de visualiser les réponses plus facilement.

Note: privilégiez les URL de preprod

## Liste des arrêts

Afficher la liste de tous les arrêts

--> http://open_preprod.tan.fr/ewp/arrets.json

## Horaires

Afficher les horaires à l'arrêt "Place du cirque" de la ligne 11 vers "Perray"

id arrêt CRQU
num ligne 11
sens perray : 2

--> http://open_preprod.tan.fr/ewp/horairesarret.json/CRQU/11/2

## Temps d'attente

Afficher le temps d'attente pour tous les bus à l'arrêt "Place du cirque"

--> http://open_preprod.tan.fr/ewp/tempsattente.json/CRQU

## Arrêts autour du chateau

Afficher la liste des arrêts à moins de 500m du chatêau des ducs de Bretagne <https://www.google.fr/maps/@47.2163906,-1.548708,17z>

--> http://open_preprod.tan.fr/ewp/arrets.json/47,2163906/-1,54870817

## Critique de l'API

Quels aspects ne vous paraissent pas conformes aux principes REST ?

--> pas de hiérarchie latitude 
--> extension ne devrait pas figurer
--> mauvaise erreur quand on met des points