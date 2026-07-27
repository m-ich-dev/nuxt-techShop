export type CategoryDto = {
    title: string;
    slug: string;
    parentId: number | null;
    children: CategoryDto[];
}

export type CategoryModel = {
    title: string;
    href: string;
    children: CategoryModel[];
}