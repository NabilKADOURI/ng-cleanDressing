import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDescription',
  standalone: true
})

export class FormatDescriptionPipe implements PipeTransform {
  transform(article: string): string   
 {
    // Logique de transformation ici
    return article.replace(/\n/g, '<br>')
               .replace(/\bimportant\b/gi, '<span class="highlight">$&</span>');
  }
}