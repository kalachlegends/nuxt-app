import CityPage from './CityPage.vue';
import CityPageId from './CityPageId.vue';
export const routesCity = [
{
    path: '/admin/city',
    component: CityPage,
    meta: {
        requiresAuth: true
    }
},

{
    path: '/admin/city/:id',
    component: CityPageId,
    meta: {
        requiresAuth: true
    }
}
];


