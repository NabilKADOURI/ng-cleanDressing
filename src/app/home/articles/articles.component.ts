// Importation des modules nécessaires
import { Component, inject,  OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleInterface } from '../../shared/models/article'; // Interface de modèle d'article
import { EntityService } from '../../shared/services/entity.service'; // Service pour interagir avec les entités (articles)

// Définition du composant
@Component({
  selector: 'app-articles', // Sélecteur pour le composant
  standalone: true, // Indique que ce composant est autonome
  imports: [RouterLink, CommonModule], // Modules Angular requis
  templateUrl: './articles.component.html', // Chemin du fichier HTML
  styleUrl: './articles.component.css', // Chemin du fichier CSS
  providers: [EntityService, { provide: 'baseUri', useValue: '/api/articles' }], // Fournisseurs de services
})
export class ArticlesComponent implements OnInit {
  
  articles: ArticleInterface[] = [];
  service = inject (EntityService);
  
  

  // Méthode appelée à l'initialisation du composant
  ngOnInit(): void {
    this.FetchAllArticles(); // Récupération des articles
  }

  // Méthode pour récupérer les articles depuis le backend
  FetchAllArticles() {
    this.service.getArticle().subscribe((data) => {
      this.articles = data['hydra:member']; // Assignation des articles récupérés
    });
  }
}
