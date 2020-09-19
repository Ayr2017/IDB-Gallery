export default {
    state: {
        allElements:null,
    },
    getters: {
        allElements:(state)=>state.allElements,
    },
    actions: {
        async getDatabase({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let indexedDB =
                    window.indexedDB ??
                    window.mozIndexedDB ??
                    window.webkitIndexedDB ??
                    window.msIndexedDB;
                const request = indexedDB.open(data.dbName, data.dbVersion);
                request.onerror = function (e) {
                    console.error("Unable to open database.");
                    reject('Error')
                };
                request.onsuccess = e => {
                    console.log("Database opened successfully.");
                    resolve(e.target.result);
                }
                request.onupgradeneeded = e => {
                    let db = e.target.result
                    db.createObjectStore(data.storeName, { autoIncrement: true, keyPath: 'id' })
                }
            })
        },
        async deleteRecord({ dispatch }, data) {
            let db = await dispatch('getDatabase', data.dbName, data.dbVersion);
            return new Promise(resolve => {
                const trans = db.transaction([data.storeName], 'readwrite')
                trans.oncomplete = () => {
                    resolve()
                }
                const store = trans.objectStore(data.storeName)
                console.log(data.key);
                store.get(data.key).onsuccess = () => {
                    store.delete(data.key)
                }
            })
        },
        async getElement({ dispatch }, data) {
            let db = await dispatch('getDatabase', data.dbName, data.dbVersion)
            return new Promise(resolve => {
                let trans = db.transaction([data.storeName], 'readonly')
                trans.oncomplete = () => {
                    resolve(records)
                }
                const store = trans.objectStore(data.storeName)
                const records = []
                store.openCursor().onsuccess = e => {
                    const cursor = e.target.result
                    if (cursor) {
                        recor.push(cursor.value)
                        cursor.continue()
                    }
                }
            })
        },
        async getElementsAll({commit,dispatch}, data) {
            let db = await dispatch('getDatabase', data)
            return new Promise(resolve => {
                let trans = db.transaction([data.storeName], 'readonly')
                trans.oncomplete = () => {
                    resolve(records)
                }
                
                const store = trans.objectStore(data.storeName)
                let records = store.getAll();
                commit('setAllElementsIntoArray',records)
                console.log('records', records)
            })
        },
        async saveElement({ dispatch }, data) {
            console.log(data.dbName, data.dbVersion)
            let db = await dispatch('getDatabase', data)
            return new Promise(resolve => {
                console.log(data)
                let trans = db.transaction([data.storeName], 'readwrite')
                trans.oncomplete = () => {
                    resolve()
                }
                let store = trans.objectStore(data.storeName)
                store.put(data.element)
            })
        },
    },
    mutations: {
        setAllElementsIntoArray(state, array){
            state.allElements = array;
        }
    }
}
