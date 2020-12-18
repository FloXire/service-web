Angular est utilisé dans les single page application --> on manipule le DOM (notre page internet) 
directement côté client (navigateur) au lieu de recharger des pages entières.  
--> navigation plus fluide et plus rapide. 

Une fois l'app chargée seules les données dynamiques sont 
échangées et mises à jour avec le serveur. Tout le reste (l'architecture des pages, les styles, les animations, 
la navigation entre les composants...) est statique, n'est chargé qu'une seule fois et peut-être mis en cache.

Le rafraichissement auto d'une page est automatiquement pris en compte avec angular

---

Ce qui est fait :  
* GET des books via l'API pour la page principe
* GET d'un livre précis quand on clique sur burrow

---

### Organisation

Angular s'articule autour de composants. Chaque composant est composé de 3 fichiers :
* `.ts`
* `.html`
* `.css`

---

Variable terminant par $ = observable

RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code.  
Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change.
