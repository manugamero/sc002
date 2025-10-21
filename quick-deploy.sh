#!/bin/bash

echo "🚀 Quick Deploy to Vercel"
echo "========================="

# Verificar si tenemos el token
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ No se encontró VERCEL_TOKEN"
    echo ""
    echo "Para obtener un token:"
    echo "1. Ve a https://vercel.com/account/tokens"
    echo "2. Crea un nuevo token"
    echo "3. Ejecuta: export VERCEL_TOKEN=tu_token_aqui"
    echo "4. Luego ejecuta: ./quick-deploy.sh"
    echo ""
    echo "O alternativamente, ejecuta manualmente:"
    echo "npx vercel --prod --token TU_TOKEN_AQUI"
    exit 1
fi

echo "✅ Token encontrado"
echo "📦 Desplegando aplicación..."

# Deploy con token
npx vercel --prod --token "$VERCEL_TOKEN" --yes

echo "✅ ¡Despliegue completado!"
echo "🌐 Tu aplicación estará disponible en unos minutos"
