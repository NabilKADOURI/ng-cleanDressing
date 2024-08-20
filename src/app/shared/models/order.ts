export interface OrderInterface {
  id?:string;
  userOrder:string;
  date: string; // Date en format ISO
  status: string; // Statut de la commande
  totalPrice: number; // Prix total de la commande
  items: string []; // Liste des articles de la commande
}
export interface ItemInterface {
  id?: string;
  orders: string;
  serviceItem: string | number;
  productItem: string | number;
  matterItem: string | number;
  quantity: number;
  totalPrice: number;
}

