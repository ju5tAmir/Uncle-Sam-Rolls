export const Routes = {
    home: "/",
    products: "/products/",
    products: (id: number | undefined) => id ? `/products/${id}` : '/404'
}