import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleInterface } from '../../../shared/models/article';
import { Observable, Subscription} from 'rxjs';
import { FormatDescriptionPipe } from '../../../shared/pipes/format-description.pipe';
import { EntityService } from '../../../shared/services/entity.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, FormatDescriptionPipe],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  providers: [{ provide: 'baseUri', useValue: '/api/services' }],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

  article?: ArticleInterface;
  dataArticle!: Subscription;
  service = inject(EntityService);

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {

    this.fetchArticle();
   
  }

  fetchArticle(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.dataArticle = this.service.getArticleById(id).subscribe(data => {
      this.article = data});
    }
}

  ngOnDestroy(): void {
    if (this.dataArticle) {
      this.dataArticle.unsubscribe();
    }
  }
}
