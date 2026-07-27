import type { CategoryDto, CategoryModel } from "./types";


export default function mapCategory(dto: CategoryDto): CategoryModel {
    return {
        title: dto.title,
        href: `/products?category=${dto.slug}`,
        children: dto.children.map(mapCategory)
    }
}