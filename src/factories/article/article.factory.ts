import { faker } from '@faker-js/faker/locale/en';
import { AddArticleModel } from '@_src/models/article/article.model';

export function prepareRandomArticle(
  titleLength?: number,
  bodyParagraphs: number = 5,
): AddArticleModel {
  const newArticle: AddArticleModel = {
    title: titleLength
      ? faker.string.alpha(titleLength)
      : faker.lorem.sentence(),
    body: faker.lorem.paragraph(bodyParagraphs),
  };

  return newArticle;
}
