# Clean Dressing - Application de Gestion de Pressing

## Table des matières
1. [Introduction](#introduction)
2. [Fonctionnalités](#fonctionnalités)
3. [Technologies utilisées](#technologies-utilisées)
4. [Structure du projet](#structure-du-projet)
5. [Processus de développement](#processus-de-développement)
    - [Front-End](#front-end)
    - [Back-End](#back-end)
6. [Modèle de données](#modèle-de-données)
7. [Utilisation](#utilisation)
8. [Exemples de code](#exemples-de-code)
9. [Diagrammes et maquettes](#diagrammes-et-maquettes)
10. [Déploiement](#déploiement)
11. [Remerciements](#remerciements)
12. [Contact](#contact)

---

## Introduction
Clean Dressing est une application web développée pour répondre aux besoins modernes de gestion des pressings. Ce projet fictif a été réalisé dans le cadre de ma formation au titre professionnel **Développeur Web et Web Mobile**.

L'objectif principal était de créer une plateforme intuitive et moderne permettant :
- Aux clients de passer des commandes en ligne.
- Aux employés de gérer efficacement leurs tâches.
- Aux administrateurs d'avoir une visibilité et un contrôle sur les données via un tableau de bord.

---

## Fonctionnalités

### Gestion des clients
- Inscription et connexion sécurisées.
- Gestion des profils (mise à jour des informations personnelles).
- Historique des commandes.

### Gestion des commandes
- Sélection des services et produits (via des listes dynamiques).
- Ajout au panier et suivi en temps réel.
- Validation et paiement des commandes.

### Gestion employé et administrateur
- Affectation des tâches via un tableau de bord.
- Administration des données (catégories, produits, utilisateurs) via **EasyAdmin**.

### Sécurité
- Authentification via **JWT**.
- Gestion des rôles (client, employé, administrateur).

---

## Technologies utilisées

### Front-End
- **Angular 17**
  - Gestion des composants réactifs.
  - Consommation d'API avec HttpClient.
  - Responsive design via **Bootstrap**.

### Back-End
- **Symfony 6.4**
  - API Platform pour la gestion des endpoints REST.
  - Sécurisation via LexikJWTAuthenticationBundle.
  - Gestion des données avec Doctrine ORM.

### Base de données
- **MariaDB**
  - Modélisation des données via MCD/MLD.
  - Relations complexes entre entités (One-to-Many, Many-to-One).

### Outils de prototypage et design
- **Figma** pour les maquettes.
- **Canva** pour le logo et la charte graphique.

---

## Structure du projet

### Front-End (Angular)
- `src/app/components` : Composants UI (Home, Solutions, Header, Footer, etc.).
- `src/app/services` : Services pour consommer les API.
- `src/app/models` : Interfaces pour structurer les données.

### Back-End (Symfony)
- `src/Entity` : Entités pour représenter les tables en base de données.
- `src/Repository` : Requêtes SQL et gestion des données.
- `src/Security` : Gestion des rôles et authentification.
- `config` : Configuration des routes et des bundles.

---

## Processus de développement

### Front-End
1. **Création des maquettes**
   - Réalisées avec **Figma** pour le desktop et le mobile.
2. **Développement des composants**
   - Composants modulaires (Header, Footer, Home, etc.).
   - Intégration des données dynamiques via l'API.
3. **Gestion du routage**
   - Utilisation du routeur Angular pour naviguer entre les pages.

### Back-End
1. **Modélisation des données**
   - Création des schémas UML avec **StarUML**.
   - Développement des entités et relations avec Doctrine.
2. **Développement des API**
   - API RESTful exposées via API Platform.
3. **Sécurisation**
   - Authentification JWT.
   - Hashage des mots de passe avec **UserPasswordHasherInterface**.

---

## Modèle de données
### Schéma Conceptuel de Données (MCD)
Le modèle conceptuel suit une structure relationnelle robuste :
- **User** : Gestion des utilisateurs (clients et employés).
- **Order** : Commandes passées par les clients.
- **Product** : Produits disponibles pour les services.
- **Category** : Catégories des produits.
- **Service** : Différents services proposés (lavage, repassage, etc.).

![MCD](path/to/mcd_image.png)

---

## Utilisation

### Prérequis
- **Node.js** et **npm** pour Angular.
- **PHP** et **Composer** pour Symfony.
- Serveur de base de données MariaDB.

### Installation

#### Front-End
```bash
npm install
ng serve
```

#### Back-End
```bash
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
symfony server:start
```

### Accès
- Front-End : http://localhost:4200
- API Back-End : http://localhost:8000/api

## **Exemples de code**
### 1. Service Angular pour consommer l'API
```bash
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(categoryId: number) {
    return this.http.get(`${this.apiUrl}/categories/${categoryId}/products`);
  }
}
```
### 2. Entité Symfony
```bash
<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private int $id;

    #[ORM\Column(type: "string", length: 255)]
    private string $name;

    #[ORM\OneToMany(mappedBy: "category", targetEntity: Product::class)]
    private $products;

    // Getters and Setters
}
```
### 3. Exemple de route Angular
```bash
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```
## Remerciements
Je tiens à remercier :

- **Pôle Emploi** pour avoir financé ma formation.
- **Human Booster** pour leur accompagnement.
- **Mes formateurs et camarades** pour leur soutien.

## Contact
Nabil Kadouri

Email : kadourinabil7@gmail.com
LinkedIn : [Profil LinkedIn](https://www.linkedin.com/in/nabil-kadouri/)
