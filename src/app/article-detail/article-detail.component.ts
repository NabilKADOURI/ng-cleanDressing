import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleInterface } from '../shared/models/article';
import { EntityService } from '../shared/services/entity.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
  providers : [EntityService, {provide: 'baseUri',useValue: '/api/services'}],
})
export class ArticleDetailComponent {

  article: ArticleInterface | undefined;
  dataArticle!: Subscription;
  service = inject(EntityService<ArticleInterface>);

  constructor(
    private route: ActivatedRoute,
    
  ) { }


  ngOnInit(): void {
    this.getArticleById();
   }

  

  
  getArticleById(){
    const id = this.route.snapshot.paramMap.get('id');
    this.dataArticle = this.service.fetch(id).subscribe(data => {
    this.article = data});
    console.log(this.dataArticle);
    
}

}
