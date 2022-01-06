# Importera rätt nodeversion (v. 15)
FROM node:15
# Sätt vårat working directory (/app skapas i nodeimages)
WORKDIR /app
# Kopiera package.json file till . = (i detta fall /app)
# Vi kopierar package.json före vi kopierar all vår sourcecode eftersom vi 
# inte vill installera om alla dependencies varje gång vi bygger containern
COPY package.json .

ARG NODE_ENV
# Installera våra dependencies
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

# Kopiera all vår source code
COPY . ./
# Det går att sätta upp miljövariabler. Ex. vilken port som containern ska köra på
ENV PORT 3000
# Säg till var containern ska lyssna. Detta gör ingenting. Det är mer för dokumetation
EXPOSE 3000
# Säg till vilket command som ska köras av containern
CMD ["node", "index.js"]