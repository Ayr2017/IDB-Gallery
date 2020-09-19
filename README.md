# gallery

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Instruction
При открытии овтоматически создает Базу Данных на  IndexedDB если это базы там нет.
Если есть, то извлекает все данные и рендерит галлерею на клиенте. 
Если выбрать фотографию, то можно сохранить кнопкой сохранить. Если выбрать json-файл определенного формата (images.json), то загружает Изображения. Кликая на изображения можно выбрать, кликнув потом на сохранить, сохранять на БД браузера.
