import { defineConfig } from 'vite';

export default defineConfig({
    // Otras configuraciones de Vite
    define: {
        'process.env': process.env // Esto asegura que process.env esté disponible en tu código
    }
});
