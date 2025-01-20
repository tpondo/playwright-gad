import { faker } from '@faker-js/faker/locale/en';
import { AddCommentModel } from '@_src/models/comment/add-comment.model';

export function prepareRandomCommentData(
  bodyParagraphs: number = 5,
): AddCommentModel {
  const body: string = faker.lorem.paragraph(bodyParagraphs);
  const newComment: AddCommentModel = { body: body };
  return newComment;
}
