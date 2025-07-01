// Función para cargar scripts dinámicamente con timestamp
function loadScript(src, async = false) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src + '?v=' + Date.now();
        script.async = async;
        
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Error cargando script: ${src}`));
        
        document.head.appendChild(script);
    });
}

// Función para cargar todos los scripts necesarios
async function loadAllScripts() {
    try {
        // Cargar scripts en paralelo
        await Promise.all([
            loadScript('./assets/js/getDataform.js', true),
            loadScript('./assets/js/selectAdvisor.js', true),
            loadScript('./assets/js/calculate.js', true)
        ]);
        
        console.log('Todos los scripts cargados exitosamente');
    } catch (error) {
        console.error('Error cargando scripts:', error);
    }
}

// Función específica para registertable.html
async function loadRegisterTableScript() {
    try {
        await loadScript('./assets/js/getRegisterTable.js');
        console.log('Script getRegisterTable.js cargado exitosamente');
    } catch (error) {
        console.error('Error cargando getRegisterTable.js:', error);
    }
}

// Auto-ejecutar según la página
if (window.location.pathname.includes('registertable.html')) {
    loadRegisterTableScript();
} else {
    loadAllScripts();
} 