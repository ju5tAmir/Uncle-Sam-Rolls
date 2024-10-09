export const RoutePath = {
    home: "/",
    papers: "/papers",
    paperById: (id: number | undefined) => id ? `/papers/${id}` : '/404',
    access: "/access",
    checkout: "/checkout"
}