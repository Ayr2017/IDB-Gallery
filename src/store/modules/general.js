export default {
    state: {

    },
    getters: {

    },
    actions: {
        createFilename() {
            
            let date = new Date().getTime();
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let filename = `img-${str[getRandomNumber()]}${str[getRandomNumber()]}${
                str[getRandomNumber()]
                }-${date}`;
            function getRandomNumber() {
                return Math.floor(Math.random() * 25);
            }
            console.log('create filename', filename);
            return filename;
        },
    },
    mutations: {

    }
}
