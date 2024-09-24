import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {

  transform(value: string | undefined): string {
    switch (value) {
      case 'En attente de validation':
        return 'orange';
      case 'En cours':
        return 'blue';
      case 'Terminé':
        return 'green';
      default:
        return 'black';
    }
  }
}
