
export const getEnvVariables = () => {
    return {
        VITE_API_URL: import.meta.env.VITE_API_URL // Devuelve la variable de entorno con el prefijo VITE_
    };
};

