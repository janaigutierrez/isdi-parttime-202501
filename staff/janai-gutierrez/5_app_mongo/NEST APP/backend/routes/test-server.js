// test-server.js - Archivo de prueba para verificar las rutas
const testRoutes = async () => {
    // Prueba 1: Verificar que el servidor esté corriendo
    try {
        const response1 = await fetch('http://localhost:4321/api');
        console.log('1. Test /api:', response1.status, await response1.text());
    } catch (error) {
        console.error('1. Error al probar /api:', error.message);
    }

    // Prueba 2: Verificar la ruta de usuarios sin autenticación
    try {
        const response2 = await fetch('http://localhost:4321/users');
        console.log('2. Test /users sin auth:', response2.status);
    } catch (error) {
        console.error('2. Error al probar /users:', error.message);
    }

    // Prueba 3: Verificar la ruta de avatar sin autenticación
    try {
        const response3 = await fetch('http://localhost:4321/users/avatar');
        console.log('3. Test /users/avatar sin auth:', response3.status);
    } catch (error) {
        console.error('3. Error al probar /users/avatar sin auth:', error.message);
    }

    // Prueba 4: Verificar la ruta de avatar con autenticación
    try {
        const response4 = await fetch('http://localhost:4321/users/avatar', {
            headers: {
                'Authorization': 'Bearer 1'
            }
        });
        console.log('4. Test /users/avatar con auth:', response4.status);
        if (response4.headers.get('content-type')?.includes('application/json')) {
            console.log('Respuesta:', await response4.json());
        } else {
            console.log('Respuesta:', await response4.text());
        }
    } catch (error) {
        console.error('4. Error al probar /users/avatar con auth:', error.message);
    }
}

testRoutes();