export default defineNuxtPlugin(() => {
    return {
        provide: {
            status_to_key: (status: string) => status.toLowerCase().replace(/ /g, '_'),

            eachFirst: (str: string, length = 2) => {
                if (str.length == 0) return '-';
                let res = str.match(/\b(\w)/g).join('').toUpperCase();
                return res.length >= length ? res.substring(0, length) : res;
            }
        }
    }
})