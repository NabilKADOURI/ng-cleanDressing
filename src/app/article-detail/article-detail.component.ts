import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleService } from '../shared/services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleInterface } from '../shared/models/article';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent {

  article: ArticleInterface | undefined;
  dataArticle!: Subscription;
  service = inject(ArticleService);

  constructor(
    private route: ActivatedRoute,
    
  ) { }


  ngOnInit(): void {
    this.getArticleById();
   }

  

  
  getArticleById(){
    const id = this.route.snapshot.paramMap.get('id');
    this.dataArticle = this.service.fetchById(id).subscribe(data => {
    this.article = data});
    console.log(this.dataArticle);
    
}

}
