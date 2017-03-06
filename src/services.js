import formatQueryParams from './utilities/formatQueryParams';

const GET = {
  method: 'GET',
  cache: true,
  cacheLength: 720,
};

const API_HOST = 'https://api.bestbuy.com/v1';
const apiKey = 'Py9uIo7fslPRwAc9VlLWRgWj';

export const getProduct = (id) => ({
  ...GET,
  path: `${API_HOST}/products/${id}.json${formatQueryParams({
		show: 'sku,name,salePrice,regularPrice,angleImage',
		apiKey,
	})}`
})

export const getCheapAppleProducts = (page = 1, pageSize = 3) => ({
  ...GET,
  path: `${API_HOST}/products(manufacturer=apple&salePrice<50)${formatQueryParams({
		format: 'json',
		show: 'sku,name,salePrice,regularPrice,image',
		page,
		pageSize,
		apiKey
	})}`,
});
