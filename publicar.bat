@echo off
chcp 65001 > nul
title Publicar no GitHub

cd /d "C:\xampp\htdocs\metalurgica"

echo.
echo === ANDRE SERRALHEIRO - Publicar Site ===
echo.
echo Arquivos alterados:
git status --short
echo.

set /p MSG=Descricao da atualizacao (ou aperte Enter para usar a data): 

if "%MSG%"=="" set MSG=Atualizacao automatica

echo.
echo Publicando: %MSG%
echo.

git add .
git commit -m "%MSG%"

echo.
echo Sincronizando com o repositorio remoto...
git pull --rebase origin main

echo.
echo Enviando para o GitHub...
git push origin main

echo.
if %ERRORLEVEL%==0 (
    echo SUCESSO! Site sera atualizado em instantes no Vercel.
) else (
    echo.
    echo ERRO! Tente rodar manualmente:
    echo   git pull origin main
    echo   git push origin main
)

echo.
pause
