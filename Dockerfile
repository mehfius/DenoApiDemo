FROM denoland/deno:alpine-1.40.2

# Criando diretório de trabalho
WORKDIR /app

# Copiando arquivos do projeto
COPY . .

# Pré-cache das dependências
RUN deno cache app.ts

# Porta em que a API vai rodar
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["run", "--allow-net", "--allow-env", "app.ts"]