import mapCategory from './category.mapper';
import type { CategoryDto, CategoryModel } from './types';

type CategoriesResponse = { data: CategoryDto[] };

export default function useCategoryTree() {
    const { data: categories } = useApiFetch('/categories', {
        key: 'categoryTree',
        transform: (response: CategoriesResponse): CategoryModel[] => response.data.map(mapCategory),
    });

    return categories;
}
