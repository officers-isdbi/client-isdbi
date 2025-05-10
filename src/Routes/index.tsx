import useConfiguration from '@/hooks/useConfiguration';
import { lazy, useMemo } from 'react';
import { Navigate, type RouteObject, useRoutes } from 'react-router';

const Error404 = lazy(() => import('@client/Pages/Error404'));

const Layout = lazy(() => import('@client/Layout'));
const LogIn = lazy(() => import('@client/Pages/LogIn'));

const Welcome = lazy(() => import('@client/Pages/Welcome'));
/* // Websites
const WebsitesList = lazy(() => import('@client/Pages/Websites/WebsitesList'));
const DisabledWebsitesList = lazy(
	() => import('@client/Pages/Websites/Disabled')
);
const EnabledWebsitesList = lazy(
	() => import('@client/Pages/Websites/Enabled')
);
const WebsiteDetails = lazy(
	() => import('@client/Pages/Websites/WebsiteDetails')
);
// Customers
const CustomersList = lazy(
	() => import('@client/Pages/Customers/CustomersList')
);
const DisabledCustomersList = lazy(
	() => import('@client/Pages/Customers/Disabled')
);
const EnabledCustomersList = lazy(
	() => import('@client/Pages/Customers/Enabled')
);
const GuestsCustomersList = lazy(() => import('@client/Pages/Customers/Guest'));
const CustomersDetails = lazy(
	() => import('@client/Pages/Customers/CustomersDetails')
);
// Admins
const AdminsList = lazy(() => import('@client/Pages/Admins/AdminsList'));
const DisabledAdminsList = lazy(() => import('@client/Pages/Admins/Disabled'));
const EnabledAdminsList = lazy(() => import('@client/Pages/Admins/Enabled'));
const AdminsDetails = lazy(() => import('@client/Pages/Admins/AdminsDetails'));
// Products
const Roles = lazy(() => import('@client/Pages/Roles/index'));
const GlobalRoles = lazy(() => import('@client/Pages/Roles/GlobalRoles'));
// Products
const ProductsList = lazy(() => import('@client/Pages/Products/ProductsList'));
const DisabledProductsList = lazy(
	() => import('@client/Pages/Products/Disabled')
);
const DraftsProductsList = lazy(() => import('@client/Pages/Products/Drafts'));
const ProductsDetailsLayout = lazy(
	() => import('@client/Pages/Products/ProductsDetails')
);
const ProductsDetails = lazy(
	() => import('@client/Pages/Products/ProductsDetails/Details')
);
const ProductImages = lazy(
	() => import('@client/Pages/Products/ProductsDetails/Images')
);
const ProductAdditional = lazy(
	() => import('@client/Pages/Products/ProductsDetails/Additional')
);
const ProductReviews = lazy(
	() => import('@client/Pages/Products/ProductsDetails/Reviews')
);
// Blogs
const BlogsList = lazy(() => import('@client/Pages/Blogs/BlogsList'));
const DisabledBlogsList = lazy(() => import('@client/Pages/Blogs/Disabled'));
const DraftsBlogsList = lazy(() => import('@client/Pages/Blogs/Drafts'));
const BlogsDetailsLayout = lazy(
	() => import('@client/Pages/Blogs/BlogsDetails')
);
const BlogDetails = lazy(
	() => import('@client/Pages/Blogs/BlogsDetails/Details')
);
const BlogImages = lazy(
	() => import('@client/Pages/Blogs/BlogsDetails/Images')
);
const BlogReviews = lazy(
	() => import('@client/Pages/Blogs/BlogsDetails/Reviews')
);
// Category
const CategoriesList = lazy(
	() => import('@client/Pages/Categories/CategoriesList')
);
const DisabledCategoriesList = lazy(
	() => import('@client/Pages/Categories/Disabled')
);
const DraftsCategoriesList = lazy(
	() => import('@client/Pages/Categories/Drafts')
);
const CategoriesDetailsLayout = lazy(
	() => import('@client/Pages/Categories/CategoriesDetails')
);
const CategoryDetails = lazy(
	() => import('@client/Pages/Categories/CategoriesDetails/Details')
);
const CategoryImages = lazy(
	() => import('@client/Pages/Categories/CategoriesDetails/Images')
);
// Collections
const CollectionsList = lazy(
	() => import('@client/Pages/Collections/CollectionsList')
);
const DisabledCollectionsList = lazy(
	() => import('@client/Pages/Collections/Disabled')
);
const DraftsCollectionsList = lazy(
	() => import('@client/Pages/Collections/Drafts')
);
const CollectionsDetailsLayout = lazy(
	() => import('@client/Pages/Collections/CollectionsDetails')
);
const CollectionDetails = lazy(
	() => import('@client/Pages/Collections/CollectionsDetails/Details')
);
const CollectionImages = lazy(
	() => import('@client/Pages/Collections/CollectionsDetails/Images')
);
const CollectionProductsList = lazy(
	() => import('@client/Pages/Collections/CollectionsDetails/Products')
);
// Orders
// orders lists
const OrdersList = lazy(() => import('@client/Pages/Orders/OrdersList'));
const PendingOrdersList = lazy(() => import('@client/Pages/Orders/Pending'));
const ConfirmedOrdersList = lazy(
	() => import('@client/Pages/Orders/Confirmed')
);
const ShippedOrdersList = lazy(() => import('@client/Pages/Orders/Shipped'));
const DeliveredOrdersList = lazy(
	() => import('@client/Pages/Orders/Delivered')
);
const CancelledOrdersList = lazy(
	() => import('@client/Pages/Orders/Cancelled')
);
const ReturnedOrdersList = lazy(() => import('@client/Pages/Orders/Returned'));
// order details
const OrdersDetailsLayout = lazy(
	() => import('@client/Pages/Orders/OrdersDetails')
);
const OrderProducts = lazy(
	() => import('@client/Pages/Orders/OrdersDetails/Products')
);
const OrderHistory = lazy(
	() => import('@client/Pages/Orders/OrdersDetails/History')
);
const OrderDelivery = lazy(
	() => import('@client/Pages/Orders/OrdersDetails/Delivery')
);
// Settings
const SettingsLayout = lazy(() => import('@client/Pages/Settings'));
const GeneralSettings = lazy(
	() => import('@client/Pages/Settings/pages/GeneralSettings')
);
const TestimonialsSettings = lazy(
	() => import('@client/Pages/Settings/pages/TestimonialsSettings')
);
const ServicesSettings = lazy(
	() => import('@client/Pages/Settings/pages/ServicesSettings')
);
const FAQSettings = lazy(
	() => import('@client/Pages/Settings/pages/FAQSettings')
);
const NavigationSettings = lazy(
	() => import('@client/Pages/Settings/pages/NavigationSettings')
);
const PoliciesSettings = lazy(
	() => import('@client/Pages/Settings/pages/PoliciesSettings')
);
const PagesSettings = lazy(
	() => import('@client/Pages/Settings/pages/PagesSettings')
);
const IntegrationSettings = lazy(
	() => import('@client/Pages/Settings/pages/IntegrationSettings')
);
const DeliverySettings = lazy(
	() => import('@client/Pages/Settings/pages/DeliverySettings')
);
const LoyaltyPoints = lazy(
	() => import('@client/Pages/Settings/pages/LoyaltyPoints')
);
// website selection
const SupportsList = lazy(() => import('@client/Pages/Supports/SupportsList'));
const Newsletters = lazy(() => import('@client/Pages/Newsletters'));
const Promotions = lazy(() => import('@client/Pages/Promotions'));
 */
const Router = () => {
	const { user } = useConfiguration();

	const routes = useMemo<RouteObject[]>(() => {
		const routes: RouteObject[] = [
			{ index: true, element: <Navigate to="/login" /> },
			{
				path: '/app',
				element: user ? <Layout /> : <Navigate to="/login" replace />,
				children: [
					{
						index: true,
						element: <Navigate to="/app/welcome" replace />,
					},
					// welcome
					{ path: 'welcome', Component: Welcome },

					// Error404
					{ path: '*', Component: Error404 },
				],
			},
			{
				path: '/login',
				element: user ? <Navigate to="/app" replace /> : <LogIn />,
			},
			{ path: '*', Component: Error404 },
		];
		return routes.map((route) => route);
	}, [user]);
	return useRoutes(routes);
};
export default Router;
