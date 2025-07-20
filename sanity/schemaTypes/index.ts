import { type SchemaTypeDefinition } from 'sanity';

import {blockContentType} from './blockContentType';
import {categoryType} from './categoryType';
import {postType} from './postType';
import {authorType} from './authorType';
import {addressType} from './addressType';
import {blogCategoryType} from './blogCategoryType';
import {blogType} from './blogType';
import {brandType} from './brandType';
import {orderType} from './orderType';
import {productType} from './productType';
import { vendorListingType } from './vendorListingType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: 
  [
    blockContentType, 
    categoryType, 
    postType, 
    authorType,
    addressType,
    blogCategoryType,
    blogType,
    brandType,
    orderType,
    productType,
    vendorListingType,
  ],
};
