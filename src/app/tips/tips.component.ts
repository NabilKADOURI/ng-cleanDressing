import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent implements OnInit {

  // Tableau de conseils sur le lavage des vêtements
  tips: { title: string, description: string }[] = [];

  ngOnInit(): void {
    this.loadTips();
  }

  // Chargement des conseils au démarrage du composant
  loadTips(): void {
    this.tips = [
      {
        title: 'Triez vos vêtements avant de les laver',
        description: `Séparez les vêtements par couleur (blancs, couleurs claires, couleurs foncées) et par type de tissu (cotons, synthétiques, délicats). Cela aide à éviter la décoloration et à protéger les tissus plus fragiles.`
      },
      {
        title: 'Utilisez le bon détergent',
        description: `Choisissez un détergent adapté à vos besoins. Par exemple, un détergent pour couleurs vives aide à maintenir l'éclat des couleurs, tandis qu'un détergent pour linge délicat est plus doux pour les tissus fragiles.`
      },
      {
        title: 'Ne surchargez pas votre machine à laver',
        description: `Remplir la machine à laver à pleine capacité peut nuire à l'efficacité du lavage. Les vêtements ont besoin d'espace pour se mouvoir librement afin d'être correctement nettoyés.`
      },
      {
        title: 'Choisissez la bonne température de lavage',
        description: `La température de lavage joue un rôle crucial dans la propreté des vêtements et la préservation des tissus. L'eau froide est idéale pour les couleurs et les tissus délicats, tandis que l'eau chaude est efficace pour les vêtements très sales ou les articles en coton.`
      },
      {
        title: 'Lavez les vêtements à l’envers',
        description: `Pour protéger les imprimés et les couleurs des vêtements, lavez-les à l'envers. Cela réduit l'usure de l'extérieur du vêtement et garde les impressions intactes plus longtemps.`
      },
      {
        title: 'Utilisez un sac à linge pour les articles délicats',
        description: `Placez les articles délicats comme les sous-vêtements, les collants ou les vêtements en dentelle dans un sac à linge. Cela évite qu'ils ne s'accrochent ou ne se déforment pendant le lavage.`
      },
      {
        title: 'Ne laissez pas les vêtements mouillés dans la machine',
        description: `Retirez les vêtements de la machine à laver dès que le cycle est terminé pour éviter les mauvaises odeurs et la formation de moisissure. Si vous ne pouvez pas les sécher immédiatement, laissez la porte de la machine ouverte pour permettre à l'air de circuler.`
      }
    ];
  }
}
