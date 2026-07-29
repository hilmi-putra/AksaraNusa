const fs = require('fs');

let storeTs = fs.readFileSync('c:/laragon/www/Megapress/frontend/lib/api/store.ts', 'utf8');
storeTs = storeTs.replace(/return response\.data\.data;/g, 'return response.data;');
storeTs = storeTs.replace(/return response\.data\.is_wishlisted;/g, 'return response.is_wishlisted;');
fs.writeFileSync('c:/laragon/www/Megapress/frontend/lib/api/store.ts', storeTs);

let userTs = fs.readFileSync('c:/laragon/www/Megapress/frontend/lib/api/user.ts', 'utf8');
userTs = userTs.replace(/return response\.data\.data;/g, 'return response.data;');
userTs = userTs.replace(/export const getDashboardSummary = async \(\) => \{\s+const response = await api\.get\('\/user\/dashboard'\);\s+return response\.data;\s+\};/, `export const getDashboardSummary = async () => {\n    const response = await api.get('/user/dashboard');\n    return response;\n};`);
fs.writeFileSync('c:/laragon/www/Megapress/frontend/lib/api/user.ts', userTs);
