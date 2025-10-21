#!/bin/bash

echo "🚀 Auto Deploy Studio Framework"
echo "================================"

# Función para mostrar instrucciones
show_instructions() {
    echo ""
    echo "📋 INSTRUCCIONES PARA DESPLEGAR:"
    echo ""
    echo "1️⃣ MÉTODO VERCEL (Recomendado):"
    echo "   • Ve a: https://vercel.com/new"
    echo "   • Import: manugamero/sc001"
    echo "   • Deploy automático"
    echo ""
    echo "2️⃣ MÉTODO CLI (Si tienes token):"
    echo "   • Ve a: https://vercel.com/account/tokens"
    echo "   • Crea token → Copia"
    echo "   • Ejecuta: npx vercel --prod --token TU_TOKEN"
    echo ""
    echo "3️⃣ MÉTODO NETLIFY (Alternativo):"
    echo "   • Ve a: https://app.netlify.com/start"
    echo "   • Connect GitHub → sc001"
    echo "   • Deploy automático"
    echo ""
    echo "🌐 Tu app estará disponible en:"
    echo "   • Vercel: sc001.vercel.app"
    echo "   • Netlify: sc001.netlify.app"
    echo ""
    echo "✅ El código ya está en GitHub: https://github.com/manugamero/sc001"
}

# Verificar si tenemos token
if [ ! -z "$VERCEL_TOKEN" ]; then
    echo "✅ Token Vercel encontrado"
    echo "📦 Desplegando..."
    npx vercel --prod --token "$VERCEL_TOKEN" --yes
else
    show_instructions
fi
