#!/bin/bash

echo "🚀 Vercel Deploy Script"
echo "======================="

# Verificar si ya estamos logueados
if npx vercel whoami > /dev/null 2>&1; then
    echo "✅ Ya estás logueado en Vercel"
    npx vercel whoami
    echo "📦 Desplegando aplicación..."
    npx vercel --prod --yes
else
    echo "🔐 Necesitas hacer login primero"
    echo ""
    echo "OPCIONES:"
    echo "1. Ve a https://vercel.com/account/tokens y crea un token"
    echo "2. Luego ejecuta: npx vercel --prod --token TU_TOKEN"
    echo ""
    echo "O usa el método web:"
    echo "• Ve a https://vercel.com/new"
    echo "• Import: manugamero/sc001"
    echo "• Deploy automático"
    echo ""
    echo "Intentando login interactivo..."
    npx vercel login
fi
