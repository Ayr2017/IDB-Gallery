export default {
    state: {
        remoteImages: false,
        jsonFile: null,
    },
    getters: {
        remoteState: (state) => state.remoteImages,
        jsonFile:(state)=> state.jsonFile,
    },
    actions: {

    },
    mutations: {
        remoteImagesTrue(state){
            state.remoteImages = true;
        },
        remoteImagesFalse(state){
            state.remoteImages = false;
        },
        fillJson(state,json){
            state.jsonFile = json;
        },
        clearJson(state){
            state.jsonFile = null;
        },
    }
}
