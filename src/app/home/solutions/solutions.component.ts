import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolutionInterface } from '../../shared/models/solution';
import { EntityService } from '../../shared/services/entity.service';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css'],
  providers : [EntityService, {provide: 'baseUri',useValue: '/api/services'}],
})
export class SolutionsComponent implements OnInit {

  // Déclaration du constructeur avec injection du service EntityService
  constructor(private service: EntityService<SolutionInterface>) {}

  // Déclaration d'une propriété pour stocker les solutions
  solutions: SolutionInterface[] = [];

  // Méthode appelée au moment de l'initialisation du composant
  ngOnInit(): void {
    this.getSolutions(); // Appel de la méthode pour récupérer les solutions
  }

  // Méthode pour récupérer toutes les solutions depuis le service
  getSolutions() {
    // Appel de la méthode fetchAll du service EntityService
    this.service.fetchAll().subscribe((data) => {
      // Attribution des données reçues à la propriété solutions
      this.solutions = data['hydra:member'];
    });
  }
}

