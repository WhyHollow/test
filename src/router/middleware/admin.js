export default function auth({ next, store }) {
  if (store.getters['auth/role'] === 'sale') {
    return next({
      name: 'Dashboard',
    });
  }
  return next();
}
