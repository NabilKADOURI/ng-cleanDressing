export interface ICredentials {
  username: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface TokenDecoded {
  user_id:number;
  status_id:number;
  exp: number;
  iat: number;
  roles: string[];
  username: string;
} 




// <div *ngFor="let category of categories; let i = index">
//   <button (click)="toggleAccordion(i)">
//     {{ category.name }} - {{ isAccordionOpen[i] ? 'Ouvert' : 'Fermé' }}
//   </button>
//   <div *ngIf="isAccordionOpen[i]">
//     Contenu de l'accordéon pour {{ category.name }}
//   </div>
// </div>