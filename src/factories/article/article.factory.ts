import { faker } from '@faker-js/faker/locale/en';
import { AddArticleModel } from '../../models/article/article.model';

export function randomNewArticleData(
  titleLength?: number,
  bodyParagraphs: number = 5,
): AddArticleModel {
  const newArticle: AddArticleModel = {
    title: faker.string.alpha(titleLength) ?? faker.lorem.sentence(),
    body: faker.lorem.paragraph(bodyParagraphs),
  };

  return newArticle;
}