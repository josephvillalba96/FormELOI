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
        // Cargar scripts secuencialmente para asegurar dependencias
        await loadScript('./assets/js/getDataform.js', false);
        await loadScript('./assets/js/selectAdvisor.js', false);
        await loadScript('./assets/js/calculate.js', false);
        
        console.log('Todos los scripts cargados exitosamente');
        
        // Configurar eventos después de cargar los scripts
        setupEventListeners();
    } catch (error) {
        console.error('Error cargando scripts:', error);
    }
}

// Función específica para registertable.html
async function loadRegisterTableScript() {
    try {
        await loadScript('./assets/js/getRegisterTable.js', false);
        console.log('Script getRegisterTable.js cargado exitosamente');
        
        // Configurar eventos después de cargar el script
        setupRegisterTableEvents();
    } catch (error) {
        console.error('Error cargando getRegisterTable.js:', error);
    }
}

// Configurar eventos para index.html
function setupEventListeners() {
    // Configurar el evento onchange del select advisor
    const advisorSelect = document.getElementById('advisor');
    if (advisorSelect) {
        advisorSelect.addEventListener('change', function() {
            if (typeof actualizarDatos === 'function') {
                actualizarDatos();
            }
        });
    }
    
    // Configurar el evento onclick del botón de captura
    const captureButton = document.getElementById('submitButton');
    if (captureButton) {
        captureButton.addEventListener('click', function() {
            if (typeof captureFormData === 'function') {
                captureFormData();
            }
        });
    }
}

// Configurar eventos para registertable.html
function setupRegisterTableEvents() {
    // Configurar el evento onclick del botón de exportar
    const exportButton = document.getElementById('exportButton');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            if (typeof exportarExcel === 'function') {
                exportarExcel();
            }
        });
    }
}

// Auto-ejecutar según la página
if (window.location.pathname.includes('registertable.html')) {
    loadRegisterTableScript();
} else {
    loadAllScripts();
} 