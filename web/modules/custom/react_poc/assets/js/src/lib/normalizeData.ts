import { ApiResponseData, File, Maybe, MediaItem, NormalizedDataObject } from '../types';

const normalizeData = (responseData: ApiResponseData): NormalizedDataObject[] => {
  const { data, included } = responseData;
  let normalizedDataArray: NormalizedDataObject[] = [];

  data.map((item) => {
    let normalizedDataObject: NormalizedDataObject = {} as NormalizedDataObject;
    normalizedDataObject.apiId = item.id;
    normalizedDataObject.drupalId = item.attributes.drupal_internal__nid;
    normalizedDataObject.name = item.attributes.title;
    normalizedDataObject.description = item.attributes.field_body?.value;
    normalizedDataObject.price = item.attributes.field_price;

    let mediaItem: Maybe<MediaItem> = null;

    for (let i = 0; i < included.length; i++) {
      const relationshipId = item.relationships.field_product_image.data?.id;
      const includedItem = included[i] as MediaItem;
      const mediaItemId = includedItem.id;

      if (relationshipId === mediaItemId) {
        mediaItem = includedItem;
        break;
      }
    }

    if (mediaItem) {
      for (let i = 0; i < included.length; i++) {
        const mediaItemId = mediaItem.relationships.field_media_image.data.id;
        const includedItem = included[i] as File;
        const fileId = includedItem.id;

        if (mediaItemId === fileId) {
          normalizedDataObject.image = {
            altText: mediaItem.relationships.field_media_image.data.meta.alt,
            url: includedItem.attributes.uri.url
          };
          break;
        }
      }
    }

    normalizedDataArray.push(normalizedDataObject);
  });

  console.log(normalizedDataArray);

  return normalizedDataArray;
};

export default normalizeData;
