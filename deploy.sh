#!/bin/bash

echo "🚀 Desplegando Studio Framework en Vercel..."

# Verificar si ya estamos logueados
if npx vercel whoami > /dev/null 2>&1; then
    echo "✅ Ya estás logueado en Vercel"
    npx vercel whoami
else
    echo "🔐 Necesitas hacer login en Vercel"
    echo "Visita: https://vercel.com/account/tokens"
    echo "Crea un token y ejecuta: npx vercel --prod --token TU_TOKEN"
    exit 1
fi

# Desplegar
echo "📦 Desplegando aplicación..."
npx vercel --prod --yes

echo "✅ Despliegue completado!"
