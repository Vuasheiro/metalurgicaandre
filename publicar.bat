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
git push

echo.
if %ERRORLEVEL%==0 (
    echo SUCESSO! Site sera atualizado em instantes no Vercel.
) else (
    echo ERRO! Verifique se ha alteracoes ou a conexao com internet.
)

echo.
pause
